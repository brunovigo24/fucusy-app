"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Diamond, BookOpen, Download } from "lucide-react"

export default function LibraryScreen() {
  const [diamonds, setDiamonds] = useState(50)

  const books = [
    {
      id: 0,
      title: "História da Psicologia",
      description: "Conteúdo sobre a evolução da psicologia",
      price: 0,
      unlocked: true,
    },
    {
      id: 1,
      title: "Guia de Estudo - Matemática",
      description: "Fórmulas e exercícios de matemática básica",
      price: 0,
      unlocked: true,
    },
    {
      id: 2,
      title: "Técnicas de Concentração",
      description: "Métodos para melhorar o foco e a atenção",
      price: 20,
      unlocked: true,
    },
    {
      id: 3,
      title: "História do Brasil - Resumo",
      description: "Principais eventos da história brasileira",
      price: 30,
      unlocked: false,
    },
    {
      id: 4,
      title: "Física Básica Ilustrada",
      description: "Conceitos de física com ilustrações",
      price: 40,
      unlocked: false,
    },
    {
      id: 5,
      title: "Gramática Simplificada",
      description: "Regras gramaticais explicadas de forma simples",
      price: 25,
      unlocked: false,
    },
  ]

  const avatarItems = [
    {
      id: 1,
      title: "Chapéu de Formatura",
      description: "Um chapéu acadêmico para seu avatar",
      price: 15,
      unlocked: false,
    },
    {
      id: 2,
      title: "Óculos Inteligentes",
      description: "Óculos modernos para seu avatar",
      price: 10,
      unlocked: true,
    },
    {
      id: 3,
      title: "Capa de Super-herói",
      description: "Uma capa colorida para seu avatar",
      price: 25,
      unlocked: false,
    },
    {
      id: 4,
      title: "Mochila Escolar",
      description: "Uma mochila estilosa para seu avatar",
      price: 20,
      unlocked: false,
    },
  ]

  const coupons = [
    {
      id: 1,
      title: "Cupom de Desconto 10%",
      description: "Desconto de 10% em qualquer livro",
      price: 15,
      unlocked: false,
    },
    {
      id: 2,
      title: "Cupom de Desconto 20%",
      description: "Desconto de 20% em qualquer item de avatar",
      price: 25,
      unlocked: false,
    },
    {
      id: 3,
      title: "Cupom de Desconto 30%",
      description: "Desconto de 30% em qualquer compra",
      price: 40,
      unlocked: false,
    },
  ]

  const unlockItem = (item: any, type: "book" | "avatar" | "coupon") => {
    if (diamonds >= item.price) {
      setDiamonds(diamonds - item.price)
      // Aqui você atualizaria o estado do item para desbloqueado
      alert(`Item "${item.title}" desbloqueado com sucesso!`)
    } else {
      alert("Diamantes insuficientes! Complete mais fases para ganhar mais.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-800">Biblioteca</h1>
        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
          <Diamond className="text-purple-500" size={20} />
          <span className="font-bold text-purple-700">{diamonds}</span>
        </div>
      </div>

      <Tabs defaultValue="books" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="books" className="flex items-center gap-1">
            <BookOpen size={16} />
            <span>Livros</span>
          </TabsTrigger>
          <TabsTrigger value="avatar" className="flex items-center gap-1">
            <Diamond size={16} />
            <span>Itens de Avatar</span>
          </TabsTrigger>
          <TabsTrigger value="coupons" className="flex items-center gap-1">
            <Diamond size={16} />
            <span>Cupons</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="books">
          <div className="space-y-4">
            {books.map((book) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`border-0 shadow-md ${!book.unlocked ? "opacity-80" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-purple-800">{book.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{book.description}</p>
                      </div>
                      {book.unlocked ? (
                        <div className="flex gap-2">
                          {book.id === 0 ? (
                            <>
                              <Button 
                                size="sm" 
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => window.open('/pdf/historia-da-psicologia.pdf', '_blank')}
                              >
                                <Download size={16} className="mr-1" />
                                Baixar PDF
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-red-500 hover:bg-red-600 text-white"
                                onClick={() => window.open('https://youtu.be/mVtT6QBDMxc?si=T28iEUFZZVd7fmex', '_blank')}
                              >
                                Assistir Vídeo
                              </Button>
                            </>
                          ) : (
                            <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                              <Download size={16} className="mr-1" />
                              Baixar
                            </Button>
                          )}
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => unlockItem(book, "book")}
                          className="bg-orange-400 hover:bg-orange-500 text-white"
                        >
                          <Diamond size={16} className="mr-1" />
                          {book.price}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="avatar">
          <div className="space-y-4">
            {avatarItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`border-0 shadow-md ${!item.unlocked ? "opacity-80" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-purple-800">{item.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                      {item.unlocked ? (
                        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                          Equipar
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => unlockItem(item, "avatar")}
                          className="bg-orange-400 hover:bg-orange-500 text-white"
                        >
                          <Diamond size={16} className="mr-1" />
                          {item.price}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="coupons">
          <div className="space-y-4">
            {coupons.map((coupon) => (
              <motion.div
                key={coupon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`border-0 shadow-md ${!coupon.unlocked ? "opacity-80" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-purple-800">{coupon.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{coupon.description}</p>
                      </div>
                      {coupon.unlocked ? (
                        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                          Usar Cupom
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => unlockItem(coupon, "coupon")}
                          className="bg-orange-400 hover:bg-orange-500 text-white"
                        >
                          Resgatar
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
