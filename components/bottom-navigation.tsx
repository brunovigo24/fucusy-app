"use client"

import { useRouter, usePathname } from "next/navigation"
import { Home, User, BookOpen, Settings } from "lucide-react"
import { motion } from "framer-motion"

export default function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: "Início", path: "/dashboard" },
    { icon: User, label: "Avatar", path: "/avatar" },
    { icon: BookOpen, label: "Biblioteca", path: "/library" },
    { icon: Settings, label: "Configurações", path: "/settings" },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl border-t border-gray-100">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const active = isActive(item.path)

          return (
            <motion.button
              key={index}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center justify-center w-full h-full"
              onClick={() => router.push(item.path)}
            >
              <div
                className={`flex flex-col items-center justify-center ${active ? "text-purple-600" : "text-gray-500"}`}
              >
                <Icon size={20} className={active ? "text-purple-600" : "text-gray-500"} />
                <span className="text-xs mt-1">{item.label}</span>
                {active && (
                  <motion.div
                    layoutId="navigation-underline"
                    className="absolute bottom-0 w-12 h-1 bg-purple-500 rounded-t-md"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
