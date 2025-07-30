import React from 'react'
import { MobileLayout } from '@/components/layout/MobileLayout'

type ProblemHistory = {
  id: string
  date: Date
  title: string
  category: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  score: number
  timeSpent: number // minutes
}

export const History: React.FC = () => {
  // 정적 더미 데이터
  const problemHistory: ProblemHistory[] = [
    {
      id: '1',
      date: new Date('2024-01-30'),
      title: 'Binary Tree의 순회 방법',
      category: 'DATA_STRUCTURES',
      difficulty: 'MEDIUM',
      score: 87,
      timeSpent: 15
    },
    {
      id: '2',
      date: new Date('2024-01-29'),
      title: 'TCP와 UDP의 차이점',
      category: 'NETWORKS',
      difficulty: 'EASY',
      score: 92,
      timeSpent: 8
    },
    {
      id: '3',
      date: new Date('2024-01-28'),
      title: '퀵소트 알고리즘 구현',
      category: 'ALGORITHMS',
      difficulty: 'HARD',
      score: 78,
      timeSpent: 25
    },
    {
      id: '4',
      date: new Date('2024-01-27'),
      title: '데드락의 발생 조건',
      category: 'OPERATING_SYSTEMS',
      difficulty: 'MEDIUM',
      score: 85,
      timeSpent: 12
    },
    {
      id: '5',
      date: new Date('2024-01-26'),
      title: 'ACID 특성 설명',
      category: 'DATABASES',
      difficulty: 'MEDIUM',
      score: 90,
      timeSpent: 10
    }
  ]

  const categoryKorean: Record<string, string> = {
    DATA_STRUCTURES: '자료구조',
    ALGORITHMS: '알고리즘',
    OPERATING_SYSTEMS: '운영체제',
    NETWORKS: '네트워크',
    DATABASES: '데이터베이스',
    SYSTEM_DESIGN: '시스템 설계'
  }

  const difficultyKorean: Record<string, string> = {
    EASY: '쉬움',
    MEDIUM: '보통',
    HARD: '어려움'
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'EASY': return 'badge-success'
      case 'MEDIUM': return 'badge-accent'
      case 'HARD': return 'text-red-700 bg-red-100'
      default: return ''
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success-600'
    if (score >= 80) return 'text-primary-600'
    if (score >= 70) return 'text-accent-600'
    return 'text-red-600'
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return '오늘'
    if (diffDays === 1) return '어제'
    if (diffDays < 7) return `${diffDays}일 전`
    
    return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })
  }

  // 월별 그룹화
  const groupedHistory = problemHistory.reduce((acc, problem) => {
    const monthKey = problem.date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })
    if (!acc[monthKey]) {
      acc[monthKey] = []
    }
    acc[monthKey].push(problem)
    return acc
  }, {} as Record<string, ProblemHistory[]>)

  return (
    <MobileLayout title="문제 풀이 내역" showBack>
      <div className="mobile-container py-6 space-y-6">
        {/* Summary Stats */}
        <div className="card-gradient">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-600">{problemHistory.length}</div>
              <div className="text-sm text-gray-600">총 문제</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-600">
                {Math.round(problemHistory.reduce((sum, p) => sum + p.score, 0) / problemHistory.length)}
              </div>
              <div className="text-sm text-gray-600">평균 점수</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-600">
                {Math.round(problemHistory.reduce((sum, p) => sum + p.timeSpent, 0) / problemHistory.length)}분
              </div>
              <div className="text-sm text-gray-600">평균 시간</div>
            </div>
          </div>
        </div>

        {/* History List */}
        {Object.entries(groupedHistory).map(([month, problems]) => (
          <div key={month} className="space-y-3">
            <h3 className="font-semibold text-gray-700 px-2">{month}</h3>
            <div className="space-y-3">
              {problems.map((problem) => (
                <div key={problem.id} className="card hover:shadow-lg cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{problem.title}</h4>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="badge badge-primary text-xs">
                          {categoryKorean[problem.category]}
                        </span>
                        <span className={`badge ${getDifficultyColor(problem.difficulty)} text-xs`}>
                          {difficultyKorean[problem.difficulty]}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(problem.date)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className={`text-2xl font-bold ${getScoreColor(problem.score)}`}>
                        {problem.score}
                      </div>
                      <div className="text-xs text-gray-500">{problem.timeSpent}분</div>
                    </div>
                  </div>
                  
                  {/* Score Bar */}
                  <div className="mt-3">
                    <div className="progress-bar h-1.5">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          problem.score >= 90 ? 'bg-success-500' :
                          problem.score >= 80 ? 'bg-primary-500' :
                          problem.score >= 70 ? 'bg-accent-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${problem.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MobileLayout>
  )
}