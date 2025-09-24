'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { addUser, getUserByEmail } from '@/services/storageService'
import { UserRole } from '@/types'
import { ROUTES } from '@/constants'

export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [college, setCollege] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [collegeIdProof, setCollegeIdProof] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    if (getUserByEmail(email)) {
      setError('An account with this email already exists. Please use a different email or try logging in.')
      setIsLoading(false)
      return
    }

    try {
      addUser({
        fullName,
        college,
        email,
        password,
        role: UserRole.STUDENT,
        collegeIdProof: collegeIdProof?.name,
      })
      setSuccess('🎉 Registration successful! Redirecting to login...')
      setTimeout(() => router.push(ROUTES.LOGIN), 2000)
    } catch (err) {
      setError('An error occurred during registration. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-hp-light-gray py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-hp-dark-blue mb-6">Create Your Account</h2>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>}
        {success && <p className="bg-green-100 text-green-700 p-3 rounded-md mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-hp-gray text-sm font-bold mb-2" htmlFor="fullName">Full Name</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-hp-gray" id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-hp-gray text-sm font-bold mb-2" htmlFor="college">College Name</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-hp-gray" id="college" type="text" value={college} onChange={(e) => setCollege(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-hp-gray text-sm font-bold mb-2" htmlFor="email">College Email ID</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-hp-gray" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block text-hp-gray text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-hp-gray" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="mb-6">
            <label className="block text-hp-gray text-sm font-bold mb-2" htmlFor="idProof">Upload College ID Proof</label>
            <input className="block w-full text-sm text-hp-gray file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-hp-blue file:text-white hover:file:bg-hp-dark-blue" id="idProof" type="file" onChange={(e) => setCollegeIdProof(e.target.files ? e.target.files[0] : null)} required />
          </div>
          <button className="bg-hp-blue hover:bg-hp-dark-blue text-white font-bold py-2 px-4 rounded-full w-full transition duration-300" type="submit">Register</button>
        </form>
         <p className="text-center text-hp-gray text-sm mt-6">
            Already have an account?{' '}
            <Link href={ROUTES.LOGIN} className="font-bold text-hp-blue hover:text-hp-dark-blue">
                Login here
            </Link>
        </p>
      </div>
    </div>
  )
}
