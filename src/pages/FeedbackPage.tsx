import { useState } from 'react'
import { MessageSquare, Send, ChevronRight, Bug, Lightbulb, BookOpen, Heart, Tag } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { siteFeedbackData, type SiteFeedback } from '../data/mockData'
import { toast } from 'sonner'

const HAIR_TYPE_OPTIONS = ['Select hair type (optional)', '3A', '3B', '3C', '4A', '4B', '4C', 'Other / Not sure']

type Category = SiteFeedback['category']

const CATEGORIES: { value: Category; label: string; description: string }[] = [
  { value: 'bug',     label: 'Bug / Problem',       description: 'Something is broken or not working' },
  { value: 'feature', label: 'Feature Request',      description: 'Something you\'d like us to add' },
  { value: 'content', label: 'Content Suggestion',   description: 'Articles, topics, or info gaps' },
  { value: 'general', label: 'General Feedback',     description: 'Anything else on your mind' },
]

const CATEGORY_META: Record<Category, { icon: React.ReactNode; bg: string; text: string; border: string }> = {
  bug:     { icon: <Bug size={14} />,       bg: 'bg-red-50',        text: 'text-red-600',       border: 'border-red-200' },
  feature: { icon: <Lightbulb size={14} />, bg: 'bg-amber/10',      text: 'text-amber',         border: 'border-amber/30' },
  content: { icon: <BookOpen size={14} />,  bg: 'bg-terracotta/10', text: 'text-terracotta',    border: 'border-terracotta/20' },
  general: { icon: <Heart size={14} />,     bg: 'bg-mahogany/10',   text: 'text-brown-mid',     border: 'border-mahogany/20' },
}

function FeedbackItem({ item }: { item: SiteFeedback }) {
  const meta = CATEGORY_META[item.category]
  const catLabel = CATEGORIES.find((c) => c.value === item.category)?.label ?? item.category

  return (
    <div className="bg-white rounded-2xl border border-ivory-dark p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0">
            <span style={{ fontFamily: '"Playfair Display", Georgia, serif' }} className="text-terracotta font-bold text-sm">
              {item.name ? item.name.charAt(0) : '?'}
            </span>
          </div>
          <div>
            <p className="font-semibold text-mahogany text-sm">{item.name ?? 'Anonymous'}</p>
            <p className="text-brown-light text-xs">{item.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {item.hairType && (
            <span className="text-[11px] bg-ivory-dark text-brown-mid font-medium px-2 py-0.5 rounded-full">
              {item.hairType}
            </span>
          )}
          <span className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${meta.bg} ${meta.text} ${meta.border}`}>
            {meta.icon}
            {catLabel}
          </span>
        </div>
      </div>

      {/* Subject */}
      <p className="font-semibold text-mahogany text-sm">{item.subject}</p>

      {/* Message */}
      <p className="text-brown-mid text-sm leading-relaxed">{item.message}</p>
    </div>
  )
}

export function FeedbackPage() {
  const [items, setItems] = useState<SiteFeedback[]>(siteFeedbackData)
  const [name, setName] = useState('')
  const [hairType, setHairType] = useState(HAIR_TYPE_OPTIONS[0])
  const [category, setCategory] = useState<Category | ''>('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [activeFilter, setActiveFilter] = useState<Category | 'all'>('all')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!category) {
      toast.error('Please choose a feedback category.')
      return
    }
    if (!subject.trim()) {
      toast.error('Please add a short subject line.')
      return
    }
    if (message.trim().length < 20) {
      toast.error('Please write at least 20 characters in your message.')
      return
    }

    const newItem: SiteFeedback = {
      id: `fb-new-${Date.now()}`,
      name: name.trim() || undefined,
      category: category as Category,
      subject: subject.trim(),
      message: message.trim(),
      date: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }),
      hairType: hairType !== HAIR_TYPE_OPTIONS[0] ? hairType : undefined,
    }

    setItems((prev) => [newItem, ...prev])
    setName('')
    setHairType(HAIR_TYPE_OPTIONS[0])
    setCategory('')
    setSubject('')
    setMessage('')
    toast.success('Feedback submitted — thank you!', {
      description: 'We read every message and use it to improve AfroPedia.',
    })
  }

  const filtered = activeFilter === 'all' ? items : items.filter((i) => i.category === activeFilter)

  return (
    <div className="min-h-screen bg-ivory">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="bg-mahogany text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-2 text-terracotta text-sm font-medium mb-4">
            <span>Home</span>
            <ChevronRight size={14} />
            <span>Feedback</span>
          </div>
          <h1
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            className="text-4xl sm:text-5xl font-bold mb-4 leading-tight"
          >
            Share Your
            <span className="text-terracotta"> Thoughts</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            Spotted a bug? Have an idea? Want to suggest new content? We read every message — your
            feedback directly shapes how AfroPedia grows.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* ── Left: form ─────────────────────────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-ivory-dark p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare size={18} className="text-terracotta" />
                <h2
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  className="text-lg font-bold text-mahogany"
                >
                  Send Us Feedback
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Category picker */}
                <div>
                  <label className="block text-xs font-semibold text-brown-mid mb-2 uppercase tracking-wide">
                    Category *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map((cat) => {
                      const meta = CATEGORY_META[cat.value]
                      const selected = category === cat.value
                      return (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => setCategory(cat.value)}
                          className={`text-left p-3 rounded-xl border-2 transition-all ${
                            selected
                              ? `${meta.bg} ${meta.border} ${meta.text}`
                              : 'border-ivory-dark hover:border-brown-light bg-ivory'
                          }`}
                        >
                          <div className={`flex items-center gap-1.5 font-semibold text-xs mb-0.5 ${selected ? meta.text : 'text-mahogany'}`}>
                            {meta.icon}
                            {cat.label}
                          </div>
                          <p className="text-[11px] text-brown-light leading-snug">{cat.description}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold text-brown-mid mb-1.5 uppercase tracking-wide">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief summary of your feedback"
                    maxLength={100}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-ivory-dark bg-ivory focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta text-mahogany placeholder:text-brown-light transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-brown-mid mb-1.5 uppercase tracking-wide">
                    Message *
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Describe the bug, suggestion, or anything else in detail..."
                    className="w-full px-4 py-3 text-sm rounded-xl border border-ivory-dark bg-ivory focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta text-mahogany placeholder:text-brown-light transition-all resize-none"
                  />
                  <div className="flex justify-between mt-1">
                    <span className={`text-xs ${message.length > 0 && message.length < 20 ? 'text-red-400' : 'text-brown-light'}`}>
                      Min. 20 characters
                    </span>
                    <span className="text-xs text-brown-light">{message.length}</span>
                  </div>
                </div>

                {/* Optional fields */}
                <div className="pt-1 border-t border-ivory-dark space-y-3">
                  <p className="text-xs text-brown-light">Optional — helps us understand context</p>

                  <div>
                    <label className="block text-xs font-semibold text-brown-mid mb-1.5 uppercase tracking-wide">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Adaeze M."
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-ivory-dark bg-ivory focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta text-mahogany placeholder:text-brown-light transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brown-mid mb-1.5 uppercase tracking-wide">
                      Hair Type
                    </label>
                    <select
                      value={hairType}
                      onChange={(e) => setHairType(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-ivory-dark bg-ivory focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta text-mahogany transition-all appearance-none cursor-pointer"
                    >
                      {HAIR_TYPE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <Button type="submit" variant="primary" size="md" className="w-full flex items-center justify-center gap-2">
                  <Send size={14} />
                  Submit Feedback
                </Button>
              </form>
            </div>
          </div>

          {/* ── Right: feed ────────────────────────────────────────────────── */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <h2
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                className="text-2xl font-bold text-mahogany"
              >
                Recent Feedback
              </h2>
              <span className="text-sm text-brown-light">{filtered.length} item{filtered.length !== 1 ? 's' : ''}</span>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2 flex-wrap mb-6">
              <Tag size={13} className="text-brown-light flex-shrink-0" />
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activeFilter === 'all'
                    ? 'bg-mahogany text-white'
                    : 'bg-white border border-ivory-dark text-brown-mid hover:border-mahogany hover:text-mahogany'
                }`}
              >
                All
              </button>
              {CATEGORIES.map((cat) => {
                const meta = CATEGORY_META[cat.value]
                const active = activeFilter === cat.value
                return (
                  <button
                    key={cat.value}
                    onClick={() => setActiveFilter(cat.value)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                      active
                        ? `${meta.bg} ${meta.text} ${meta.border}`
                        : 'bg-white border-ivory-dark text-brown-mid hover:border-brown-light'
                    }`}
                  >
                    {meta.icon}
                    {cat.label}
                  </button>
                )
              })}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-ivory-dark">
                <MessageSquare size={36} className="text-ivory-dark mx-auto mb-3" />
                <p className="text-brown-mid font-medium">No feedback in this category yet</p>
                <p className="text-brown-light text-sm mt-1">Be the first to share something!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((item) => (
                  <FeedbackItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
