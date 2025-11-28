'use client'

import { useState, useEffect } from 'react'
import { Check, CreditCard, Lock, ShoppingCart, ArrowRight, ArrowLeft, Award, Package, Star, MapPin, Users, Clock, Sparkles, Globe, Heart } from 'lucide-react'

// Tipos
interface Question {
  id: number
  question: string
  image: string
  options: {
    text: string
    value: string
    points: number
  }[]
}

interface QuizResult {
  type: string
  title: string
  description: string
  product: string
  price: number
  image: string
}

interface CheckoutData {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  cardNumber: string
  cardName: string
  cardExpiry: string
  cardCvv: string
}

// Perguntas do Quiz
const questions: Question[] = [
  {
    id: 1,
    question: 'Qual é o seu destino de viagem dos sonhos?',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop&q=80',
    options: [
      { text: 'Praias paradisíacas e resorts', value: 'beach', points: 10 },
      { text: 'Cidades históricas e museus', value: 'culture', points: 20 },
      { text: 'Montanhas e trilhas na natureza', value: 'adventure', points: 30 },
      { text: 'Grandes metrópoles e vida noturna', value: 'urban', points: 40 }
    ]
  },
  {
    id: 2,
    question: 'Como você prefere se hospedar?',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop&q=80',
    options: [
      { text: 'Hotel all-inclusive com tudo incluso', value: 'luxury', points: 10 },
      { text: 'Pousada charmosa e aconchegante', value: 'cozy', points: 20 },
      { text: 'Camping ou hostel econômico', value: 'budget', points: 30 },
      { text: 'Apartamento moderno no centro', value: 'modern', points: 40 }
    ]
  },
  {
    id: 3,
    question: 'Qual atividade mais te atrai?',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=600&fit=crop&q=80',
    options: [
      { text: 'Relaxar na praia ou piscina', value: 'relax', points: 10 },
      { text: 'Visitar pontos turísticos famosos', value: 'tourist', points: 20 },
      { text: 'Esportes radicais e aventuras', value: 'extreme', points: 30 },
      { text: 'Experimentar gastronomia local', value: 'food', points: 40 }
    ]
  },
  {
    id: 4,
    question: 'Qual é o seu estilo de viagem?',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop&q=80',
    options: [
      { text: 'Tudo planejado com antecedência', value: 'planned', points: 10 },
      { text: 'Roteiro flexível com algumas reservas', value: 'flexible', points: 20 },
      { text: 'Totalmente improvisado', value: 'spontaneous', points: 30 },
      { text: 'Sigo recomendações de locais', value: 'local', points: 40 }
    ]
  },
  {
    id: 5,
    question: 'Quanto tempo você gosta de viajar?',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=600&fit=crop&q=80',
    options: [
      { text: 'Final de semana (2-3 dias)', value: 'short', points: 10 },
      { text: 'Uma semana completa', value: 'week', points: 20 },
      { text: 'Duas semanas ou mais', value: 'long', points: 30 },
      { text: 'Quanto mais tempo, melhor!', value: 'extended', points: 40 }
    ]
  }
]

// Resultados baseados na pontuação
const getQuizResult = (totalPoints: number): QuizResult => {
  if (totalPoints <= 75) {
    return {
      type: 'relaxer',
      title: 'Viajante Relaxado',
      description: 'Você ama conforto e tranquilidade. Praias, spas e resorts são o seu paraíso!',
      product: 'Pacote Premium Relaxamento',
      price: 2499.90,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=800&fit=crop&q=80'
    }
  } else if (totalPoints <= 125) {
    return {
      type: 'cultural',
      title: 'Viajante Cultural',
      description: 'História, arte e cultura são suas paixões. Você adora explorar museus e monumentos.',
      product: 'Pacote Cultural Europa',
      price: 3299.90,
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&fit=crop&q=80'
    }
  } else if (totalPoints <= 175) {
    return {
      type: 'adventurer',
      title: 'Viajante Aventureiro',
      description: 'Adrenalina e natureza são o que você busca! Trilhas e esportes radicais te chamam.',
      product: 'Pacote Aventura Extrema',
      price: 2899.90,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&q=80'
    }
  } else {
    return {
      type: 'urban',
      title: 'Viajante Urbano',
      description: 'Você ama a energia das grandes cidades, gastronomia e vida noturna vibrante!',
      product: 'Pacote Metrópoles do Mundo',
      price: 3799.90,
      image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=800&fit=crop&q=80'
    }
  }
}

export default function Home() {
  const [step, setStep] = useState<'landing' | 'quiz' | 'result' | 'checkout' | 'success'>('landing')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: ''
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Carregar progresso do localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('quiz-progress')
    if (savedProgress) {
      const data = JSON.parse(savedProgress)
      setAnswers(data.answers || {})
      setCurrentQuestion(data.currentQuestion || 0)
    }
  }, [])

  // Salvar progresso no localStorage
  useEffect(() => {
    if (step === 'quiz') {
      localStorage.setItem('quiz-progress', JSON.stringify({
        answers,
        currentQuestion
      }))
    }
  }, [answers, currentQuestion, step])

  const handleAnswer = (points: number) => {
    const newAnswers = { ...answers, [currentQuestion]: points }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const totalPoints = Object.values(newAnswers).reduce((sum, p) => sum + p, 0)
      const result = getQuizResult(totalPoints)
      setQuizResult(result)
      setStep('result')
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const validateCheckout = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (!checkoutData.name.trim()) newErrors.name = 'Nome é obrigatório'
    if (!checkoutData.email.trim() || !/\S+@\S+\.\S+/.test(checkoutData.email)) {
      newErrors.email = 'Email válido é obrigatório'
    }
    if (!checkoutData.phone.trim()) newErrors.phone = 'Telefone é obrigatório'
    if (!checkoutData.address.trim()) newErrors.address = 'Endereço é obrigatório'
    if (!checkoutData.city.trim()) newErrors.city = 'Cidade é obrigatória'
    if (!checkoutData.state.trim()) newErrors.state = 'Estado é obrigatório'
    if (!checkoutData.zipCode.trim()) newErrors.zipCode = 'CEP é obrigatório'
    if (!checkoutData.cardNumber.trim() || checkoutData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Número do cartão inválido'
    }
    if (!checkoutData.cardName.trim()) newErrors.cardName = 'Nome no cartão é obrigatório'
    if (!checkoutData.cardExpiry.trim() || !/^\d{2}\/\d{2}$/.test(checkoutData.cardExpiry)) {
      newErrors.cardExpiry = 'Validade inválida (MM/AA)'
    }
    if (!checkoutData.cardCvv.trim() || checkoutData.cardCvv.length !== 3) {
      newErrors.cardCvv = 'CVV inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCheckout = () => {
    if (validateCheckout()) {
      setStep('success')
      localStorage.removeItem('quiz-progress')
    }
  }

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '')
    const chunks = cleaned.match(/.{1,4}/g)
    return chunks ? chunks.join(' ') : cleaned
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  // LANDING PAGE
  if (step === 'landing') {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop&q=80"
              alt="Viagem dos sonhos"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-pink-900/80 to-orange-900/90" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
            <div className="inline-block p-3 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-bounce">
              <Sparkles className="w-8 h-8 text-yellow-300" />
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              Descubra a Viagem<br />
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Perfeita para Você
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Responda nosso quiz personalizado e encontre o pacote de viagem ideal para o seu perfil. 
              Experiências únicas esperando por você!
            </p>

            <button
              onClick={() => setStep('quiz')}
              className="group px-10 py-5 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-white text-xl font-bold rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-3 mx-auto"
            >
              Começar Quiz Grátis
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mt-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">15k+</div>
                <div className="text-white/80">Viajantes Felizes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">120+</div>
                <div className="text-white/80">Destinos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">4.9★</div>
                <div className="text-white/80">Avaliação</div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-white/50 rounded-full" />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Por Que Escolher a Gente?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Transformamos sonhos em realidade com experiências inesquecíveis
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Award className="w-12 h-12" />,
                  title: 'Pacotes Personalizados',
                  description: 'Quiz inteligente que identifica seu perfil e recomenda o pacote perfeito'
                },
                {
                  icon: <Globe className="w-12 h-12" />,
                  title: 'Destinos Incríveis',
                  description: 'Mais de 120 destinos ao redor do mundo com experiências autênticas'
                },
                {
                  icon: <Heart className="w-12 h-12" />,
                  title: 'Suporte 24/7',
                  description: 'Equipe dedicada disponível a qualquer hora para ajudar você'
                }
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <div className="inline-block p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Como Funciona?
              </h2>
              <p className="text-xl text-gray-600">
                Simples, rápido e personalizado
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: <Users className="w-10 h-10" />, title: 'Faça o Quiz', desc: 'Responda 5 perguntas sobre seu estilo' },
                { icon: <Sparkles className="w-10 h-10" />, title: 'Descubra seu Perfil', desc: 'Receba recomendação personalizada' },
                { icon: <MapPin className="w-10 h-10" />, title: 'Escolha o Pacote', desc: 'Veja detalhes e preços especiais' },
                { icon: <Check className="w-10 h-10" />, title: 'Reserve Agora', desc: 'Checkout seguro e rápido' }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-900">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                O Que Nossos Clientes Dizem
              </h2>
              <p className="text-xl text-gray-600">
                Mais de 15 mil viajantes satisfeitos
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Maria Silva',
                  role: 'Viajante Cultural',
                  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80',
                  text: 'O quiz identificou perfeitamente meu estilo! Fiz o pacote Europa e foi incrível.',
                  rating: 5
                },
                {
                  name: 'João Santos',
                  role: 'Viajante Aventureiro',
                  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80',
                  text: 'Experiência única! O pacote aventura superou todas as minhas expectativas.',
                  rating: 5
                },
                {
                  name: 'Ana Costa',
                  role: 'Viajante Relaxado',
                  image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80',
                  text: 'Resort maravilhoso, tudo perfeito! Recomendo muito o serviço personalizado.',
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 px-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Pronto para Sua Próxima Aventura?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Faça o quiz agora e descubra o destino perfeito para você!
            </p>
            <button
              onClick={() => setStep('quiz')}
              className="group px-12 py-6 bg-white text-purple-600 text-xl font-bold rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-3 mx-auto"
            >
              Começar Agora
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Globe className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold">TravelQuiz</span>
            </div>
            <p className="text-gray-400 mb-6">
              Transformando sonhos em viagens inesquecíveis desde 2020
            </p>
            <div className="flex justify-center gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Sobre</a>
              <a href="#" className="hover:text-white transition-colors">Contato</a>
              <a href="#" className="hover:text-white transition-colors">Termos</a>
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            </div>
            <p className="text-gray-500 text-sm mt-8">
              © 2024 TravelQuiz. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    )
  }

  // QUIZ
  if (step === 'quiz') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <button
              onClick={() => setStep('landing')}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
            <div className="inline-block p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Descubra seu Estilo de Viagem
            </h1>
            <p className="text-gray-600">
              Responda {questions.length} perguntas e encontre o pacote perfeito para você!
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Pergunta {currentQuestion + 1} de {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6">
            <div className="relative h-64 sm:h-80">
              <img
                src={questions[currentQuestion].image}
                alt={questions[currentQuestion].question}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-2xl">
                  {questions[currentQuestion].question}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.points)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    answers[currentQuestion] === option.points
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      answers[currentQuestion] === option.points
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300'
                    }`}>
                      {answers[currentQuestion] === option.points && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="font-medium text-gray-900">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            {currentQuestion > 0 && (
              <button
                onClick={handlePreviousQuestion}
                className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg"
              >
                <ArrowLeft className="w-5 h-5" />
                Anterior
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // RESULT
  if (step === 'result' && quizResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative h-80 sm:h-96">
              <img
                src={quizResult.image}
                alt={quizResult.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-block px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full mb-3 shadow-lg">
                  <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Seu Resultado
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2 drop-shadow-2xl">
                  {quizResult.title}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {quizResult.description}
              </p>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-white rounded-xl shadow-md">
                    <Package className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {quizResult.product}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Pacote completo personalizado para o seu perfil
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-gray-900">
                      R$ {quizResult.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-gray-600 text-sm ml-2">à vista</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">ou 12x de</p>
                    <p className="text-lg font-bold text-purple-600">
                      R$ {(quizResult.price / 12).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {['Hospedagem Premium', 'Guia Especializado', 'Seguro Viagem', 'Suporte 24h'].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    setStep('quiz')
                    setCurrentQuestion(0)
                    setAnswers({})
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-bold hover:bg-gray-50 transition-colors"
                >
                  Refazer Quiz
                </button>
                <button
                  onClick={() => setStep('checkout')}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  Continuar para Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // CHECKOUT
  if (step === 'checkout' && quizResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <button
              onClick={() => setStep('result')}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Finalizar Compra
            </h1>
            <p className="text-gray-600">Preencha seus dados para concluir a reserva</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Dados Pessoais</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        value={checkoutData.name}
                        onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                          errors.name ? 'border-red-500' : 'border-gray-200'
                        }`}
                        placeholder="João Silva"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={checkoutData.email}
                        onChange={(e) => setCheckoutData({ ...checkoutData, email: e.target.value })}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                          errors.email ? 'border-red-500' : 'border-gray-200'
                        }`}
                        placeholder="joao@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        value={checkoutData.phone}
                        onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                          errors.phone ? 'border-red-500' : 'border-gray-200'
                        }`}
                        placeholder="(11) 99999-9999"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Endereço *
                      </label>
                      <input
                        type="text"
                        value={checkoutData.address}
                        onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                          errors.address ? 'border-red-500' : 'border-gray-200'
                        }`}
                        placeholder="Rua Exemplo, 123"
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cidade *
                      </label>
                      <input
                        type="text"
                        value={checkoutData.city}
                        onChange={(e) => setCheckoutData({ ...checkoutData, city: e.target.value })}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                          errors.city ? 'border-red-500' : 'border-gray-200'
                        }`}
                        placeholder="São Paulo"
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estado *
                      </label>
                      <input
                        type="text"
                        value={checkoutData.state}
                        onChange={(e) => setCheckoutData({ ...checkoutData, state: e.target.value })}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                          errors.state ? 'border-red-500' : 'border-gray-200'
                        }`}
                        placeholder="SP"
                      />
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CEP *
                      </label>
                      <input
                        type="text"
                        value={checkoutData.zipCode}
                        onChange={(e) => setCheckoutData({ ...checkoutData, zipCode: e.target.value })}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                          errors.zipCode ? 'border-red-500' : 'border-gray-200'
                        }`}
                        placeholder="12345-678"
                      />
                      {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-purple-600" />
                    Dados do Cartão
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número do Cartão *
                      </label>
                      <input
                        type="text"
                        value={checkoutData.cardNumber}
                        onChange={(e) => {
                          const formatted = formatCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))
                          setCheckoutData({ ...checkoutData, cardNumber: formatted })
                        }}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                          errors.cardNumber ? 'border-red-500' : 'border-gray-200'
                        }`}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                      {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome no Cartão *
                      </label>
                      <input
                        type="text"
                        value={checkoutData.cardName}
                        onChange={(e) => setCheckoutData({ ...checkoutData, cardName: e.target.value.toUpperCase() })}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                          errors.cardName ? 'border-red-500' : 'border-gray-200'
                        }`}
                        placeholder="JOÃO SILVA"
                      />
                      {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Validade *
                      </label>
                      <input
                        type="text"
                        value={checkoutData.cardExpiry}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '')
                          if (value.length >= 2) {
                            value = value.slice(0, 2) + '/' + value.slice(2, 4)
                          }
                          setCheckoutData({ ...checkoutData, cardExpiry: value })
                        }}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                          errors.cardExpiry ? 'border-red-500' : 'border-gray-200'
                        }`}
                        placeholder="MM/AA"
                        maxLength={5}
                      />
                      {errors.cardExpiry && <p className="text-red-500 text-sm mt-1">{errors.cardExpiry}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        value={checkoutData.cardCvv}
                        onChange={(e) => setCheckoutData({ ...checkoutData, cardCvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                          errors.cardCvv ? 'border-red-500' : 'border-gray-200'
                        }`}
                        placeholder="123"
                        maxLength={3}
                      />
                      {errors.cardCvv && <p className="text-red-500 text-sm mt-1">{errors.cardCvv}</p>}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                    <Lock className="w-4 h-4 text-green-600" />
                    <span>Pagamento 100% seguro e criptografado</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-2xl p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Resumo do Pedido</h2>

                <div className="mb-4">
                  <img
                    src={quizResult.image}
                    alt={quizResult.product}
                    className="w-full h-40 object-cover rounded-xl mb-3"
                  />
                  <h3 className="font-bold text-gray-900 mb-1">{quizResult.product}</h3>
                  <p className="text-sm text-gray-600">{quizResult.title}</p>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4 space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>R$ {quizResult.price.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Taxa de serviço</span>
                    <span>R$ 0,00</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>R$ {quizResult.price.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Finalizar Compra
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Ao finalizar, você concorda com nossos termos e condições
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // SUCCESS
  if (step === 'success' && quizResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="inline-block p-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-6">
              <Check className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Compra Realizada com Sucesso!
            </h1>

            <p className="text-lg text-gray-700 mb-6">
              Parabéns! Sua reserva do <strong>{quizResult.product}</strong> foi confirmada.
            </p>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
              <div className="grid sm:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pacote</p>
                  <p className="font-bold text-gray-900">{quizResult.product}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Valor Total</p>
                  <p className="font-bold text-gray-900">R$ {quizResult.price.toFixed(2).replace('.', ',')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="font-bold text-gray-900">{checkoutData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Telefone</p>
                  <p className="font-bold text-gray-900">{checkoutData.phone}</p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              Enviamos um email de confirmação com todos os detalhes da sua viagem. 
              Nossa equipe entrará em contato em breve para finalizar os detalhes.
            </p>

            <button
              onClick={() => {
                setStep('landing')
                setCurrentQuestion(0)
                setAnswers({})
                setQuizResult(null)
                setCheckoutData({
                  name: '',
                  email: '',
                  phone: '',
                  address: '',
                  city: '',
                  state: '',
                  zipCode: '',
                  cardNumber: '',
                  cardName: '',
                  cardExpiry: '',
                  cardCvv: ''
                })
              }}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
