'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ROUTES } from '@/constants'

const CheckmarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Overview' },
    { id: 'initiative', label: 'Initiative', icon: 'Initiative' },
    { id: 'entrepreneurship', label: 'Entrepreneurship Lab', icon: 'Learning' },
    { id: 'success', label: 'Success Stories', icon: 'Stories' }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/HP_logo_2025.svg" 
                alt="HP Logo" 
                className="h-16 w-auto filter brightness-0 invert"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Fueling Dreams <span className="text-blue-400">Beyond Boundaries</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              HP India's 'Fund for Future' is empowering the next generation of innovators from Tier 2 & 3 colleges to build the future.
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                href={ROUTES.REGISTER} 
                className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Apply as Student
              </Link>
              <Link 
                href={ROUTES.LOGIN} 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 py-4 px-8 rounded-lg text-lg font-semibold transition-all duration-300"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Explore Fund for Future</h2>
            <p className="text-gray-600">Discover everything you need to know about our initiative</p>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-3 bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center space-x-2 min-w-[140px] justify-center ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md'
                  }`}
                >
                  {/* Icon for each tab */}
                  <div className={`transition-all duration-300 ${
                    activeTab === tab.id ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'
                  }`}>
                    {tab.id === 'overview' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    )}
                    {tab.id === 'initiative' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )}
                    {tab.id === 'entrepreneurship' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    )}
                    {tab.id === 'success' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium">{tab.label}</span>
                  
                  {/* Active indicator */}
                  {activeTab === tab.id && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="container mx-auto px-6 py-12">
        {activeTab === 'overview' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">About Fund for Future</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A CSR initiative by HP India to discover and nurture startup ideas from untapped talent across Tier 2 & 3 colleges.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Support & Funding</h3>
                <p className="text-gray-600">We provide initial seed funding and mentorship to turn innovative ideas into reality.</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Tier 2 & 3 Focus</h3>
                <p className="text-gray-600">Creating a level playing field for talented students across India's smaller cities.</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Expert Mentorship</h3>
                <p className="text-gray-600">Guidance from HP's industry leaders and startup ecosystem experts.</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">How to Participate</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Register</h4>
                  <p className="text-gray-600">Create your account using your college email ID and upload verification documents.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Submit Your Idea</h4>
                  <p className="text-gray-600">Fill out the comprehensive application form and upload your pitch deck.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Track & Succeed</h4>
                  <p className="text-gray-600">Monitor your application status and prepare for interviews with shortlisted teams.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'initiative' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Initiative Details</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Learn more about HP India's commitment to fostering innovation and entrepreneurship across India.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Mission</h3>
                <p className="text-gray-600 mb-6">
                  HP India's Fund for Future Initiative aims to bridge the gap between talent and opportunity by providing 
                  comprehensive support to innovative students from Tier 2 & 3 colleges across India.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckmarkIcon />
                    <span className="ml-3 text-gray-700">Seed funding for promising startup ideas</span>
                  </div>
                  <div className="flex items-start">
                    <CheckmarkIcon />
                    <span className="ml-3 text-gray-700">Mentorship from industry experts</span>
                  </div>
                  <div className="flex items-start">
                    <CheckmarkIcon />
                    <span className="ml-3 text-gray-700">Access to HP's technology resources</span>
                  </div>
                  <div className="flex items-start">
                    <CheckmarkIcon />
                    <span className="ml-3 text-gray-700">Networking opportunities with investors</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
                <h4 className="text-xl font-bold text-slate-900 mb-4">Eligibility Criteria</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <CheckmarkIcon />
                    <span className="ml-3">Students from Tier 2 & 3 colleges in India</span>
                  </li>
                  <li className="flex items-start">
                    <CheckmarkIcon />
                    <span className="ml-3">Innovative startup ideas with market potential</span>
                  </li>
                  <li className="flex items-start">
                    <CheckmarkIcon />
                    <span className="ml-3">Clear business model and execution plan</span>
                  </li>
                  <li className="flex items-start">
                    <CheckmarkIcon />
                    <span className="ml-3">Passion for entrepreneurship and innovation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'entrepreneurship' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Entrepreneurship Lab</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Free courses and lectures designed to accelerate your entrepreneurial journey. Learn from industry experts and build the skills needed to succeed.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Business Fundamentals</h3>
                <p className="text-gray-600 text-sm mb-3">Master the basics of starting and running a successful business.</p>
                <div className="space-y-1">
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckmarkIcon />
                    <span className="ml-2">Business Model Canvas</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckmarkIcon />
                    <span className="ml-2">Market Research & Analysis</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckmarkIcon />
                    <span className="ml-2">Financial Planning</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Innovation & Technology</h3>
                <p className="text-gray-600 text-sm mb-3">Leverage technology to build innovative solutions and scale your startup.</p>
                <div className="space-y-1">
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckmarkIcon />
                    <span className="ml-2">Digital Transformation</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckmarkIcon />
                    <span className="ml-2">AI & Machine Learning</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckmarkIcon />
                    <span className="ml-2">Product Development</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Marketing & Sales</h3>
                <p className="text-gray-600 text-sm mb-3">Learn to market your product and build a sustainable customer base.</p>
                <div className="space-y-1">
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckmarkIcon />
                    <span className="ml-2">Digital Marketing</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckmarkIcon />
                    <span className="ml-2">Sales Strategy</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckmarkIcon />
                    <span className="ml-2">Brand Building</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Leadership & Team</h3>
                <p className="text-gray-600 text-sm mb-3">Build and lead high-performing teams to achieve your vision.</p>
                <div className="space-y-1">
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckmarkIcon />
                    <span className="ml-2">Team Building</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckmarkIcon />
                    <span className="ml-2">Leadership Skills</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckmarkIcon />
                    <span className="ml-2">Performance Management</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Funding & Investment</h3>
                <p className="text-gray-600 text-sm mb-3">Navigate the funding landscape and secure investment for your startup.</p>
                <div className="space-y-1">
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckmarkIcon />
                    <span className="ml-2">Pitch Deck Creation</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckmarkIcon />
                    <span className="ml-2">Investor Relations</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckmarkIcon />
                    <span className="ml-2">Valuation Methods</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Growth & Scaling</h3>
                <p className="text-gray-600 text-sm mb-3">Scale your startup efficiently and sustainably for long-term success.</p>
                <div className="space-y-1">
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckmarkIcon />
                    <span className="ml-2">Growth Strategies</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckmarkIcon />
                    <span className="ml-2">Operations Optimization</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <CheckmarkIcon />
                    <span className="ml-2">International Expansion</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Learning?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Access all courses and lectures completely free. Join thousands of aspiring entrepreneurs who are building the future.
              </p>
              <div className="flex justify-center space-x-4">
                <Link 
                  href={ROUTES.REGISTER} 
                  className="bg-white text-blue-600 py-3 px-8 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg"
                >
                  Get Started Free
                </Link>
                <button className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300">
                  Browse Courses
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'success' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Success Stories</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Hear from entrepreneurs who have transformed their ideas into successful ventures with HP's support.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <img src="https://picsum.photos/60/60?grayscale" alt="Priya Sharma" className="w-15 h-15 rounded-full"/>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">Priya Sharma</h4>
                    <p className="text-sm text-gray-600 mb-3">CEO, Learnify</p>
                    <p className="text-gray-700 italic">
                      "The Fund for Future Initiative was a game-changer for us. The funding and mentorship from HP helped us launch our ed-tech platform and reach our first 1,000 users within 6 months."
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <img src="https://picsum.photos/60/61?grayscale" alt="Rahul Verma" className="w-15 h-15 rounded-full"/>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">Rahul Verma</h4>
                    <p className="text-sm text-gray-600 mb-3">Founder, AgriConnect</p>
                    <p className="text-gray-700 italic">
                      "Coming from a small town, I never imagined getting this kind of support. HP's belief in our vision for a sustainable agriculture startup was incredible and helped us scale to 5 states."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

    </div>
  );
}
