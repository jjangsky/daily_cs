import { User } from '@/types/auth'
import { Challenge } from '@/types/challenge'

// 목업 사용자 데이터
const mockUser: User = {
  id: '1',
  username: 'developer123',
  email: 'dev@example.com',
  level: 23,
  experience: 2350,
  streak: 15,
  createdAt: new Date()
}

// 목업 챌린지 데이터
const mockChallenges: Challenge[] = [
  {
    id: '1',
    date: new Date(),
    category: 'DATA_STRUCTURES',
    difficulty: 'MEDIUM',
    title: 'Binary Tree의 순회 방법',
    description: 'Binary Tree의 전위(Preorder), 중위(Inorder), 후위(Postorder) 순회에 대해 설명하고, 각각의 사용 사례를 예시와 함께 작성하세요.',
    hints: ['순회 순서의 차이점에 주목하세요', '재귀적 접근과 반복적 접근을 모두 고려하세요'],
    relatedConcepts: ['Tree', 'Recursion', 'DFS']
  },
  {
    id: '2',
    date: new Date(Date.now() - 86400000), // 어제
    category: 'ALGORITHMS',
    difficulty: 'EASY',
    title: '시간 복잡도와 공간 복잡도',
    description: '알고리즘의 시간 복잡도와 공간 복잡도의 개념을 설명하고, Big O 표기법을 사용하여 예시를 들어 설명하세요.',
    hints: ['최악의 경우를 기준으로 설명하세요'],
    relatedConcepts: ['Big O', 'Algorithm Analysis']
  }
]

// API 호출을 시뮬레이션하는 유틸리티 함수
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const mockService = {
  // 인증 관련
  async login(credentials: { email: string; password: string }) {
    await delay(500) // API 호출 시뮬레이션
    
    // 간단한 검증
    if (credentials.email === 'test@example.com' && credentials.password === 'password') {
      return {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        user: mockUser
      }
    }
    
    throw new Error('Invalid credentials')
  },

  async getCurrentUser() {
    await delay(300)
    const token = localStorage.getItem('accessToken')
    
    if (!token) {
      throw new Error('Not authenticated')
    }
    
    return mockUser
  },

  async logout() {
    await delay(200)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  },

  // 챌린지 관련
  async getTodayChallenge() {
    await delay(400)
    return mockChallenges[0]
  },

  async getChallengeById(id: string) {
    await delay(300)
    const challenge = mockChallenges.find(c => c.id === id)
    
    if (!challenge) {
      throw new Error('Challenge not found')
    }
    
    return challenge
  },

  async submitAnswer(challengeId: string, answer: string) {
    await delay(800)
    
    // 간단한 점수 계산 (실제로는 백엔드에서 처리)
    const score = Math.floor(Math.random() * 30) + 70 // 70-100점
    
    return {
      challengeId,
      score,
      feedback: '좋은 답변입니다! 더 자세한 예시를 추가하면 더 좋을 것 같아요.',
      submittedAt: new Date()
    }
  },

  // 통계 관련
  async getUserStats() {
    await delay(300)
    
    return {
      totalChallenges: 45,
      currentStreak: 15,
      longestStreak: 23,
      averageScore: 85.5,
      completionRate: 0.92,
      recentScores: [87, 92, 78, 85, 90, 83, 88]
    }
  }
}