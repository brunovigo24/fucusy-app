"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { HelpCircle, LogOut, Settings } from "lucide-react"

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true)
  const [soundEffects, setSoundEffects] = useState(true)
  const [textToSpeech, setTextToSpeech] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [textSize, setTextSize] = useState([16])

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-800">Configurações</h1>
        <Settings className="text-purple-600" size={24} />
      </div>

      <div className="space-y-4">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-purple-800">Acessibilidade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="text-size" className="text-sm text-gray-600">
                Tamanho do Texto
              </Label>
              <div className="flex items-center space-x-2">
                <span className="text-xs">A</span>
                <Slider
                  id="text-size"
                  value={textSize}
                  min={12}
                  max={24}
                  step={1}
                  onValueChange={setTextSize}
                  className="flex-1"
                />
                <span className="text-lg">A</span>
              </div>
              <span className="text-xs text-gray-500">Tamanho atual: {textSize[0]}px</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="text-to-speech" className="text-sm font-medium">
                  Leitor de Texto
                </Label>
                <p className="text-xs text-gray-500">Ativa a leitura automática de textos</p>
              </div>
              <Switch id="text-to-speech" checked={textToSpeech} onCheckedChange={setTextToSpeech} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode" className="text-sm font-medium">
                  Modo Escuro
                </Label>
                <p className="text-xs text-gray-500">Reduz o brilho da tela para conforto visual</p>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
                className="data-[state=checked]:bg-purple-600"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-purple-800">Notificações e Sons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications" className="text-sm font-medium">
                  Notificações
                </Label>
                <p className="text-xs text-gray-500">Lembretes para estudar e novidades</p>
              </div>
              <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sound-effects" className="text-sm font-medium">
                  Efeitos Sonoros
                </Label>
                <p className="text-xs text-gray-500">Sons durante o jogo e recompensas</p>
              </div>
              <Switch id="sound-effects" checked={soundEffects} onCheckedChange={setSoundEffects} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-purple-800">Suporte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start text-gray-700">
              <HelpCircle className="mr-2 h-4 w-4" />
              Central de Ajuda
            </Button>
            <Button variant="outline" className="w-full justify-start text-gray-700">
              <HelpCircle className="mr-2 h-4 w-4" />
              Tutoriais
            </Button>
            <Button variant="outline" className="w-full justify-start text-gray-700">
              <HelpCircle className="mr-2 h-4 w-4" />
              Contato
            </Button>
          </CardContent>
        </Card>

        <Button
          variant="outline"
          className="w-full mt-6 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair da Conta
        </Button>
      </div>
    </div>
  )
}
