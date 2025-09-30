import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* HP Branding Section */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Image 
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/HP_logo_2025.svg" 
                alt="HP Logo" 
                width={32}
                height={32}
                className="mr-3"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-900">Fund for Future</h3>
                <p className="text-gray-600 text-sm">Empowering Student Entrepreneurs</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-md">
              HP&#39;s Fund for Future initiative is dedicated to nurturing the next generation of innovators and entrepreneurs. 
              We provide seed funding, mentorship, and resources to help students turn their ideas into reality.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-all duration-300 group">
                <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-all" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-all duration-300 group">
                <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-all" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.675 0h-21.35C.595 0 0 .593 0 1.326v21.348C0 23.406.595 24 1.326 24h11.495v-9.294H9.691V11.08h3.13V8.413c0-3.1 1.894-4.786 4.659-4.786 1.325 0 2.463.099 2.794.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.764v2.317h3.59l-.467 3.626h-3.123V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .593 23.406 0 22.675 0z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-all duration-300 group">
                <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-all" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                  Apply Now
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                  Login
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                  About Program
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">500+</div>
              <div className="text-gray-600 text-xs">Students Supported</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">₹50M+</div>
              <div className="text-gray-600 text-xs">Funding Disbursed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">100+</div>
              <div className="text-gray-600 text-xs">Startups Launched</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">25+</div>
              <div className="text-gray-600 text-xs">Partner Colleges</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-gray-600 text-xs">
              &copy; {new Date().getFullYear()} HP Development Company, L.P. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 text-xs">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Contact</a>
            </div>
          </div>
          <div className="mt-2 text-center">
            <p className="text-gray-500 text-xs">
              Fund for Future Initiative • Empowering the next generation of innovators
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
