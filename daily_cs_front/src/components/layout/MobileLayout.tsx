import React from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'

interface MobileLayoutProps {
  children: React.ReactNode
  showNav?: boolean
  showHeader?: boolean
  showBack?: boolean
  title?: string
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  showNav = true,
  showHeader = true,
  showBack = false,
  title = 'Daily CS'
}) => {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      {showHeader && (
        <header className="bg-white/80 backdrop-blur-lg border-b border-gray-100 safe-top sticky top-0 z-10">
          <div className="mobile-container py-4 flex items-center justify-between">
            {showBack ? (
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <h1 className="text-lg font-semibold">{title}</h1>
              </button>
            ) : (
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                {title}
              </h1>
            )}
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={`flex-1 ${showNav ? 'pb-24' : ''}`}>
        {children}
      </main>

      {/* Bottom Navigation - MVP features only */}
      {showNav && (
        <nav className="bottom-nav">
          <Link
            to="/dashboard"
            className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1 font-medium">홈</span>
          </Link>

          <Link
            to="/challenge"
            className={`nav-item ${isActive('/challenge') ? 'active' : ''}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="text-xs mt-1 font-medium">문제</span>
          </Link>

          <Link
            to="/history"
            className={`nav-item ${isActive('/history') ? 'active' : ''}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span className="text-xs mt-1 font-medium">내역</span>
          </Link>

          <Link
            to="/profile"
            className={`nav-item ${isActive('/profile') ? 'active' : ''}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1 font-medium">프로필</span>
          </Link>
        </nav>
      )}
    </div>
  )
}