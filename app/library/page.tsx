import LibraryScreen from "@/components/library-screen"
import BottomNavigation from "@/components/bottom-navigation"

export default function LibraryPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-purple-100 to-orange-50 pb-16">
      <LibraryScreen />
      <BottomNavigation />
    </main>
  )
}
