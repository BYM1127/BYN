'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, ChevronRight } from 'lucide-react'
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
  text: "Hi there! 👋 Welcome to BYM Studio. What can I help you find today?",
}

const OPTIONS = [
  { id: 'crochet', label: '🧶 Crochet Studio', text: "I'm looking for crochet items" },
  { id: 'photo', label: '📷 Photography', text: "I want to book a photoshoot" },
  { id: 'web', label: '💻 Web Design', text: "I need a website" },
  { id: 'general', label: '❓ General Question', text: "I have a general question" },
]

const RESPONSES: Record<string, Message> = {
  crochet: {
    id: 'res-crochet',
    type: 'bot',
    text: "Awesome! You can shop our ready-made pieces or design your own custom creation using our 6-step wizard.",
    links: [
      { label: 'Design Your Own', href: '/crochet/design' },
      { label: 'Shop Ready-Made', href: '/crochet/shop' },
    ],
  },
  photo: {
    id: 'res-photo',
    type: 'bot',
    text: "Great! We offer Portrait, Couples, Family, Maternity, and Event sessions. You can view our packages and book online.",
    links: [
      { label: 'View Packages & Book', href: '/photography' },
      { label: 'View Gallery', href: '/gallery' },
    ],
  },
  web: {
    id: 'res-web',
    type: 'bot',
    text: "Perfect. We build bespoke websites tailored to your business needs. Check out our services to get started.",
    links: [
      { label: 'Web Design Services', href: '/webdesign' },
      { label: 'Start a Project', href: '/webdesign/enquire' },
    ],
  },
  general: {
    id: 'res-general',
    type: 'bot',
    text: "No problem! You can learn more about BYM Studio on our About page, or send us a message directly via our Contact page.",
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
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

    // Simulate response delay
    setTimeout(() => {
      const response = RESPONSES[optionId]
      setMessages((prev) => [
        ...prev,
        { ...response, id: (Date.now() + 1).toString() },
      ])

      setTimeout(() => setShowOptions(true), 1200)
    }, 500)
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#E07A5F] to-[#81B29A] text-white rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label="Toggle chat assistant"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat window frame */}
      {isOpen && (
        <div
          className="fixed z-50 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300"
          style={{
            bottom: '4.5rem',
            right: '1rem',
            left: '1rem',
            maxWidth: '360px',
            height: '460px',
            maxHeight: 'calc(100vh - 6rem)',
            marginLeft: 'auto',
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--color-crochet)] to-[var(--color-photography)] p-3.5 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-hand text-sm font-bold text-white shrink-0">
                BYM
              </div>
              <div>
                <div className="font-serif font-bold text-sm leading-tight text-white">
                  Studio Assistant
                </div>
                <div className="text-[0.68rem] text-white/90">
                  Typically replies instantly
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-3.5 flex flex-col gap-3 bg-[var(--color-bg-secondary)]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm shadow-sm leading-snug ${
                    msg.type === 'user'
                      ? 'bg-[var(--color-crochet)] text-white rounded-tr-xs font-medium'
                      : 'bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-tl-xs'
                  }`}
                >
                  {msg.text}

                  {/* Action links */}
                  {msg.links && (
                    <div className="mt-2.5 flex flex-col gap-1.5">
                      {msg.links.map((link, idx) => (
                        <Link
                          key={idx}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] px-2.5 py-1.5 rounded-lg text-xs font-semibold hover:border-[var(--color-crochet)] transition-colors"
                        >
                          {link.label}
                          <ChevronRight size={13} className="opacity-60" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Input / Options area */}
          <div className="p-3 border-t border-[var(--color-border)] bg-[var(--color-bg-card)] shrink-0">
            {showOptions ? (
              <div className="flex flex-col gap-1.5">
                <div className="text-[0.68rem] text-center text-[var(--color-text-muted)] mb-1 uppercase tracking-wider font-semibold">
                  Choose an option below
                </div>
                {OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleOptionClick(opt.id, opt.text)}
                    className="w-full text-left px-3 py-1.5 text-xs sm:text-sm rounded-full border border-[var(--color-border)] bg-[var(--color-bg-primary)] hover:bg-[var(--color-bg-secondary)] hover:border-[var(--color-crochet)] transition-all text-[var(--color-text-primary)] shadow-2xs font-medium"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-2 text-[var(--color-text-muted)] text-xs italic">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[var(--color-crochet)] rounded-full animate-bounce"></span>
                  <span
                    className="w-1.5 h-1.5 bg-[var(--color-photography)] rounded-full animate-bounce"
                    style={{ animationDelay: '0.15s' }}
                  ></span>
                  <span
                    className="w-1.5 h-1.5 bg-[var(--color-webdesign)] rounded-full animate-bounce"
                    style={{ animationDelay: '0.3s' }}
                  ></span>
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
