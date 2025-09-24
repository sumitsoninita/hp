'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { addApplication, getApplicationByStudent } from '@/services/storageService'
import { StudentApplication, ApplicationStatus, UserRole } from '@/types'
import { ProtectedRoute } from '@/components/ProtectedRoute'

// Enhanced Status Timeline Component
const StatusTimeline: React.FC<{ application: StudentApplication }> = ({ application }) => {
    const statuses = [
        { key: ApplicationStatus.SUBMITTED, label: 'Submitted', description: 'Application received', icon: '📝' },
        { key: ApplicationStatus.UNDER_REVIEW, label: 'Under Review', description: 'Being evaluated by experts', icon: '👥' },
        { key: ApplicationStatus.SHORTLISTED, label: 'Shortlisted', description: 'Selected for next round', icon: '⭐' },
        { key: ApplicationStatus.FINAL, label: 'Final Selection', description: 'Congratulations! You are selected', icon: '🎉' }
    ];

    const currentStatusIndex = statuses.findIndex(s => s.key === application.status);

    const getStatusColor = (index: number) => {
        if (application.status === ApplicationStatus.REJECTED) return 'bg-red-500';
        if (index <= currentStatusIndex) return 'bg-green-500';
        return 'bg-gray-300';
    };

    const getStatusTextColor = (index: number) => {
        if (application.status === ApplicationStatus.REJECTED) return 'text-red-600';
        if (index <= currentStatusIndex) return 'text-hp-dark-blue font-semibold';
        return 'text-gray-500';
    };

    return (
        <div className="grid lg:grid-cols-3 gap-6">
            {/* Status Timeline - Takes 2 columns */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-hp-blue rounded-full flex items-center justify-center text-white text-xl mr-3">
                        📊
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-hp-dark-blue">Application Status</h3>
                        <p className="text-sm text-hp-gray">Track your startup application progress</p>
                    </div>
                </div>

                {application.status === ApplicationStatus.REJECTED && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg mb-6">
                        <div className="flex items-center">
                            <div className="text-red-400 text-xl mr-3">❌</div>
                            <div>
                                <h4 className="text-red-800 font-semibold">Application Not Selected</h4>
                                <p className="text-red-700 text-sm mt-1">We appreciate your submission, but your application was not selected to move forward at this time.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Horizontal Timeline */}
                <div className="relative">
                    <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200"></div>
                    <div className="flex justify-between">
                        {statuses.map((status, i) => (
                            <div key={status.key} className="relative flex flex-col items-center">
                                <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${getStatusColor(i)}`}>
                                    {i <= currentStatusIndex || application.status === ApplicationStatus.REJECTED ? '✓' : status.icon}
                                </div>
                                <div className="mt-3 text-center max-w-24">
                                    <div className={`${getStatusTextColor(i)} text-sm font-semibold`}>
                                        {status.label}
                                    </div>
                                    <p className="text-xs text-hp-gray mt-1">{status.description}</p>
                                    {i === currentStatusIndex && application.status !== ApplicationStatus.REJECTED && (
                                        <div className="mt-2">
                                            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                Current
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Application Summary - Takes 1 column */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-lg font-semibold text-hp-dark-blue mb-4">Application Summary</h4>
                <div className="space-y-4">
                    <div>
                        <span className="text-xs text-hp-gray uppercase tracking-wide">Startup Name</span>
                        <p className="font-semibold text-sm mt-1">{application.startupName}</p>
                    </div>
                    <div>
                        <span className="text-xs text-hp-gray uppercase tracking-wide">Sector</span>
                        <p className="font-semibold text-sm mt-1">{application.sector}</p>
                    </div>
                    <div>
                        <span className="text-xs text-hp-gray uppercase tracking-wide">Funding Requested</span>
                        <p className="font-semibold text-sm mt-1">{application.fundingAmount ? `₹${parseInt(application.fundingAmount).toLocaleString()}` : 'Not specified'}</p>
                    </div>
                    <div>
                        <span className="text-xs text-hp-gray uppercase tracking-wide">Team Size</span>
                        <p className="font-semibold text-sm mt-1">{application.teamSize || 'Not specified'}</p>
                    </div>
                    <div>
                        <span className="text-xs text-hp-gray uppercase tracking-wide">Submitted</span>
                        <p className="font-semibold text-sm mt-1">{new Date(application.submissionDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <span className="text-xs text-hp-gray uppercase tracking-wide">Pitch Deck</span>
                        <p className="font-semibold text-sm text-hp-blue cursor-pointer hover:underline mt-1">{application.pitchDeck}</p>
                    </div>
                </div>
            </div>

            {/* Additional Details - Full width below */}
            {(application.businessModel || application.competitiveAdvantage || application.revenueProjection) && (
                <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-6 mt-6">
                    <h5 className="text-lg font-semibold text-hp-dark-blue mb-4">Additional Details</h5>
                    <div className="grid md:grid-cols-3 gap-6">
                        {application.businessModel && (
                            <div>
                                <span className="text-xs text-hp-gray uppercase tracking-wide font-medium">Business Model</span>
                                <p className="text-sm mt-2">{application.businessModel}</p>
                            </div>
                        )}
                        {application.competitiveAdvantage && (
                            <div>
                                <span className="text-xs text-hp-gray uppercase tracking-wide font-medium">Competitive Advantage</span>
                                <p className="text-sm mt-2">{application.competitiveAdvantage}</p>
                            </div>
                        )}
                        {application.revenueProjection && (
                            <div>
                                <span className="text-xs text-hp-gray uppercase tracking-wide font-medium">Revenue Projection</span>
                                <p className="text-sm mt-2">{application.revenueProjection}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// Enhanced Application Form Component
const ApplicationForm: React.FC<{ onSubmit: (data: any) => void; error: string; success: string }> = ({ onSubmit, error, success }) => {
    const [formData, setFormData] = useState({
        startupName: '',
        description: '',
        sector: '',
        problemSolved: '',
        targetMarket: '',
        businessModel: '',
        fundingAmount: '',
        teamSize: '',
        timeline: '',
        competitiveAdvantage: '',
        revenueProjection: '',
        pitchDeck: null as File | null
    });

    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({ ...prev, pitchDeck: file }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl mr-4">
                    💡
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-hp-dark-blue">Submit Your Startup Idea</h2>
                    <p className="text-hp-gray">Tell us about your innovative startup concept</p>
                </div>
            </div>

            {/* Progress Bar - More compact */}
            <div className="mb-6">
                <div className="flex justify-between text-sm text-hp-gray mb-2">
                    <span>Step {currentStep} of {totalSteps}</span>
                    <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                        className="bg-hp-blue h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    ></div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg mb-6">
                    <div className="flex items-center">
                        <div className="text-red-400 text-xl mr-3">⚠️</div>
                        <p className="text-red-700">{error}</p>
                    </div>
                </div>
            )}

            {success && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg mb-6">
                    <div className="flex items-center">
                        <div className="text-green-400 text-xl mr-3">✅</div>
                        <p className="text-green-700">{success}</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-hp-dark-blue mb-3">Basic Information</h3>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-hp-gray text-sm font-semibold mb-1">Startup Name *</label>
                                <input
                                    type="text"
                                    name="startupName"
                                    value={formData.startupName}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hp-blue focus:border-transparent transition-all"
                                    placeholder="Enter your startup name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-hp-gray text-sm font-semibold mb-1">Sector *</label>
                                <select
                                    name="sector"
                                    value={formData.sector}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hp-blue focus:border-transparent transition-all"
                                    required
                                >
                                    <option value="">Select a sector</option>
                                    <option value="EdTech">EdTech</option>
                                    <option value="FinTech">FinTech</option>
                                    <option value="HealthTech">HealthTech</option>
                                    <option value="AgriTech">AgriTech</option>
                                    <option value="E-commerce">E-commerce</option>
                                    <option value="SaaS">SaaS</option>
                                    <option value="IoT">IoT</option>
                                    <option value="AI/ML">AI/ML</option>
                                    <option value="Blockchain">Blockchain</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-hp-gray text-sm font-semibold mb-1">Brief Description *</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hp-blue focus:border-transparent transition-all"
                                    placeholder="Describe your startup idea in 2-3 sentences"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-hp-gray text-sm font-semibold mb-1">What problem are you solving? *</label>
                                <textarea
                                    name="problemSolved"
                                    value={formData.problemSolved}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hp-blue focus:border-transparent transition-all"
                                    placeholder="Clearly explain the problem your startup addresses"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Market & Business */}
                {currentStep === 2 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-hp-dark-blue mb-3">Market & Business Model</h3>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-hp-gray text-sm font-semibold mb-1">Target Market *</label>
                                <textarea
                                    name="targetMarket"
                                    value={formData.targetMarket}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hp-blue focus:border-transparent transition-all"
                                    placeholder="Who is your target audience? Be specific about demographics, geography, etc."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-hp-gray text-sm font-semibold mb-1">Business Model</label>
                                <textarea
                                    name="businessModel"
                                    value={formData.businessModel}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hp-blue focus:border-transparent transition-all"
                                    placeholder="How will your startup generate revenue?"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-hp-gray text-sm font-semibold mb-1">Funding Amount (₹)</label>
                                <input
                                    type="number"
                                    name="fundingAmount"
                                    value={formData.fundingAmount}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hp-blue focus:border-transparent transition-all"
                                    placeholder="e.g., 500000"
                                />
                            </div>
                            <div>
                                <label className="block text-hp-gray text-sm font-semibold mb-1">Team Size</label>
                                <input
                                    type="number"
                                    name="teamSize"
                                    value={formData.teamSize}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hp-blue focus:border-transparent transition-all"
                                    placeholder="Number of members"
                                />
                            </div>
                            <div>
                                <label className="block text-hp-gray text-sm font-semibold mb-1">Timeline</label>
                                <input
                                    type="text"
                                    name="timeline"
                                    value={formData.timeline}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hp-blue focus:border-transparent transition-all"
                                    placeholder="e.g., 6 months"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-hp-gray text-sm font-semibold mb-1">Competitive Advantage</label>
                            <textarea
                                name="competitiveAdvantage"
                                value={formData.competitiveAdvantage}
                                onChange={handleInputChange}
                                rows={2}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hp-blue focus:border-transparent transition-all"
                                placeholder="What makes your solution unique compared to existing alternatives?"
                            />
                        </div>
                    </div>
                )}

                {/* Step 3: Financials & Documents */}
                {currentStep === 3 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-hp-dark-blue mb-3">Financial Projections & Documents</h3>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-hp-gray text-sm font-semibold mb-1">Revenue Projection (Next 3 Years)</label>
                                <textarea
                                    name="revenueProjection"
                                    value={formData.revenueProjection}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hp-blue focus:border-transparent transition-all"
                                    placeholder="Provide realistic revenue projections for the next 3 years"
                                />
                            </div>
                            <div>
                                <label className="block text-hp-gray text-sm font-semibold mb-1">Upload Pitch Deck *</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-hp-blue transition-colors">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept=".pdf,.ppt,.pptx"
                                        className="hidden"
                                        id="pitchDeck"
                                        required
                                    />
                                    <label htmlFor="pitchDeck" className="cursor-pointer">
                                        <div className="text-3xl text-gray-400 mb-2">📄</div>
                                        <p className="text-hp-gray font-semibold text-sm">Click to upload pitch deck</p>
                                        <p className="text-xs text-gray-500 mt-1">PDF, PPT, or PPTX files only</p>
                                        {formData.pitchDeck && (
                                            <p className="text-green-600 font-semibold text-sm mt-2">✓ {formData.pitchDeck.name}</p>
                                        )}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                    <button
                        type="button"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                            currentStep === 1 
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                : 'bg-gray-500 text-white hover:bg-gray-600'
                        }`}
                    >
                        Previous
                    </button>

                    {currentStep < totalSteps ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="bg-hp-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-hp-dark-blue transition-all"
                        >
                            Next Step
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all"
                        >
                            Submit Application
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default function StudentDashboard() {
    const { user, loading } = useAuth();
    const [application, setApplication] = useState<StudentApplication | null | undefined>(undefined);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        console.log('Student Dashboard useEffect - user:', user, 'loading:', loading);
        if (user && !loading) {
            // Use the enhanced function that handles ID mismatches and backward compatibility
            const app = getApplicationByStudent(user.id, user.fullName);
            console.log('Found application:', app);
            
            // If no application found, set to null (not undefined)
            setApplication(app || null);
        } else if (!loading && !user) {
            // If not loading and no user, set to null
            console.log('No user found, setting application to null');
            setApplication(null);
        }
    }, [user, loading]);
    
    const handleSubmit = (formData: any) => {
        if (!formData.pitchDeck || !user) {
            setError("Please fill all required fields and upload a pitch deck.");
            return;
        }
        setError('');
        setSuccess('');

        try {
            const newApp = addApplication({
                studentId: user.id,
                studentName: user.fullName,
                startupName: formData.startupName,
                description: formData.description,
                sector: formData.sector,
                problemSolved: formData.problemSolved,
                targetMarket: formData.targetMarket,
                pitchDeck: formData.pitchDeck.name,
                businessModel: formData.businessModel,
                fundingAmount: formData.fundingAmount,
                teamSize: formData.teamSize,
                timeline: formData.timeline,
                competitiveAdvantage: formData.competitiveAdvantage,
                revenueProjection: formData.revenueProjection,
            });
            setApplication(newApp);
            setSuccess("🎉 Your application has been submitted successfully! We'll review it and get back to you soon.");
        } catch (err) {
            setError("Failed to submit application. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-hp-light-gray flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hp-blue mx-auto mb-4"></div>
                    <p className="text-hp-gray">Loading dashboard...</p>
                    <p className="text-sm text-gray-500 mt-2">Loading: {loading.toString()}</p>
                </div>
            </div>
        );
    }

    if (application === undefined) {
        return (
            <div className="min-h-screen bg-hp-light-gray flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hp-blue mx-auto mb-4"></div>
                    <p className="text-hp-gray">Loading application...</p>
                    <p className="text-sm text-gray-500 mt-2">User: {user ? user.fullName : 'No user'}</p>
                    <p className="text-sm text-gray-500">Application state: {application === undefined ? 'undefined' : application === null ? 'null' : 'found'}</p>
                </div>
            </div>
        );
    }

    return (
        <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white shadow-2xl">
                    <div className="container mx-auto px-6 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold mb-1">Student Dashboard</h1>
                                <p className="text-blue-100">Welcome back, {user?.fullName}</p>
                            </div>
                            <div className="flex items-center space-x-6">
                                <div className="text-right text-sm text-blue-200 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                    <p className="font-semibold">{user?.college}</p>
                                    <p>ID: {user?.id}</p>
                                </div>
                                {application && (
                                    <button
                                        onClick={() => setApplication(null)}
                                        className="bg-white text-blue-900 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        + New Application
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-6 py-8">
                    {application ? (
                        <StatusTimeline application={application} />
                    ) : (
                        <ApplicationForm 
                            onSubmit={handleSubmit}
                            error={error}
                            success={success}
                        />
                    )}

                    {/* Quick Stats */}
                    <div className="mt-8 grid md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white mr-4">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-blue-100">Application Status</p>
                                    <p className="text-sm font-semibold text-white">
                                        {application ? application.status : 'Not Submitted'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white mr-4">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-green-100">Submission Date</p>
                                    <p className="text-sm font-semibold text-white">
                                        {application ? new Date(application.submissionDate).toLocaleDateString() : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-600 to-pink-700 text-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white mr-4">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-purple-100">Sector</p>
                                    <p className="text-sm font-semibold text-white">
                                        {application ? application.sector : 'Not Selected'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
