import GameDashboard from "@/components/game-dashboard"
import BottomNavigation from "@/components/bottom-navigation"

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-purple-100 to-orange-50 pb-16">
      <GameDashboard />
      <BottomNavigation />
    </main>
  )
}
