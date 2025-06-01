"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, MessageSquare, ArrowLeft, Diamond } from "lucide-react"

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
}

interface LevelQuestionsProps {
  levelId: number
}

export default function LevelQuestions({ levelId }: LevelQuestionsProps) {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [earnedDiamonds, setEarnedDiamonds] = useState(0)
  const [showChatModal, setShowChatModal] = useState(false)

  // Exemplo de perguntas para a fase
  const questions: Question[] = [
    {
      id: 1,
      text: "A Psicologia como ciência independente foi oficialmente estabelecida em 1879 com a criação do primeiro laboratório experimental de Psicologia. Quem foi o responsável por essa fundação?",
      options: [
        "A) Sigmund Freud",
        "B) William James",
        "C) Wilhelm Wundt",
        "D) John B. Watson",
        "E) Ivan Pavlov",
      ],
      correctAnswer: 2, // C) Wilhelm Wundt
    },
    {
      id: 2,
      text: "A Psicologia funcionalista, desenvolvida nos Estados Unidos no final do século XIX, tinha como principal foco:",
      options: [
        "A) A estrutura da mente através da introspecção",
        "B) Os comportamentos inconscientes e seus significados",
        "C) A função dos processos mentais na adaptação ao ambiente",
        "D) A análise dos reflexos condicionados",
        "E) A rejeição da consciência como objeto de estudo",
      ],
      correctAnswer: 2, // C) A função dos processos mentais na adaptação ao ambiente
    },
    {
      id: 3,
      text: "Qual das escolas psicológicas defendia que o comportamento observável era o único objeto legítimo de estudo da Psicologia?",
      options: [
        "A) Estruturalismo",
        "B) Funcionalismo",
        "C) Psicanálise",
        "D) Behaviorismo",
        "E) Humanismo",
      ],
      correctAnswer: 3, // D) Behaviorismo
    },
    {
      id: 4,
      text: "A Psicanálise, criada por Sigmund Freud, introduziu a ideia de que:",
      options: [
        "A) Apenas o comportamento observável deve ser estudado",
        "B) O inconsciente influencia significativamente os pensamentos e comportamentos humanos",
        "C) A consciência pode ser dividida em sensações básicas",
        "D) A adaptação ao meio é a principal função dos processos mentais",
        "E) A mente humana é uma 'tábula rasa' ao nascer",
      ],
      correctAnswer: 1, // B) O inconsciente influencia significativamente os pensamentos e comportamentos humanos
    },
    {
      id: 5,
      text: "A Psicologia Humanista surgiu como uma terceira força na Psicologia, em oposição ao Behaviorismo e à Psicanálise. Entre seus principais representantes está:",
      options: [
        "A) Carl Rogers",
        "B) B. F. Skinner",
        "C) John Locke",
        "D) Wilhelm Wundt",
        "E) Edward Titchener",
      ],
      correctAnswer: 0, // A) Carl Rogers
    },
  ]

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index)
  }

  const handleCheck = () => {
    if (selectedOption === null) return

    const correct = selectedOption === currentQuestion.correctAnswer
    setIsCorrect(correct)
    setShowFeedback(true)

    if (correct) {
      setEarnedDiamonds(earnedDiamonds + 2)
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
      setIsCorrect(null)
      setShowFeedback(false)
    } else {
      // Fase concluída
      router.push(`/level-complete/${levelId}?diamonds=${earnedDiamonds}`)
    }
  }

  const handleTextToSpeech = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(currentQuestion.text)
      utterance.lang = "pt-BR"
      window.speechSynthesis.speak(utterance)
    }
  }

  const toggleChatModal = () => {
    setShowChatModal(!showChatModal)
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")} className="text-purple-700">
          <ArrowLeft size={24} />
        </Button>
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
          <Diamond className="text-purple-500" size={20} />
          <span className="font-bold text-purple-700">{earnedDiamonds}</span>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-xl font-bold text-purple-800 mb-2">Fase {levelId}</h1>
        <Progress value={progress} className="h-2 bg-gray-200" />
        <p className="text-right text-sm text-gray-600 mt-1">
          Pergunta {currentQuestionIndex + 1} de {questions.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-0 shadow-lg mb-6">
            <CardHeader className="bg-gradient-to-r from-purple-300 to-orange-200 rounded-t-lg">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-bold text-purple-800">Pergunta {currentQuestionIndex + 1}</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleTextToSpeech}
                    className="text-purple-700 hover:text-purple-900 hover:bg-purple-100"
                  >
                    <Volume2 size={20} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleChatModal}
                    className="text-purple-700 hover:text-purple-900 hover:bg-purple-100"
                  >
                    <MessageSquare size={20} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-lg mb-6">{currentQuestion.text}</p>

              <RadioGroup
                value={selectedOption?.toString()}
                onValueChange={(value) => handleOptionSelect(Number.parseInt(value))}
                className="space-y-3"
              >
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 border rounded-lg p-3 ${
                      showFeedback
                        ? index === currentQuestion.correctAnswer
                          ? "border-green-500 bg-green-50"
                          : index === selectedOption
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={showFeedback} />
                    <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-3 rounded-lg ${
                    isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {isCorrect ? "Parabéns! Você acertou! +2 diamantes" : "Ops! Tente novamente na próxima."}
                </motion.div>
              )}

              <div className="mt-6 flex justify-center">
                {!showFeedback ? (
                  <Button
                    onClick={handleCheck}
                    disabled={selectedOption === null}
                    className="bg-orange-400 hover:bg-orange-500 text-white w-full"
                  >
                    Verificar
                  </Button>
                ) : (
                  <Button onClick={handleNext} className="bg-purple-500 hover:bg-purple-600 text-white w-full">
                    {currentQuestionIndex < questions.length - 1 ? "Próxima Pergunta" : "Finalizar Fase"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {showChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-md"
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-lg text-purple-800">Chat com Professor</h3>
              <Button variant="ghost" size="icon" onClick={toggleChatModal} className="text-gray-500">
                ✕
              </Button>
            </div>
            <div className="p-4 h-64 overflow-y-auto bg-gray-50">
              <div className="bg-purple-100 rounded-lg p-3 mb-3 max-w-[80%]">
                <p className="text-sm text-purple-800">Olá! Como posso ajudar com esta pergunta?</p>
              </div>
              <div className="bg-orange-100 rounded-lg p-3 mb-3 ml-auto max-w-[80%]">
                <p className="text-sm text-orange-800">Estou com dúvida nesta questão. Pode me dar uma dica?</p>
              </div>
              <div className="bg-purple-100 rounded-lg p-3 max-w-[80%]">
                <p className="text-sm text-purple-800">
                  Claro! Pense no que você aprendeu sobre este tema. Tente lembrar dos conceitos principais que
                  discutimos na aula anterior.
                </p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
                <Button className="bg-purple-500 hover:bg-purple-600">Enviar</Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
