'use client'

import { useState, useRef, useEffect } from 'react'
import { X, ChevronRight, Sparkles, Heart } from 'lucide-react'
import Link from 'next/link'

type Message = {
  id: string
  type: 'bot' | 'user'
  text: string
  links?: { label: string; href: string }[]
}

const INITIAL_MESSAGE: Message = {
  id: 'init',
  type: 'bot',
  text: "Hey there! 👋 I'm Boka, your BYM Studio helper! What fun project are we working on today?",
}

const OPTIONS = [
  { id: 'crochet', label: '🧶 Crochet Magic', text: "I'm looking for crochet items!" },
  { id: 'photo', label: '📸 Photoshoot Magic', text: "I want to book a photoshoot!" },
  { id: 'web', label: '💻 Build a Website', text: "I need a custom website!" },
  { id: 'general', label: '💬 Just Saying Hi!', text: "I have a general question!" },
]

const RESPONSES: Record<string, Message> = {
  crochet: {
    id: 'res-crochet',
    type: 'bot',
    text: "Yay! 🧶 You can shop ready-made pieces or design your own custom piece step-by-step!",
    links: [
      { label: '✨ Design Your Own Piece', href: '/crochet/design' },
      { label: '🛍️ Browse Ready-Made Shop', href: '/crochet/shop' },
    ],
  },
  photo: {
    id: 'res-photo',
    type: 'bot',
    text: "Woohoo! 📸 We offer Portraits, Couples, Families, Maternity, and Event sessions. Let's capture some beautiful memories!",
    links: [
      { label: '📅 View Packages & Book', href: '/photography' },
      { label: '🖼️ Explore Gallery', href: '/gallery' },
    ],
  },
  web: {
    id: 'res-web',
    type: 'bot',
    text: "Awesome choice! 💻 We design fast, modern, and beautiful websites tailored for your business.",
    links: [
      { label: '🚀 Web Design Services', href: '/webdesign' },
      { label: '✉️ Send a Project Request', href: '/webdesign/enquire' },
    ],
  },
  general: {
    id: 'res-general',
    type: 'bot',
    text: "Sweet! 💌 Feel free to learn more about BYM Studio or pop us a message directly!",
    links: [
      { label: '🌟 About Us', href: '/about' },
      { label: '📬 Contact Us Directly', href: '/contact' },
    ],
  },
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [showOptions, setShowOptions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const handleOptionClick = (optionId: string, userText: string) => {
    setShowOptions(false)

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: userText,
    }
    setMessages((prev) => [...prev, userMsg])

    // Simulate friendly typing delay
    setTimeout(() => {
      const response = RESPONSES[optionId]
      setMessages((prev) => [
        ...prev,
        { ...response, id: (Date.now() + 1).toString() },
      ])

      setTimeout(() => setShowOptions(true), 1000)
    }, 450)
  }

  return (
    <>
      {/* Cartoon Floating Trigger Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 group">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-1.5 bg-[var(--color-bg-card)] border-2 border-[#F4A261] text-[var(--color-text-primary)] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-bounce">
            <Sparkles size={13} className="text-[#E07A5F]" />
            <span>Chat with me!</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center justify-center w-13 h-13 sm:w-15 sm:h-15 bg-gradient-to-tr from-[#E07A5F] via-[#F4A261] to-[#81B29A] text-white rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-white/80 hover:scale-110 hover:-rotate-3 active:scale-95 transition-all duration-200"
          aria-label="Toggle cartoon assistant"
        >
          {isOpen ? (
            <X size={24} className="stroke-[2.5]" />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <span className="text-2xl sm:text-3xl leading-none select-none drop-shadow">🧶</span>
            </div>
          )}

          {/* Online badge dot */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full flex items-center justify-center">
              <span className="w-2 h-2 bg-emerald-100 rounded-full animate-ping"></span>
            </span>
          )}
        </button>
      </div>

      {/* Cartoony Popup Chat Window */}
      {isOpen && (
        <div
          className="fixed z-50 bg-[var(--color-bg-card)] border-3 border-[#F4A261] rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 font-sans"
          style={{
            bottom: '5rem',
            right: '1rem',
            left: '1rem',
            maxWidth: '350px',
            height: '470px',
            maxHeight: 'calc(100vh - 6.5rem)',
            marginLeft: 'auto',
          }}
        >
          {/* Playful Cartoony Header */}
          <div className="bg-gradient-to-r from-[#E07A5F] via-[#F4A261] to-[#81B29A] p-3.5 text-white flex justify-between items-center shrink-0 border-b-2 border-white/20">
            <div className="flex items-center gap-2.5">
              {/* Cute Mascot Avatar */}
              <div className="w-10 h-10 rounded-2xl bg-white text-2xl flex items-center justify-center shadow-md border-2 border-amber-200 shrink-0 transform -rotate-3 hover:rotate-6 transition-transform">
                🧶
              </div>
              <div>
                <div className="font-bold text-sm leading-snug text-white flex items-center gap-1">
                  <span>Boka</span>
                  <span className="text-[0.65rem] bg-white/30 text-white font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                    Buddy
                  </span>
                </div>
                <div className="text-[0.7rem] text-white/90 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                  Ready to help! 😊
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="bg-white/20 hover:bg-white/30 text-white p-1.5 rounded-xl transition-all active:scale-90"
              aria-label="Close chat"
            >
              <X size={18} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-3.5 flex flex-col gap-3.5 bg-gradient-to-b from-[var(--color-bg-secondary)] to-[var(--color-bg-card)]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${
                  msg.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {/* Bot Avatar Icon */}
                {msg.type === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-amber-100 border border-amber-300 text-sm flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    🧶
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm shadow-sm leading-relaxed ${
                    msg.type === 'user'
                      ? 'bg-gradient-to-r from-[#E07A5F] to-[#D96B4E] text-white rounded-tr-xs font-semibold'
                      : 'bg-white text-slate-800 border-2 border-amber-100 rounded-tl-xs shadow-2xs'
                  }`}
                >
                  {msg.text}

                  {/* Playful Link Buttons */}
                  {msg.links && (
                    <div className="mt-2.5 flex flex-col gap-1.5">
                      {msg.links.map((link, idx) => (
                        <Link
                          key={idx}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between bg-amber-50 hover:bg-amber-100 border border-amber-200 text-[#E07A5F] px-3 py-1.5 rounded-xl text-xs font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-2xs"
                        >
                          <span>{link.label}</span>
                          <ChevronRight size={14} className="text-[#E07A5F]" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Cartoony Options Area */}
          <div className="p-3 border-t-2 border-[#F4A261]/30 bg-[var(--color-bg-card)] shrink-0">
            {showOptions ? (
              <div className="flex flex-col gap-1.5">
                <div className="text-[0.65rem] text-center text-[var(--color-text-muted)] mb-0.5 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                  <Sparkles size={11} className="text-[#F4A261]" />
                  <span>Pick a question below</span>
                  <Sparkles size={11} className="text-[#F4A261]" />
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionClick(opt.id, opt.text)}
                      className="w-full text-left px-3.5 py-2 text-xs sm:text-sm rounded-xl border-2 border-amber-200/80 bg-gradient-to-r from-amber-50/50 to-orange-50/50 hover:from-amber-100 hover:to-orange-100 hover:border-[#E07A5F] transition-all text-slate-800 font-bold shadow-2xs hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-between group"
                    >
                      <span>{opt.label}</span>
                      <span className="text-xs text-[#E07A5F] opacity-0 group-hover:opacity-100 transition-opacity font-extrabold">
                        Go →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-2.5 text-[#E07A5F] text-xs font-bold">
                <span className="flex items-center gap-1.5">
                  <span className="text-base animate-spin">🧶</span>
                  <span>Thinking...</span>
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
