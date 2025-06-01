import { notFound } from "next/navigation"
import LevelQuestions from "@/components/level-questions"
import BottomNavigation from "@/components/bottom-navigation"

interface LevelPageProps {
  params: {
    id: string
  }
}

export default function LevelPage({ params }: LevelPageProps) {
  const levelId = Number.parseInt(params.id)

  // Verificar se o ID é válido
  if (isNaN(levelId) || levelId < 1 || levelId > 20) {
    notFound()
  }

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-purple-100 to-orange-50 pb-16">
      <LevelQuestions levelId={levelId} />
      <BottomNavigation />
    </main>
  )
}
