import { api } from './api'
import { User, LoginCredentials } from '@/types/auth'
import { mockService } from './mock.service'

// 개발 모드에서 목업 서비스 사용
const USE_MOCK = true // 백엔드가 준비되면 false로 변경

export const authService = {
  // 일반 로그인
  async login(credentials: LoginCredentials) {
    if (USE_MOCK) {
      const response = await mockService.login(credentials)
      localStorage.setItem('accessToken', response.accessToken)
      localStorage.setItem('refreshToken', response.refreshToken)
      return response.user
    }
    
    const response = await api.post('/auth/login', credentials)
    const { accessToken, refreshToken, user } = response.data
    
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    
    return user as User
  },

  // OAuth 로그인 URL 생성
  getOAuthUrl(provider: 'google' | 'github') {
    const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback')
    
    if (provider === 'google') {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'mock-google-client-id'
      const scope = encodeURIComponent('openid email profile')
      return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=google`
    } else {
      const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID || 'mock-github-client-id'
      const scope = encodeURIComponent('user:email repo')
      return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=github`
    }
  },

  // OAuth 콜백 처리
  async handleOAuthCallback(code: string, provider: string) {
    const response = await api.post(`/auth/oauth/${provider}/callback`, { code })
    const { accessToken, refreshToken, user } = response.data
    
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    
    return user as User
  },

  // 로그아웃
  async logout() {
    if (USE_MOCK) {
      await mockService.logout()
      return
    }
    
    try {
      await api.post('/auth/logout')
    } finally {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  },

  // 현재 사용자 정보 가져오기
  async getCurrentUser() {
    if (USE_MOCK) {
      return await mockService.getCurrentUser()
    }
    
    const response = await api.get('/auth/me')
    return response.data as User
  },

  // 회원가입
  async register(data: { email: string; password: string; username: string }) {
    const response = await api.post('/auth/register', data)
    const { accessToken, refreshToken, user } = response.data
    
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    
    return user as User
  }
}