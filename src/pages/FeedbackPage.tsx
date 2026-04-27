import { useState } from 'react'
import { Star, ThumbsUp, ChevronRight, MessageSquare, Send, BarChart3 } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { siteFeedbackData, type SiteFeedback } from '../data/mockData'
import { toast } from 'sonner'

const HAIR_TYPE_OPTIONS = ['Select hair type', '3A', '3B', '3C', '4A', '4B', '4C', 'Other / Not sure']

const AVERAGE_RATING = (() => {
  const sum = siteFeedbackData.reduce((acc, f) => acc + f.rating, 0)
  return sum / siteFeedbackData.length
})()

const RATING_DISTRIBUTION = [5, 4, 3, 2, 1].map((star) => ({
  star,
  count: siteFeedbackData.filter((f) => f.rating === star).length,
}))

function StarInput({
  value,
  onChange,
  size = 28,
}: {
  value: number
  onChange: (v: number) => void
  size?: number
}) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          aria-label={`Rate ${star} stars`}
          className="transition-transform hover:scale-110"
        >
          <Star
            size={size}
            className={
              star <= (hovered || value)
                ? 'fill-amber text-amber'
                : 'text-ivory-dark fill-ivory-dark'
            }
          />
        </button>
      ))}
    </div>
  )
}

function FeedbackCard({
  feedback,
  onHelpful,
}: {
  feedback: SiteFeedback
  onHelpful: (id: string) => void
}) {
  return (
    <div className="bg-white rounded-2xl border border-ivory-dark p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0">
            <span
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              className="text-terracotta font-bold text-base"
            >
              {feedback.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-semibold text-mahogany text-sm">{feedback.name}</p>
            <p className="text-brown-light text-xs">{feedback.date}</p>
          </div>
        </div>
        {feedback.hairType && (
          <span className="text-[11px] bg-terracotta/10 text-terracotta font-semibold px-2.5 py-0.5 rounded-full flex-shrink-0">
            {feedback.hairType}
          </span>
        )}
      </div>

      {/* Stars */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={14}
            className={s <= feedback.rating ? 'fill-amber text-amber' : 'text-ivory-dark fill-ivory-dark'}
          />
        ))}
      </div>

      {/* Comment */}
      <p className="text-brown-mid text-sm leading-relaxed">{feedback.comment}</p>

      {/* Helpful */}
      <div className="pt-2 border-t border-ivory-dark flex items-center gap-2">
        <button
          onClick={() => onHelpful(feedback.id)}
          className="flex items-center gap-1.5 text-xs text-brown-light hover:text-terracotta transition-colors group"
        >
          <ThumbsUp size={13} className="group-hover:fill-terracotta/20 transition-all" />
          Helpful ({feedback.helpful})
        </button>
      </div>
    </div>
  )
}

export function FeedbackPage() {
  const [reviews, setReviews] = useState<SiteFeedback[]>(siteFeedbackData)
  const [name, setName] = useState('')
  const [hairType, setHairType] = useState('Select hair type')
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleHelpful = (id: string) => {
    setReviews((prev) =>
      prev.map((f) => (f.id === id ? { ...f, helpful: f.helpful + 1 } : f))
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      toast.error('Please enter your name.')
      return
    }
    if (rating === 0) {
      toast.error('Please select a star rating.')
      return
    }
    if (comment.trim().length < 20) {
      toast.error('Please write at least 20 characters.')
      return
    }

    const newFeedback: SiteFeedback = {
      id: `fb-new-${Date.now()}`,
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }),
      hairType: hairType !== 'Select hair type' ? hairType : undefined,
      helpful: 0,
    }

    setReviews((prev) => [newFeedback, ...prev])
    setName('')
    setHairType('Select hair type')
    setRating(0)
    setComment('')
    setSubmitted(true)
    toast.success('Thank you for your feedback!', {
      description: 'Your review helps us improve AfroPedia.',
    })
    setTimeout(() => setSubmitted(false), 4000)
  }

  const ratingLabel = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent']

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
            <span className="text-terracotta"> Experience</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            Your feedback shapes AfroPedia. Tell us what's working, what could be better, and
            what you'd love to see next.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── Left column: stats + form ──────────────────────────────────── */}
          <div className="lg:col-span-1 space-y-8">

            {/* Overall rating card */}
            <div className="bg-white rounded-2xl border border-ivory-dark p-6">
              <div className="flex items-center gap-2 mb-5">
                <BarChart3 size={18} className="text-terracotta" />
                <h2
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  className="text-lg font-bold text-mahogany"
                >
                  Overall Rating
                </h2>
              </div>

              <div className="flex items-end gap-3 mb-4">
                <span
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  className="text-6xl font-bold text-mahogany leading-none"
                >
                  {AVERAGE_RATING.toFixed(1)}
                </span>
                <div className="pb-1">
                  <div className="flex items-center gap-0.5 mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={16}
                        className={s <= Math.round(AVERAGE_RATING) ? 'fill-amber text-amber' : 'text-ivory-dark fill-ivory-dark'}
                      />
                    ))}
                  </div>
                  <p className="text-brown-light text-xs">{reviews.length} reviews</p>
                </div>
              </div>

              {/* Star distribution bars */}
              <div className="space-y-2">
                {RATING_DISTRIBUTION.map(({ star, count }) => {
                  const pct = Math.round((count / siteFeedbackData.length) * 100)
                  return (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="text-brown-light w-4 text-right">{star}</span>
                      <Star size={10} className="fill-amber text-amber flex-shrink-0" />
                      <div className="flex-1 bg-ivory-dark rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-amber rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-brown-light w-6">{pct}%</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Feedback form */}
            <div className="bg-white rounded-2xl border border-ivory-dark p-6">
              <div className="flex items-center gap-2 mb-5">
                <MessageSquare size={18} className="text-terracotta" />
                <h2
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  className="text-lg font-bold text-mahogany"
                >
                  Leave a Review
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-brown-mid mb-1.5 uppercase tracking-wide">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Adaeze M."
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-ivory-dark bg-ivory focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta text-mahogany placeholder:text-brown-light transition-all"
                  />
                </div>

                {/* Hair type */}
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

                {/* Star rating */}
                <div>
                  <label className="block text-xs font-semibold text-brown-mid mb-2 uppercase tracking-wide">
                    Your Rating *
                  </label>
                  <div className="flex items-center gap-3">
                    <StarInput value={rating} onChange={setRating} size={26} />
                    {rating > 0 && (
                      <span className="text-sm text-amber font-medium">{ratingLabel[rating]}</span>
                    )}
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-xs font-semibold text-brown-mid mb-1.5 uppercase tracking-wide">
                    Your Review *
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={5}
                    placeholder="Tell us about your experience with AfroPedia — what helped you most, what you'd love to see, anything at all..."
                    className="w-full px-4 py-3 text-sm rounded-xl border border-ivory-dark bg-ivory focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta text-mahogany placeholder:text-brown-light transition-all resize-none"
                  />
                  <div className="flex justify-between mt-1">
                    <span className={`text-xs ${comment.length < 20 && comment.length > 0 ? 'text-red-400' : 'text-brown-light'}`}>
                      Minimum 20 characters
                    </span>
                    <span className="text-xs text-brown-light">{comment.length}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Send size={14} />
                  {submitted ? 'Review Submitted!' : 'Submit Review'}
                </Button>
              </form>
            </div>
          </div>

          {/* ── Right column: reviews list ─────────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                className="text-2xl font-bold text-mahogany"
              >
                Community Reviews
              </h2>
              <span className="text-sm text-brown-light">{reviews.length} reviews</span>
            </div>

            <div className="space-y-4">
              {reviews.map((feedback) => (
                <FeedbackCard
                  key={feedback.id}
                  feedback={feedback}
                  onHelpful={handleHelpful}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
