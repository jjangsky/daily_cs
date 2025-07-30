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
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    // 정적 더미 데이터
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
    return `${hours}시간 ${minutes}분`
  }

  const handleSubmit = async () => {
    if (!answer.trim()) {
      alert('답변을 작성해주세요.')
      return
    }

    setIsSubmitting(true)
    try {
      // 제출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000))
      navigate('/dashboard')
    } catch (error) {
      alert('제출에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSave = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

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

  return (
    <MobileLayout title="오늘의 도전">
      <div className="mobile-container py-6 space-y-6">
        {/* Timer Card */}
        <div className="card-gradient relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-accent-300/20 rounded-full blur-2xl" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">남은 시간</p>
              <p className="text-2xl font-bold text-gray-900">{formatTime(timeLeft)}</p>
            </div>
            <div className="text-4xl">⏰</div>
          </div>
        </div>

        {/* Problem Card */}
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="badge badge-primary">
                {categoryKorean[challenge?.category || 'DATA_STRUCTURES']}
              </span>
              <span className={`badge ${
                challenge?.difficulty === 'EASY' ? 'badge-success' :
                challenge?.difficulty === 'HARD' ? 'bg-red-100 text-red-700' :
                'badge-accent'
              }`}>
                {difficultyKorean[challenge?.difficulty || 'MEDIUM']}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
            </span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              {challenge?.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {challenge?.description}
            </p>
          </div>

          {/* Hint Button */}
          <button
            onClick={() => setShowHint(!showHint)}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            <span className="text-lg">💡</span>
            {showHint ? '힌트 숨기기' : '힌트 보기'}
          </button>

          {showHint && (
            <div className="bg-primary-50 rounded-2xl p-4 space-y-2">
              {challenge?.hints.map((hint, index) => (
                <p key={index} className="text-sm text-primary-700 flex items-start gap-2">
                  <span className="text-primary-500 mt-0.5">•</span>
                  <span>{hint}</span>
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Answer Section */}
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">나의 답변</h3>
            <button 
              onClick={handleSave}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              {isSaved ? '✓ 저장됨' : '임시 저장'}
            </button>
          </div>
          
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="여기에 답변을 작성해주세요...

마크다운 문법을 사용할 수 있습니다.
• **굵은 글씨**로 강조
• *기울임*으로 표현
• `코드`로 감싸기
• ```로 코드 블록 만들기"
            className="w-full h-64 px-4 py-3.5 bg-white/60 backdrop-blur border border-gray-200 rounded-2xl resize-none 
                     focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 focus:bg-white
                     placeholder-gray-400 transition-all duration-200"
            disabled={isSubmitting}
          />

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">{answer.length}자 작성됨</span>
            <div className="flex items-center gap-2">
              {challenge?.relatedConcepts.map((concept, index) => (
                <span
                  key={index}
                  className="badge bg-gray-100 text-gray-600 text-xs"
                >
                  #{concept}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !answer.trim()}
          className="btn-accent w-full"
        >
          {isSubmitting ? '제출 중...' : '답변 제출하기'}
        </button>

        {/* Tips */}
        <div className="bg-gray-100 rounded-2xl p-4 text-center">
          <p className="text-sm text-gray-600">
            💡 충분히 고민하고 작성해주세요. 제출 후에는 수정할 수 없습니다.
          </p>
        </div>
      </div>
    </MobileLayout>
  )
}