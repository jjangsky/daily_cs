import React from 'react'
import { Link } from 'react-router-dom'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { User } from '@/types/auth'

export const Profile: React.FC = () => {
  // 정적 더미 데이터
  const user: User = {
    id: '1',
    username: 'developer123',
    email: 'dev@example.com',
    level: 23,
    experience: 2350,
    streak: 15,
    createdAt: new Date('2024-01-15')
  }

  const stats = {
    totalProblems: 45,
    averageScore: 82.5,
    bestStreak: 23,
    achievements: 12
  }

  return (
    <MobileLayout title="내 프로필">
      <div className="mobile-container py-6 space-y-6">
        {/* Profile Header */}
        <div className="card-gradient text-center space-y-4">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user.username[0].toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-accent-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow">
              {user.level}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user.username}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>

          <div className="flex justify-center gap-6">
            <div>
              <div className="text-2xl font-bold text-primary-600">🔥 {user.streak}</div>
              <div className="text-sm text-gray-600">연속 학습</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-600">⭐ {stats.achievements}</div>
              <div className="text-sm text-gray-600">획득 배지</div>
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="card">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">레벨 진행도</h3>
            <span className="text-sm text-gray-600">Lv. {user.level} → {user.level + 1}</span>
          </div>
          <div className="space-y-2">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((user.experience || 0) % 1000) / 10}%` }}
              />
            </div>
            <div className="text-right text-sm text-gray-600">
              {user.experience % 1000}/1000 XP
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">학습 통계</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-primary-600">{stats.totalProblems}</div>
              <div className="text-sm text-gray-600">푼 문제</div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-primary-600">{stats.averageScore}</div>
              <div className="text-sm text-gray-600">평균 점수</div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-primary-600">{stats.bestStreak}</div>
              <div className="text-sm text-gray-600">최고 연속</div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-primary-600">{stats.achievements}</div>
              <div className="text-sm text-gray-600">배지</div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="card space-y-1">
          <Link to="/history" className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-xl">📚</span>
              <span className="font-medium">문제 풀이 내역</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center gap-3">
              <span className="text-xl">🏆</span>
              <span className="font-medium">획득한 배지</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚙️</span>
              <span className="font-medium">설정</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Logout Button */}
        <button className="btn-secondary w-full">
          로그아웃
        </button>
      </div>
    </MobileLayout>
  )
}