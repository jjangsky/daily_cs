export interface User {
  id: string
  email: string
  username: string
  githubId?: string
  googleId?: string
  level: number
  experience: number
  streak: number
  profileImage?: string
  createdAt: Date
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface OAuthProvider {
  name: 'google' | 'github'
  clientId: string
  redirectUri: string
  scope: string
}