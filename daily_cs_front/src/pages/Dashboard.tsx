import React from 'react'
import { Link } from 'react-router-dom'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { Challenge } from '@/types/challenge'
import { User } from '@/types/auth'

export const Dashboard: React.FC = () => {
  // 정적 더미 데이터
  const user: User = {
    id: '1',
    username: 'developer123',
    email: 'dev@example.com',
    level: 23,
    experience: 2350,
    streak: 15,
    createdAt: new Date()
  }

  const todayChallenge: Challenge = {
    id: '1',
    date: new Date(),
    category: 'DATA_STRUCTURES',
    difficulty: 'MEDIUM',
    title: 'Binary Tree의 순회 방법',
    description: 'Binary Tree의 전위(Preorder), 중위(Inorder), 후위(Postorder) 순회에 대해 설명하고, 각각의 사용 사례를 예시와 함께 작성하세요.',
    hints: ['순회 순서의 차이점에 주목하세요'],
    relatedConcepts: ['Tree', 'Recursion', 'DFS']
  }

  const streak = 15
  const recentScores = [87, 92, 78, 85, 90]

  const categoryKorean = {
    DATA_STRUCTURES: '자료구조',
    ALGORITHMS: '알고리즘',
    OPERATING_SYSTEMS: '운영체제',
    NETWORKS: '네트워크',
    DATABASES: '데이터베이스',
    SYSTEM_DESIGN: '시스템 설계'
  }

  const difficultyKorean = {
    EASY: '쉬움',
    MEDIUM: '보통',
    HARD: '어려움'
  }

  const difficultyColor = {
    EASY: 'text-green-600',
    MEDIUM: 'text-yellow-600',
    HARD: 'text-red-600'
  }

  return (
    <MobileLayout title="대시보드">
      <div className="mobile-container py-6 space-y-6">
        {/* 사용자 정보 */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">안녕하세요, {user?.username}님! 🎯</h2>
              <p className="text-primary-100 mt-1">오늘도 함께 성장해요</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">🔥 {streak}</div>
              <div className="text-sm text-primary-100">연속 학습</div>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Lv. {user?.level}</span>
              <span className="text-sm">{user?.experience}/3000 XP</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{ width: `${((user?.experience || 0) / 3000) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* 오늘의 문제 */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">오늘의 문제</h3>
            <span className={`text-sm font-medium ${difficultyColor[todayChallenge?.difficulty || 'MEDIUM']}`}>
              ⭐ {difficultyKorean[todayChallenge?.difficulty || 'MEDIUM']}
            </span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                {categoryKorean[todayChallenge?.category || 'DATA_STRUCTURES']}
              </span>
              <span className="text-xs text-gray-500">
                {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
              </span>
            </div>
            
            <h4 className="font-medium text-gray-900">
              {todayChallenge?.title}
            </h4>
            
            <p className="text-sm text-gray-600 line-clamp-2">
              {todayChallenge?.description}
            </p>
            
            <Link to="/challenge" className="btn-primary w-full text-center">
              답변하기
            </Link>
          </div>
        </div>

        {/* 학습 통계 */}
        <div className="card">
          <h3 className="text-lg font-bold mb-4">학습 통계</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">45</div>
              <div className="text-sm text-gray-600">총 문제</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">82.5</div>
              <div className="text-sm text-gray-600">평균 점수</div>
            </div>
          </div>

          {/* 최근 점수 그래프 */}
          <div className="mt-4">
            <div className="flex items-end justify-between h-20 gap-1">
              {recentScores.map((score, index) => (
                <div
                  key={index}
                  className="flex-1 bg-primary-200 rounded-t"
                  style={{ height: `${(score / 100) * 100}%` }}
                />
              ))}
            </div>
            <div className="text-xs text-gray-500 text-center mt-2">최근 5개 문제</div>
          </div>
        </div>

        {/* 획득 배지 */}
        <div className="card">
          <h3 className="text-lg font-bold mb-4">최근 획득 배지</h3>
          
          <div className="flex gap-4 overflow-x-auto">
            <div className="flex-shrink-0 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-2xl mb-1">
                🔥
              </div>
              <div className="text-xs">연속 7일</div>
            </div>
            <div className="flex-shrink-0 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl mb-1">
                🎖️
              </div>
              <div className="text-xs">자료구조 입문</div>
            </div>
            <div className="flex-shrink-0 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-2xl mb-1">
                🌟
              </div>
              <div className="text-xs">첫 만점</div>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}