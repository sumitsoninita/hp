'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { getApplications, updateApplicationStatus, addEvaluationNoteToApplication, deleteApplication, clearAllData } from '@/services/storageService'
import { StudentApplication, ApplicationStatus, EvaluationNote, UserRole } from '@/types'
import { useAuth } from '@/hooks/useAuth'
import { ProtectedRoute } from '@/components/ProtectedRoute'

// Google Meet Scheduling Modal Component
const MeetSchedulingModal: React.FC<{
    application: StudentApplication | null;
    isOpen: boolean;
    onClose: () => void;
}> = ({ application, isOpen, onClose }) => {
    const [meetDetails, setMeetDetails] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        duration: '30',
        agenda: ''
    });

    const handleScheduleMeet = () => {
        if (!application || !meetDetails.title || !meetDetails.date || !meetDetails.time) {
            alert('Please fill in all required fields');
            return;
        }

        // Create Google Meet link (simulated)
        const meetLink = `https://meet.google.com/${Math.random().toString(36).substr(2, 9)}`;
        
        // Create calendar event details
        const eventDetails = {
            title: meetDetails.title,
            description: `Meeting with ${application.studentName} - ${application.startupName}\n\n${meetDetails.description}\n\nAgenda:\n${meetDetails.agenda}\n\nGoogle Meet Link: ${meetLink}`,
            date: meetDetails.date,
            time: meetDetails.time,
            duration: meetDetails.duration,
            meetLink: meetLink
        };

        // Simulate sending calendar invite
        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${meetDetails.date.replace(/-/g, '')}T${meetDetails.time.replace(':', '')}00Z/${meetDetails.date.replace(/-/g, '')}T${(parseInt(meetDetails.time.split(':')[0]) + parseInt(meetDetails.duration) / 60).toString().padStart(2, '0')}${meetDetails.time.split(':')[1]}00Z&details=${encodeURIComponent(eventDetails.description)}`;
        
        // Open Google Calendar
        window.open(calendarUrl, '_blank');
        
        // Show success message
        alert(`Google Meet scheduled successfully!\n\nMeeting Link: ${meetLink}\n\nCalendar event has been opened for you to confirm.`);
        
        // Reset form and close modal
        setMeetDetails({
            title: '',
            description: '',
            date: '',
            time: '',
            duration: '30',
            agenda: ''
        });
        onClose();
    };

    if (!isOpen || !application) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Schedule Google Meet</h2>
                            <p className="text-blue-100">Organize a meeting with {application.studentName}</p>
                            <p className="text-blue-200 text-sm">{application.startupName}</p>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    <div className="space-y-6">
                        {/* Meeting Title */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Meeting Title *
                            </label>
                            <input
                                type="text"
                                value={meetDetails.title}
                                onChange={(e) => setMeetDetails(prev => ({...prev, title: e.target.value}))}
                                placeholder="e.g., Startup Pitch Review - Tech Innovation Discussion"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        {/* Date and Time */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Date *
                                </label>
                                <input
                                    type="date"
                                    value={meetDetails.date}
                                    onChange={(e) => setMeetDetails(prev => ({...prev, date: e.target.value}))}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Time *
                                </label>
                                <input
                                    type="time"
                                    value={meetDetails.time}
                                    onChange={(e) => setMeetDetails(prev => ({...prev, time: e.target.value}))}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Duration (minutes)
                                </label>
                                <select
                                    value={meetDetails.duration}
                                    onChange={(e) => setMeetDetails(prev => ({...prev, duration: e.target.value}))}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                >
                                    <option value="15">15 minutes</option>
                                    <option value="30">30 minutes</option>
                                    <option value="45">45 minutes</option>
                                    <option value="60">1 hour</option>
                                    <option value="90">1.5 hours</option>
                                    <option value="120">2 hours</option>
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Meeting Description
                            </label>
                            <textarea
                                value={meetDetails.description}
                                onChange={(e) => setMeetDetails(prev => ({...prev, description: e.target.value}))}
                                placeholder="Brief description of the meeting purpose and objectives..."
                                rows={3}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                            />
                        </div>

                        {/* Agenda */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Meeting Agenda
                            </label>
                            <textarea
                                value={meetDetails.agenda}
                                onChange={(e) => setMeetDetails(prev => ({...prev, agenda: e.target.value}))}
                                placeholder="1. Introduction and startup overview&#10;2. Business model discussion&#10;3. Funding requirements review&#10;4. Q&A session&#10;5. Next steps"
                                rows={4}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                            />
                        </div>

                        {/* Student Information */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 mb-2">Meeting with:</h4>
                            <div className="text-sm text-blue-700">
                                <p><strong>Student:</strong> {application.studentName}</p>
                                <p><strong>Startup:</strong> {application.startupName}</p>
                                <p><strong>Sector:</strong> {application.sector}</p>
                                <p><strong>Funding Requested:</strong> {application.fundingAmount ? `₹${parseInt(application.fundingAmount).toLocaleString()}` : 'Not specified'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleScheduleMeet}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                        Schedule Google Meet
                    </button>
                </div>
            </div>
        </div>
    );
};

const ApplicationModal: React.FC<{ application: StudentApplication; onClose: () => void; onUpdate: (updatedApp: StudentApplication) => void; onDelete: (applicationId: string) => void;}> = ({ application, onClose, onUpdate, onDelete }) => {
    const [note, setNote] = useState('');
    const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'evaluation'>('overview');
    const { user } = useAuth();

    const handleStatusChange = (newStatus: ApplicationStatus) => {
        const updatedApp = updateApplicationStatus(application.id, newStatus);
        if (updatedApp) onUpdate(updatedApp);
    };
    
    const handleAddNote = () => {
        if (!note.trim() || !user) return;
        const updatedApp = addEvaluationNoteToApplication(application.id, {adminId: user.id, adminName: user.fullName, note});
        if (updatedApp) {
            onUpdate(updatedApp);
            setNote('');
        }
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
            onDelete(application.id);
            onClose();
        }
    };

    const getStatusColor = (status: ApplicationStatus) => {
        switch (status) {
            case ApplicationStatus.SUBMITTED: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case ApplicationStatus.UNDER_REVIEW: return 'bg-blue-100 text-blue-800 border-blue-200';
            case ApplicationStatus.SHORTLISTED: return 'bg-purple-100 text-purple-800 border-purple-200';
            case ApplicationStatus.FINAL: return 'bg-green-100 text-green-800 border-green-200';
            case ApplicationStatus.REJECTED: return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: '📋' },
        { id: 'details', label: 'Details', icon: '📊' },
        { id: 'evaluation', label: 'Evaluation', icon: '📝' }
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-hp-blue to-hp-dark-blue text-white p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">{application.startupName}</h2>
                            <div className="flex items-center space-x-4 text-blue-100">
                                <span className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-300 rounded-full mr-2"></span>
                                    {application.studentName}
                                </span>
                                <span className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-300 rounded-full mr-2"></span>
                                    {application.sector}
                                </span>
                                <span className="flex items-center">
                                    <span className="w-2 h-2 bg-blue-300 rounded-full mr-2"></span>
                                    {new Date(application.submissionDate).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="mt-4">
                        <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(application.status)}`}>
                            {application.status}
                        </span>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-gray-200 bg-gray-50">
                    <div className="flex">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${
                                    activeTab === tab.id
                                        ? 'text-hp-blue border-b-2 border-hp-blue bg-white'
                                        : 'text-gray-600 hover:text-hp-blue hover:bg-gray-100'
                                }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Key Metrics */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                                    <div className="flex items-center">
                                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl mr-4">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                    </svg>
                                                </div>
                                        <div>
                                            <p className="text-sm text-blue-600 font-medium">Funding Requested</p>
                                            <p className="text-2xl font-bold text-blue-800">
                                                {application.fundingAmount ? `₹${parseInt(application.fundingAmount).toLocaleString()}` : 'Not specified'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                                    <div className="flex items-center">
                                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl mr-4">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                </div>
                                        <div>
                                            <p className="text-sm text-green-600 font-medium">Team Size</p>
                                            <p className="text-2xl font-bold text-green-800">
                                                {application.teamSize || 'Not specified'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                                    <div className="flex items-center">
                                                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white text-xl mr-4">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                        <div>
                                            <p className="text-sm text-purple-600 font-medium">Days Since Submission</p>
                                            <p className="text-2xl font-bold text-purple-800">
                                                {Math.floor((new Date().getTime() - new Date(application.submissionDate).getTime()) / (1000 * 60 * 60 * 24))}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Startup Description */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                            <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm mr-3">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </span>
                                            Startup Description
                                        </h3>
                                <p className="text-gray-700 leading-relaxed">{application.description}</p>
                            </div>

                            {/* Problem Statement */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                            <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-sm mr-3">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </span>
                                            Problem Being Solved
                                        </h3>
                                <p className="text-gray-700 leading-relaxed">{application.problemSolved}</p>
                            </div>

                            {/* Target Market */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                            <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm mr-3">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </span>
                                            Target Market
                                        </h3>
                                <p className="text-gray-700 leading-relaxed">{application.targetMarket}</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'details' && (
                        <div className="space-y-6">
                            {/* Business Model */}
                            {application.businessModel && (
                                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                        <span className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 text-sm mr-3">💼</span>
                                        Business Model
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">{application.businessModel}</p>
                                </div>
                            )}

                            {/* Competitive Advantage */}
                            {application.competitiveAdvantage && (
                                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                        <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-sm mr-3">⚡</span>
                                        Competitive Advantage
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">{application.competitiveAdvantage}</p>
                                </div>
                            )}

                            {/* Revenue Projection */}
                            {application.revenueProjection && (
                                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                        <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm mr-3">📈</span>
                                        Revenue Projection (Next 3 Years)
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">{application.revenueProjection}</p>
                                </div>
                            )}

                            {/* Implementation Timeline */}
                            {application.timeline && (
                                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                        <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm mr-3">⏰</span>
                                        Implementation Timeline
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">{application.timeline}</p>
                                </div>
                            )}

                            {/* Pitch Deck */}
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 shadow-sm">
                                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                                    <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mr-3">📄</span>
                                    Pitch Deck
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-700 font-semibold text-lg">{application.pitchDeck}</p>
                                        <p className="text-blue-600 text-sm mt-1">Click to download and review</p>
                                    </div>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'evaluation' && (
                        <div className="space-y-6">
                            {/* Status Management */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                    <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-sm mr-3">🔄</span>
                                    Update Application Status
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                    {Object.values(ApplicationStatus).map(status => (
                                        <button 
                                            key={status} 
                                            onClick={() => handleStatusChange(status)} 
                                            className={`py-3 px-4 text-sm font-semibold rounded-lg transition-all ${
                                                application.status === status 
                                                    ? 'bg-hp-blue text-white shadow-lg transform scale-105' 
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                                            }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Evaluation Notes */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                    <span className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 text-sm mr-3">📝</span>
                                    Evaluation Notes
                                </h3>
                                
                                {/* Existing Notes */}
                                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                                    {application.notes?.length ? application.notes.map(n => (
                                        <div key={n.id} className="bg-gray-50 border-l-4 border-hp-blue p-4 rounded-r-lg">
                                            <p className="text-gray-800 mb-2">{n.note}</p>
                                            <div className="flex items-center justify-between text-sm text-gray-500">
                                                <span>By {n.adminName}</span>
                                                <span>{new Date(n.timestamp).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="text-center py-8 text-gray-500">
                                            <div className="text-4xl mb-2">📝</div>
                                            <p>No evaluation notes yet</p>
                                            <p className="text-sm">Add the first note below</p>
                                        </div>
                                    )}
                                </div>

                                {/* Add New Note */}
                                <div className="border-t pt-6">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Add New Note</h4>
                                    <textarea 
                                        value={note} 
                                        onChange={e => setNote(e.target.value)} 
                                        placeholder="Add your evaluation notes here..." 
                                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hp-blue focus:border-transparent transition-all resize-none"
                                        rows={4}
                                    />
                                    <button 
                                        onClick={handleAddNote}
                                        disabled={!note.trim()}
                                        className="mt-3 bg-hp-blue text-white py-2 px-6 rounded-lg hover:bg-hp-dark-blue transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        Add Note
                                    </button>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                                    <span className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm mr-3">⚠️</span>
                                    Danger Zone
                                </h3>
                                <p className="text-red-700 mb-4">This action cannot be undone. This will permanently delete the application and all associated data.</p>
                                <button 
                                    onClick={handleDelete}
                                    className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Delete Application
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function AdminDashboard() {
    const [applications, setApplications] = useState<StudentApplication[]>([]);
    const [filter, setFilter] = useState<ApplicationStatus | 'All'>('All');
    const [selectedApp, setSelectedApp] = useState<StudentApplication | null>(null);
    const [activeTab, setActiveTab] = useState<'applications' | 'shortlisted'>('applications');
    const [meetModal, setMeetModal] = useState<{isOpen: boolean, application: StudentApplication | null}>({isOpen: false, application: null});

    useEffect(() => {
        setApplications(getApplications());
    }, []);

    const filteredApplications = useMemo(() => {
        if (filter === 'All') return applications;
        return applications.filter(app => app.status === filter);
    }, [applications, filter]);
    
    const handleUpdateApplication = (updatedApp: StudentApplication) => {
        setApplications(prev => prev.map(app => app.id === updatedApp.id ? updatedApp : app));
        setSelectedApp(updatedApp); // Keep modal open with updated data
    };

    const handleDeleteApplication = (applicationId: string) => {
        const success = deleteApplication(applicationId);
        if (success) {
            setApplications(prev => prev.filter(app => app.id !== applicationId));
        }
    };

    const handleClearAllData = () => {
        if (window.confirm('Are you sure you want to clear all data? This will delete all applications and reset to default users. This action cannot be undone.')) {
            clearAllData();
            setApplications([]);
            alert('All data has been cleared. Please refresh the page to see the reset state.');
        }
    };
    
    const statusCounts = useMemo(() => {
        return applications.reduce((acc, app) => {
            acc[app.status] = (acc[app.status] || 0) + 1;
            return acc;
        }, {} as Record<ApplicationStatus, number>);
    }, [applications]);

    return (
        <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white shadow-2xl">
                    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
                            <div className="text-center lg:text-left">
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Admin Dashboard</h1>
                                <p className="text-blue-100 text-sm sm:text-base lg:text-lg">Manage and review startup applications</p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                                <div className="text-center sm:text-right bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 w-full sm:w-auto">
                                    <p className="text-blue-200 text-xs sm:text-sm">Total Applications</p>
                                    <p className="text-2xl sm:text-3xl font-bold text-white">{applications.length}</p>
                                </div>
                                <button 
                                    onClick={handleClearAllData}
                                    className="bg-red-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full sm:w-auto"
                                >
                                    Clear All Data
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
                    {/* Tab Navigation */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 mb-6 sm:mb-8">
                        <div className="flex">
                            <button
                                onClick={() => setActiveTab('applications')}
                                className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold transition-all rounded-tl-xl ${
                                    activeTab === 'applications'
                                        ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg'
                                        : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                                }`}
                            >
                                All Applications
                            </button>
                            <button
                                onClick={() => setActiveTab('shortlisted')}
                                className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold transition-all rounded-tr-xl ${
                                    activeTab === 'shortlisted'
                                        ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg'
                                        : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                                }`}
                            >
                                Shortlisted Teams
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl p-6 shadow-xl border border-blue-500/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white mr-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-blue-100">Total</p>
                                    <p className="text-2xl font-bold text-white">{applications.length}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white rounded-xl p-6 shadow-xl border border-yellow-400/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white mr-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-yellow-100">Submitted</p>
                                    <p className="text-2xl font-bold text-white">{statusCounts[ApplicationStatus.SUBMITTED] || 0}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-xl p-6 shadow-xl border border-indigo-500/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white mr-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-indigo-100">Under Review</p>
                                    <p className="text-2xl font-bold text-white">{statusCounts[ApplicationStatus.UNDER_REVIEW] || 0}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-purple-600 to-pink-700 text-white rounded-xl p-6 shadow-xl border border-purple-500/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white mr-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-purple-100">Shortlisted</p>
                                    <p className="text-2xl font-bold text-white">{statusCounts[ApplicationStatus.SHORTLISTED] || 0}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-xl p-6 shadow-xl border border-green-500/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white mr-4">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-green-100">Final</p>
                                    <p className="text-2xl font-bold text-white">{statusCounts[ApplicationStatus.FINAL] || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content based on active tab */}
                    {activeTab === 'applications' && (
                        <>
                            {/* Filter Tabs */}
                            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 mb-6 sm:mb-8">
                                <div className="p-4 sm:p-6 border-b border-gray-200/50">
                                    <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 sm:mb-4">Filter Applications</h2>
                                    <div className="flex flex-wrap gap-2 sm:gap-3">
                                        <button 
                                            onClick={() => setFilter('All')} 
                                            className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                                                filter === 'All' 
                                                    ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg transform scale-105' 
                                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-md'
                                            }`}
                                        >
                                            All ({applications.length})
                                        </button>
                                        {Object.values(ApplicationStatus).map(status => (
                                            <button 
                                                key={status} 
                                                onClick={() => setFilter(status)} 
                                                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                                                    filter === status 
                                                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105' 
                                                        : 'bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700 hover:shadow-md'
                                                }`}
                                            >
                                                {status} ({statusCounts[status] || 0})
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'shortlisted' && (
                        <div className="bg-gradient-to-br from-purple-600 to-blue-700 text-white rounded-xl shadow-xl border border-purple-500/20 mb-8">
                            <div className="p-8">
                                <h2 className="text-3xl font-bold mb-3">Shortlisted Teams</h2>
                                <p className="text-purple-100 text-lg">Organize Google Meet sessions with promising startup teams</p>
                            </div>
                        </div>
                    )}

                    {/* Content based on active tab */}
                    {activeTab === 'applications' && (
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 overflow-hidden">
                            <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-slate-50 to-blue-50">
                                <h2 className="text-xl font-bold text-slate-800">
                                    {filter === 'All' ? 'All Applications' : `${filter} Applications`}
                                </h2>
                            </div>
                            
                            {filteredApplications.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gradient-to-r from-slate-700 to-blue-800 text-white">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-blue-100 uppercase tracking-wider">
                                                    Startup
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-blue-100 uppercase tracking-wider">
                                                    Student
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-blue-100 uppercase tracking-wider">
                                                    Sector
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-blue-100 uppercase tracking-wider">
                                                    Funding
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-blue-100 uppercase tracking-wider">
                                                    Submitted
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-blue-100 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-blue-100 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white/80 backdrop-blur-sm divide-y divide-gray-200/50">
                                            {filteredApplications.map(app => (
                                                <tr key={app.id} className="hover:bg-blue-50/50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div>
                                                            <div className="text-sm font-semibold text-slate-800">
                                                                {app.startupName}
                                                            </div>
                                                            <div className="text-sm text-slate-600 truncate max-w-xs">
                                                                {app.description}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-slate-800">{app.studentName}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300">
                                                            {app.sector}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-semibold text-slate-800">
                                                            {app.fundingAmount ? `₹${parseInt(app.fundingAmount).toLocaleString()}` : 'N/A'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-slate-600">
                                                            {new Date(app.submissionDate).toLocaleDateString()}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                                            app.status === ApplicationStatus.SUBMITTED ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300' :
                                                            app.status === ApplicationStatus.UNDER_REVIEW ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300' :
                                                            app.status === ApplicationStatus.SHORTLISTED ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300' :
                                                            app.status === ApplicationStatus.FINAL ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300' :
                                                            'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300'
                                                        }`}>
                                                            {app.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button 
                                                            onClick={() => setSelectedApp(app)} 
                                                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                                        >
                                                            View Details
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">📋</div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                                    <p className="text-gray-500">
                                        {filter === 'All' 
                                            ? 'No applications have been submitted yet.' 
                                            : `No applications with status "${filter}" found.`
                                        }
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'shortlisted' && (
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 overflow-hidden">
                            <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-purple-50 to-blue-50">
                                <h2 className="text-xl font-bold text-slate-800">Shortlisted Teams for Google Meet</h2>
                            </div>
                            
                            {applications.filter(app => app.status === ApplicationStatus.SHORTLISTED).length > 0 ? (
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {applications.filter(app => app.status === ApplicationStatus.SHORTLISTED).map(app => (
                                            <div key={app.id} className="bg-gradient-to-br from-white to-blue-50 border border-blue-200/50 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-slate-800 mb-1">{app.startupName}</h3>
                                                        <p className="text-sm text-slate-600">{app.studentName}</p>
                                                    </div>
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300">
                                                        {app.sector}
                                                    </span>
                                                </div>
                                                
                                                <p className="text-sm text-slate-700 mb-4 line-clamp-2">{app.description}</p>
                                                
                                                <div className="space-y-2 mb-4">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-slate-600">Funding Requested:</span>
                                                        <span className="font-semibold text-slate-800">{app.fundingAmount ? `₹${parseInt(app.fundingAmount).toLocaleString()}` : 'N/A'}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-slate-600">Team Size:</span>
                                                        <span className="font-semibold text-slate-800">{app.teamSize || 'N/A'}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-slate-600">Submitted:</span>
                                                        <span className="font-semibold text-slate-800">{new Date(app.submissionDate).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex space-x-2">
                                                    <button 
                                                        onClick={() => setSelectedApp(app)} 
                                                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 px-3 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
                                                    >
                                                        View Details
                                                    </button>
                                                    <button 
                                                        onClick={() => setMeetModal({isOpen: true, application: app})} 
                                                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-2.5 px-3 rounded-lg text-sm font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg"
                                                    >
                                                        Schedule Meet
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-slate-800 mb-2">No shortlisted teams yet</h3>
                                    <p className="text-slate-600">
                                        Shortlist promising applications to organize Google Meet sessions with them.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                
                {selectedApp && (
                    <ApplicationModal 
                        application={selectedApp} 
                        onClose={() => setSelectedApp(null)} 
                        onUpdate={handleUpdateApplication} 
                        onDelete={handleDeleteApplication} 
                    />
                )}

                <MeetSchedulingModal
                    application={meetModal.application}
                    isOpen={meetModal.isOpen}
                    onClose={() => setMeetModal({isOpen: false, application: null})}
                />
            </div>
        </ProtectedRoute>
    );
}
