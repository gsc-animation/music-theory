import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'

interface FeedbackEffectsProps {
  lastResult: 'success' | 'failure' | null
  timestamp: number
}

export const FeedbackEffects: React.FC<FeedbackEffectsProps> = ({ lastResult, timestamp }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (lastResult) {
      setVisible(true)
      const timer = setTimeout(() => setVisible(false), 500)
      return () => clearTimeout(timer)
    }
  }, [lastResult, timestamp])

  return (
    <AnimatePresence>
      {visible && lastResult && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 pointer-events-none z-50 ${
            lastResult === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {lastResult === 'success' && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Check className="text-white w-32 h-32 opacity-80" />
            </div>
          )}
        </motion.div>
      )}

      {visible && lastResult === 'failure' && (
        <motion.div
          key="shake"
          initial={{ x: 0 }}
          animate={{ x: [-10, 10, -10, 10, 0] }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 pointer-events-none border-4 border-red-500 z-50 flex items-center justify-center"
        >
          <X className="text-red-500 w-32 h-32 opacity-80" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
