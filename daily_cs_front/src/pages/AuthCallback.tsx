import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { authService } from '@/services/auth.service'

export const AuthCallback: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code')
      const state = searchParams.get('state')
      const error = searchParams.get('error')

      if (error) {
        setError('인증이 취소되었습니다.')
        setTimeout(() => navigate('/login'), 3000)
        return
      }

      if (!code || !state) {
        setError('잘못된 요청입니다.')
        setTimeout(() => navigate('/login'), 3000)
        return
      }

      try {
        // OAuth 제공자 확인 (state에 저장됨)
        const provider = state as 'google' | 'github'
        await authService.handleOAuthCallback(code, provider)
        
        // 성공 시 대시보드로 이동
        navigate('/dashboard')
      } catch (err: any) {
        setError(err.response?.data?.message || '로그인 처리 중 오류가 발생했습니다.')
        setTimeout(() => navigate('/login'), 3000)
      }
    }

    handleCallback()
  }, [navigate, searchParams])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        {error ? (
          <>
            <div className="text-red-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">오류 발생</h2>
            <p className="text-gray-600">{error}</p>
            <p className="text-sm text-gray-500 mt-2">잠시 후 로그인 페이지로 이동합니다...</p>
          </>
        ) : (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">로그인 처리 중</h2>
            <p className="text-gray-600">잠시만 기다려주세요...</p>
          </>
        )}
      </div>
    </div>
  )
}