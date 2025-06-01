"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { User, Shirt, Palette } from "lucide-react"
import BottomNavigation from "./bottom-navigation"
import Image from "next/image"

export default function AvatarCreator() {
  const router = useRouter()
  const [selectedHair, setSelectedHair] = useState(0)
  const [selectedClothes, setSelectedClothes] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedAvatar, setSelectedAvatar] = useState(0)

  const hairStyles = ["Curto", "Médio", "Longo", "Cacheado", "Careca", "Moicano"]
  const clothesStyles = ["Camiseta", "Camisa", "Moletom", "Vestido", "Terno"]
  const colorOptions = ["bg-yellow-300", "bg-orange-300", "bg-red-300", "bg-purple-300", "bg-blue-300", "bg-green-300"]
  const avatarImages = [
    "/images/avatar-masc-1.jpg",
    "/images/avatar-masc-2.jpg",
    "/images/avatar-masc-3.jpg",
    "/images/avatar-fem-1.jpg",
    "/images/avatar-fem-2.jpg",
    "/images/avatar-fem-3.jpg"
  ]

  const handleSaveAvatar = () => {
    // Aqui você salvaria os dados do avatar
    router.push("/dashboard")
  }

  return (
    <>
      <Card className="w-full max-w-md mx-auto shadow-lg border-0">
        <CardHeader className="text-center bg-gradient-to-r from-purple-300 to-orange-200 rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-purple-800">Crie seu Avatar</CardTitle>
          <p className="text-purple-700 mt-1">Personalize seu companheiro de estudos</p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-40 h-40 bg-gray-100 rounded-full overflow-hidden border-4 border-purple-300 flex items-center justify-center"
            >
              <Image
                src={avatarImages[selectedAvatar]}
                alt="Avatar"
                width={128}
                height={128}
                className="rounded-full"
              />
            </motion.div>

            <Tabs defaultValue="avatar" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="avatar" className="flex items-center gap-1">
                  <User size={16} />
                  <span>Avatar</span>
                </TabsTrigger>
                <TabsTrigger value="hair" className="flex items-center gap-1">
                  <User size={16} />
                  <span>Cabelo</span>
                </TabsTrigger>
                <TabsTrigger value="clothes" className="flex items-center gap-1">
                  <Shirt size={16} />
                  <span>Roupas</span>
                </TabsTrigger>
                <TabsTrigger value="color" className="flex items-center gap-1">
                  <Palette size={16} />
                  <span>Cor</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="avatar" className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {avatarImages.map((avatar, index) => (
                    <button
                      key={index}
                      className={`w-full h-12 rounded-md overflow-hidden ${selectedAvatar === index ? "ring-2 ring-offset-2 ring-purple-500" : ""}`}
                      onClick={() => setSelectedAvatar(index)}
                    >
                      <Image
                        src={avatar}
                        alt={`Avatar ${index + 1}`}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="hair" className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {hairStyles.map((style, index) => (
                    <Button
                      key={index}
                      variant={selectedHair === index ? "default" : "outline"}
                      className={selectedHair === index ? "bg-purple-500 hover:bg-purple-600" : ""}
                      onClick={() => setSelectedHair(index)}
                    >
                      {style}
                    </Button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="clothes" className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {clothesStyles.map((style, index) => (
                    <Button
                      key={index}
                      variant={selectedClothes === index ? "default" : "outline"}
                      className={selectedClothes === index ? "bg-purple-500 hover:bg-purple-600" : ""}
                      onClick={() => setSelectedClothes(index)}
                    >
                      {style}
                    </Button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="color" className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {colorOptions.map((color, index) => (
                    <button
                      key={index}
                      className={`w-full h-12 rounded-md ${color} ${selectedColor === index ? "ring-2 ring-offset-2 ring-purple-500" : ""}`}
                      onClick={() => setSelectedColor(index)}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <p className="text-sm text-gray-500 italic">Desbloqueie mais opções de personalização com diamantes!</p>

            <Button onClick={handleSaveAvatar} className="w-full bg-orange-400 hover:bg-orange-500 text-white">
              Salvar Avatar
            </Button>
          </div>
        </CardContent>
      </Card>
      <BottomNavigation />
    </>
  )
}
