import React from 'react'
import { LessonCard, type TheorySection } from '../components/lesson/LessonCard'
import { MobileQuiz } from '../components/quiz/MobileQuiz'
import { LessonHeader } from '../components/lesson/LessonHeader'

/**
 * ComposePage - Music composition workspace (new feature)
 * Currently shows a demo of the mobile UI components
 */
export const ComposePage: React.FC = () => {
  // Demo theory sections with highlighted keywords
  const demoSections: TheorySection[] = [
    {
      id: 'section-1',
      title: 'Bảng chữ cái Âm nhạc (The Musical Alphabet)',
      content: 'Âm nhạc chỉ sử dụng 7 chữ cái: A, B, C, D, E, F, Sau G, vòng lặp quay lại A!',
      highlighted: ['7 chữ cái', 'A, B, C, D, E, F'],
    },
    {
      id: 'section-2',
      title: 'Vòng tròn 7 nốt nhạc',
      content:
        'Âm nhạc sử dụng bao nhiêu chữ cái để đặt tên cho nốt? Chỉ 7 chữ cái được sử dụng trong âm nhạc.',
      highlighted: ['7 chữ cái', 'âm nhạc'],
    },
  ]

  const quizOptions = [
    { id: 'a', label: 'A', text: '5 chữ cái' },
    { id: 'b', label: 'B', text: '6 chữ cái' },
    { id: 'c', label: 'C', text: '7 chữ cái' },
  ]

  return (
    <div className="min-h-screen">
      {/* Lesson Header */}
      <LessonHeader lessonNumber="1.2" lessonTitle="Tên nốt & Cao độ" />

      {/* Lesson Content Card */}
      <LessonCard
        lessonId="demo"
        title="Tên nốt & Cao độ"
        subtitle="Nhận biết 7 nốt nhạc (A-G) trên bàn phím và khuông nhạc, khái niệm Quãng tám"
        sections={demoSections}
      >
        {/* Quiz Example */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
          <MobileQuiz
            question="Âm nhạc sử dụng bao nhiêu chữ cái để đặt tên cho nốt?"
            options={quizOptions}
            correctAnswer="c"
            onAnswer={(selectedId, isCorrect) => {
              console.log(`Selected: ${selectedId}, Correct: ${isCorrect}`)
            }}
          />
        </div>

        {/* Demo Staff Placeholder */}
        <div className="pt-6">
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <p className="text-center text-slate-600 dark:text-slate-400">
              🎵 Musical Staff Component
            </p>
            <p className="text-center text-sm text-slate-500 dark:text-slate-500 mt-2">
              Click any note to hear it - View ABC Notation
            </p>
          </div>
        </div>
      </LessonCard>

      {/* Info Box */}
      <div className="px-4 md:px-8 py-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">📱 Mobile UI Demo</h3>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            This page demonstrates the new mobile UI components: LessonCard with highlighted
            keywords, MobileQuiz with touch-friendly buttons, and edge-to-edge mobile layout.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ComposePage
