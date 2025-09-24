'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { UserRole } from '@/types'
import { ROUTES } from '@/constants'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log('ProtectedRoute - isAuthenticated:', isAuthenticated, 'user:', user, 'loading:', loading, 'allowedRoles:', allowedRoles);
    if (!loading) {
      if (!isAuthenticated || !user) {
        console.log('ProtectedRoute - redirecting to login');
        router.push(ROUTES.LOGIN)
        return
      }
      
      if (!allowedRoles.includes(user.role)) {
        console.log('ProtectedRoute - redirecting to home, user role not allowed');
        router.push(ROUTES.HOME)
        return
      }
    }
  }, [isAuthenticated, user, loading, allowedRoles, router])

  if (loading) {
    return <div className="text-center p-10">Loading...</div>
  }

  if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}