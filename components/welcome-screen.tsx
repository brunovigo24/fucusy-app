"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RegistrationForm from "@/components/registration-form"
import Image from "next/image"
import { motion } from "framer-motion"

export default function WelcomeScreen() {
  const [showForm, setShowForm] = useState(false)

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0">
      <CardHeader className="text-center bg-gradient-to-r from-purple-300 to-orange-200 rounded-t-lg">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-4"
        >
          <div className="relative w-32 h-32">
            <Image
              src="/placeholder.svg?height=128&width=128"
              alt="Focusy Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>
        <CardTitle className="text-3xl font-bold text-purple-800">Focusy</CardTitle>
        <p className="text-purple-700 mt-2">Aprendizado gamificado para pessoas com TDAH</p>
      </CardHeader>
      <CardContent className="p-6">
        {!showForm ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-center text-gray-700 mb-6">
              Bem-vindo ao Focusy! Uma plataforma de aprendizado divertida e adaptada para pessoas com TDAH.
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-6 rounded-lg text-lg font-medium transition-all duration-200 hover:shadow-md"
            >
              Começar Agora
            </Button>
          </motion.div>
        ) : (
          <RegistrationForm />
        )}
      </CardContent>
    </Card>
  )
}
