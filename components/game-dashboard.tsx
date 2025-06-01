"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Diamond, Trophy, Lock } from "lucide-react"

export default function GameDashboard() {
  const router = useRouter()
  const [diamonds, setDiamonds] = useState(50)
  const [currentLevel, setCurrentLevel] = useState(3)

  const levels = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Fase ${i + 1}`,
    unlocked: i + 1 <= currentLevel,
    completed: i + 1 < currentLevel,
  }))

  const handleLevelClick = (levelId: number) => {
    if (levelId <= currentLevel) {
      router.push(`/level/${levelId}`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
          <Diamond className="text-purple-500" size={20} />
          <span className="font-bold text-purple-700">{diamonds}</span>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
          <Trophy className="text-orange-400" size={20} />
          <span className="font-bold text-orange-500">Nível {currentLevel}</span>
        </div>
      </div>

      <Card className="border-0 shadow-lg mb-6">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold text-purple-800 mb-6 text-center">Sua Jornada de Aprendizado</h1>

          <div className="grid grid-cols-3 gap-4">
            {levels.map((level) => (
              <motion.div
                key={level.id}
                whileHover={level.unlocked ? { scale: 1.05 } : {}}
                whileTap={level.unlocked ? { scale: 0.95 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: level.id * 0.05 }}
              >
                <Button
                  onClick={() => handleLevelClick(level.id)}
                  disabled={!level.unlocked}
                  className={`w-full h-20 rounded-lg flex flex-col items-center justify-center ${
                    level.completed
                      ? "bg-green-100 hover:bg-green-200 text-green-700"
                      : level.unlocked
                        ? "bg-gradient-to-r from-purple-300 to-orange-200 hover:from-purple-400 hover:to-orange-300 text-purple-800"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {level.unlocked ? (
                    <>
                      <span className="text-lg font-bold">{level.id}</span>
                      <span className="text-xs">{level.name}</span>
                    </>
                  ) : (
                    <Lock size={24} />
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-600">
        <p>Complete fases para ganhar diamantes e desbloquear itens!</p>
      </div>
    </div>
  )
}
