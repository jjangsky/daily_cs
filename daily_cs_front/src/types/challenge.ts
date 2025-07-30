export type Category = 
  | 'DATA_STRUCTURES' 
  | 'ALGORITHMS' 
  | 'OPERATING_SYSTEMS' 
  | 'NETWORKS' 
  | 'DATABASES' 
  | 'SYSTEM_DESIGN'

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'

export interface Challenge {
  id: string
  date: Date
  category: Category
  difficulty: Difficulty
  title: string
  description: string
  hints: string[]
  relatedConcepts: string[]
}

export interface Answer {
  id: string
  userId: string
  challengeId: string
  content: string
  score?: number
  feedback?: Feedback
  isPublic: boolean
  githubUrl?: string
  createdAt: Date
  updatedAt: Date
}

export interface Feedback {
  id: string
  score: number
  strengths: string[]
  improvements: string[]
  detailedScores: {
    accuracy: number
    completeness: number
    clarity: number
    insights: number
  }
  recommendations: Recommendation[]
}

export interface Recommendation {
  type: 'article' | 'video' | 'book' | 'practice'
  title: string
  url: string
  description: string
}