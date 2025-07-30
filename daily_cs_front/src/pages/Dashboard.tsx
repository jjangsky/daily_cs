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
        {/* Welcome Header with Modern Gradient */}
        <div className="card-gradient relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary-300/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-accent-300/20 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">안녕하세요, {user?.username}님!</h2>
                <p className="text-gray-600 mt-1">오늘도 한 걸음 더 성장해요</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600 flex items-center gap-1">
                  <span className="text-2xl">🔥</span> {streak}
                </div>
                <div className="text-sm text-gray-600">연속 학습</div>
              </div>
            </div>
            
            {/* Level Progress */}
            <div className="bg-white/60 backdrop-blur rounded-2xl p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-700">레벨 {user?.level}</span>
                <span className="text-sm text-gray-600">{user?.experience % 1000}/1000 XP</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${((user?.experience || 0) % 1000) / 10}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Today's Challenge Card */}
        <div className="card hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💡</span>
              <h3 className="text-lg font-bold text-gray-900">오늘의 도전</h3>
            </div>
            <span className={`badge ${
              todayChallenge?.difficulty === 'EASY' ? 'badge-success' :
              todayChallenge?.difficulty === 'HARD' ? 'bg-red-100 text-red-700' :
              'badge-accent'
            }`}>
              {difficultyKorean[todayChallenge?.difficulty || 'MEDIUM']}
            </span>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="badge badge-primary">
                {categoryKorean[todayChallenge?.category || 'DATA_STRUCTURES']}
              </span>
              <span className="text-sm text-gray-500">
                {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
              </span>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg text-gray-900 mb-2">
                {todayChallenge?.title}
              </h4>
              
              <p className="text-gray-600 line-clamp-3">
                {todayChallenge?.description}
              </p>
            </div>
            
            <Link to="/challenge" className="btn-accent w-full text-center">
              도전하기 →
            </Link>
          </div>
        </div>

        {/* Learning Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card text-center">
            <span className="text-3xl mb-2">📊</span>
            <div className="text-3xl font-bold text-primary-600">45</div>
            <div className="text-sm text-gray-600">완료한 문제</div>
          </div>
          <div className="card text-center">
            <span className="text-3xl mb-2">⭐</span>
            <div className="text-3xl font-bold text-primary-600">82.5</div>
            <div className="text-sm text-gray-600">평균 점수</div>
          </div>
        </div>

        {/* Recent Performance */}
        <div className="card">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span>📈</span> 최근 성과
          </h3>
          
          {/* Score Chart */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-end justify-between h-24 gap-2">
              {recentScores.map((score, index) => (
                <div key={index} className="flex-1 relative group">
                  <div
                    className="bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-lg transition-all duration-300 hover:from-primary-600 hover:to-primary-500"
                    style={{ height: `${(score / 100) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded">
                      {score}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500 text-center mt-3">최근 5개 문제</div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="card">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span>🏆</span> 최근 성취
          </h3>
          
          <div className="flex gap-3 overflow-x-auto pb-2">
            <div className="achievement-card from-yellow-100 to-orange-100 min-w-[100px]">
              <div className="text-4xl mb-2">🔥</div>
              <div className="text-xs font-medium text-gray-700">7일 연속</div>
              <div className="text-xs text-gray-500">학습 달성</div>
            </div>
            <div className="achievement-card from-purple-100 to-pink-100 min-w-[100px]">
              <div className="text-4xl mb-2">🎯</div>
              <div className="text-xs font-medium text-gray-700">자료구조</div>
              <div className="text-xs text-gray-500">마스터</div>
            </div>
            <div className="achievement-card from-green-100 to-emerald-100 min-w-[100px]">
              <div className="text-4xl mb-2">💯</div>
              <div className="text-xs font-medium text-gray-700">첫 만점</div>
              <div className="text-xs text-gray-500">달성</div>
            </div>
            <div className="achievement-card from-blue-100 to-cyan-100 min-w-[100px]">
              <div className="text-4xl mb-2">🚀</div>
              <div className="text-xs font-medium text-gray-700">빠른 학습</div>
              <div className="text-xs text-gray-500">10분 내</div>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}