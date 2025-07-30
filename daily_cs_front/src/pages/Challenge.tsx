import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { Challenge as ChallengeType } from '@/types/challenge'

export const Challenge: React.FC = () => {
  const navigate = useNavigate()
  const [challenge, setChallenge] = useState<ChallengeType | null>(null)
  const [answer, setAnswer] = useState('')
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60) // 24시간 in seconds
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    // TODO: API에서 오늘의 문제 가져오기
    setChallenge({
      id: '1',
      date: new Date(),
      category: 'DATA_STRUCTURES',
      difficulty: 'MEDIUM',
      title: 'Binary Tree의 순회 방법',
      description: 'Binary Tree의 전위(Preorder), 중위(Inorder), 후위(Postorder) 순회에 대해 설명하고, 각각의 사용 사례를 예시와 함께 작성하세요.',
      hints: ['순회 순서의 차이점에 주목하세요', '각 순회 방법이 어떤 상황에서 유용한지 생각해보세요'],
      relatedConcepts: ['Tree', 'Recursion', 'DFS']
    })

    // 타이머
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours}시간 ${minutes}분 ${secs}초`
  }

  const handleSubmit = async () => {
    if (!answer.trim()) {
      alert('답변을 작성해주세요.')
      return
    }

    setIsSubmitting(true)
    try {
      // TODO: API로 답변 제출
      await new Promise(resolve => setTimeout(resolve, 1000)) // 임시 딜레이
      navigate('/feedback')
    } catch (error) {
      alert('제출에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const categoryKorean = {
    DATA_STRUCTURES: '자료구조',
    ALGORITHMS: '알고리즘',
    OPERATING_SYSTEMS: '운영체제',
    NETWORKS: '네트워크',
    DATABASES: '데이터베이스',
    SYSTEM_DESIGN: '시스템 설계'
  }

  const difficultyStars = {
    EASY: '⭐',
    MEDIUM: '⭐⭐',
    HARD: '⭐⭐⭐'
  }

  return (
    <MobileLayout title="오늘의 문제">
      <div className="mobile-container py-6">
        {/* 시간 및 카테고리 정보 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-yellow-800">남은 시간</span>
            <span className="text-sm font-bold text-yellow-800">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* 문제 정보 */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm bg-primary-100 text-primary-700 px-2 py-1 rounded">
              {categoryKorean[challenge?.category || 'DATA_STRUCTURES']}
            </span>
            <span className="text-sm text-gray-600">
              난이도: {difficultyStars[challenge?.difficulty || 'MEDIUM']}
            </span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {challenge?.title}
          </h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            {challenge?.description}
          </p>

          {/* 힌트 */}
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            {showHint ? '힌트 숨기기' : '힌트 보기'} 💡
          </button>

          {showHint && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <ul className="space-y-1">
                {challenge?.hints.map((hint, index) => (
                  <li key={index} className="text-sm text-blue-800">
                    • {hint}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 답변 작성 영역 */}
        <div className="card mb-6">
          <h3 className="font-medium text-gray-900 mb-3">답변 작성</h3>
          
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="여기에 답변을 작성해주세요...

마크다운 문법을 사용할 수 있습니다.
- **굵은 글씨**
- *기울임*
- `코드`
- ```코드 블록```"
            className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={isSubmitting}
          />

          <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
            <span>{answer.length}자</span>
            <button className="text-primary-600 hover:text-primary-700">
              임시 저장
            </button>
          </div>
        </div>

        {/* 관련 개념 */}
        <div className="card mb-6">
          <h3 className="font-medium text-gray-900 mb-3">관련 개념</h3>
          <div className="flex flex-wrap gap-2">
            {challenge?.relatedConcepts.map((concept, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>

        {/* 제출 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !answer.trim()}
          className="btn-primary w-full"
        >
          {isSubmitting ? '제출 중...' : '제출하기'}
        </button>
      </div>
    </MobileLayout>
  )
}