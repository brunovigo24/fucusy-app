"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Diamond, Trophy, Home } from "lucide-react"
import BottomNavigation from "@/components/bottom-navigation"

interface LevelCompletePageProps {
  params: {
    id: string
  }
}

export default function LevelCompletePage({ params }: LevelCompletePageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const levelId = Number.parseInt(params.id)
  const diamonds = Number.parseInt(searchParams.get("diamonds") || "0")

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-orange-50 p-4 pb-16">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center bg-gradient-to-r from-purple-300 to-orange-200 rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-purple-800">Fase {levelId} Concluída!</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.3,
                }}
                className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center"
              >
                <Trophy className="text-yellow-500" size={64} />
              </motion.div>

              <div className="text-center">
                <h2 className="text-xl font-bold text-purple-800 mb-2">Parabéns!</h2>
                <p className="text-gray-600 mb-4">Você completou a fase com sucesso!</p>
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 bg-purple-100 rounded-full px-6 py-3"
              >
                <Diamond className="text-purple-500" size={24} />
                <span className="font-bold text-purple-700 text-xl">+{diamonds} diamantes</span>
              </motion.div>

              <div className="w-full space-y-3 mt-4">
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white flex items-center justify-center gap-2"
                >
                  <Home size={18} />
                  <span>Voltar ao Início</span>
                </Button>

                {levelId < 20 && (
                  <Button
                    onClick={() => router.push(`/level/${levelId + 1}`)}
                    className="w-full bg-orange-400 hover:bg-orange-500 text-white"
                  >
                    Próxima Fase
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <BottomNavigation />
    </main>
  )
}
