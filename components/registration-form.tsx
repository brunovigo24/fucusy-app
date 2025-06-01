"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"

export default function RegistrationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    educationLevel: "",
    year: "",
    course: "",
  })
  const [showCourse, setShowCourse] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEducationChange = (value: string) => {
    setFormData((prev) => ({ ...prev, educationLevel: value }))
    setShowCourse(value === "superior")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você salvaria os dados do usuário
    // Por enquanto, apenas navegamos para a próxima página
    router.push("/avatar")
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border-purple-200 focus:border-purple-400"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">Idade</Label>
        <Input
          id="age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          required
          min="1"
          max="120"
          className="border-purple-200 focus:border-purple-400"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="educationLevel">Grau de Instrução</Label>
        <Select onValueChange={handleEducationChange} defaultValue={formData.educationLevel}>
          <SelectTrigger className="border-purple-200 focus:border-purple-400">
            <SelectValue placeholder="Selecione seu grau de instrução" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fundamental">Ensino Fundamental</SelectItem>
            <SelectItem value="medio">Ensino Médio</SelectItem>
            <SelectItem value="superior">Ensino Superior</SelectItem>
            <SelectItem value="posgraduacao">Pós-graduação</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="year">Ano</Label>
        <Input
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
          className="border-purple-200 focus:border-purple-400"
        />
      </div>

      {showCourse && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
          <Label htmlFor="course">Curso</Label>
          <Input
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="border-purple-200 focus:border-purple-400"
          />
        </motion.div>
      )}

      <Button type="submit" className="w-full mt-6 bg-orange-400 hover:bg-orange-500 text-white">
        Continuar
      </Button>
    </motion.form>
  )
}
