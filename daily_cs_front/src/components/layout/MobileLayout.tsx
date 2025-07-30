import React from 'react'
import { useLocation, Link } from 'react-router-dom'

interface MobileLayoutProps {
  children: React.ReactNode
  showNav?: boolean
  showHeader?: boolean
  title?: string
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  showNav = true,
  showHeader = true,
  title = 'Daily CS Challenge'
}) => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      {showHeader && (
        <header className="bg-white border-b border-gray-200 safe-top">
          <div className="mobile-container py-4">
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 pb-16">
        {children}
      </main>

      {/* Bottom Navigation */}
      {showNav && (
        <nav className="bottom-nav">
          <Link
            to="/dashboard"
            className={`flex flex-col items-center justify-center flex-1 py-2 ${
              isActive('/dashboard') ? 'text-primary-600' : 'text-gray-400'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">홈</span>
          </Link>

          <Link
            to="/challenge"
            className={`flex flex-col items-center justify-center flex-1 py-2 ${
              isActive('/challenge') ? 'text-primary-600' : 'text-gray-400'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-xs mt-1">문제</span>
          </Link>

          <Link
            to="/community"
            className={`flex flex-col items-center justify-center flex-1 py-2 ${
              isActive('/community') ? 'text-primary-600' : 'text-gray-400'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-xs mt-1">커뮤니티</span>
          </Link>

          <Link
            to="/profile"
            className={`flex flex-col items-center justify-center flex-1 py-2 ${
              isActive('/profile') ? 'text-primary-600' : 'text-gray-400'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1">프로필</span>
          </Link>
        </nav>
      )}
    </div>
  )
}