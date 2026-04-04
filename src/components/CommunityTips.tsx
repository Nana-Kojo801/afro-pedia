import { useState } from 'react'
import { toast } from 'sonner'
import { MessageSquarePlus, Send } from 'lucide-react'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Textarea } from './ui/Textarea'
import { Alert, AlertDescription } from './ui/Alert'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/Select'

interface CommunityTip {
  id: number
  name: string
  hairType: string
  tip: string
  initials: string
  color: string
}

const AVATAR_COLORS = [
  '#C4622D',
  '#7C5C4E',
  '#A34E22',
  '#5C3D2E',
  '#E8A838',
]

const initialTips: CommunityTip[] = [
  {
    id: 1,
    name: 'Abena K.',
    hairType: '4C',
    tip: "I started doing the greenhouse effect overnight once a week — sleeping with a little coconut oil and a plastic cap — and my low porosity 4C hair finally started retaining moisture for more than a day. The heat from your scalp opens the cuticle and lets the oil actually absorb. Game changer.",
    initials: 'AK',
    color: AVATAR_COLORS[0],
  },
  {
    id: 2,
    name: 'Fatima O.',
    hairType: '4A',
    tip: "Apple cider vinegar rinses completely changed my wash days. My high porosity 4A hair was always frizzy after washing, but sealing the cuticle with an ACV rinse (1 tbsp ACV to 2 cups water) before my LOC routine keeps everything smooth and defined for days.",
    initials: 'FO',
    color: AVATAR_COLORS[1],
  },
  {
    id: 3,
    name: 'Zuri M.',
    hairType: '4B',
    tip: "If you have low porosity hair, steam treatments are non-negotiable. I sit under my hooded dryer for 20 minutes with a deep conditioner every two weeks and my hair went from crunchy and stiff to genuinely soft. No product works if it can't get in.",
    initials: 'ZM',
    color: AVATAR_COLORS[2],
  },
  {
    id: 4,
    name: 'Nadia T.',
    hairType: '3C',
    tip: "I re-test my porosity after every chemical treatment or big styling change. Heat damage raised my cuticle permanently in a section at the front, so that part needs a completely different routine now — more protein, heavier sealants. Don't treat your hair as one uniform texture.",
    initials: 'NT',
    color: AVATAR_COLORS[3],
  },
  {
    id: 5,
    name: 'Asha W.',
    hairType: '4C',
    tip: "For high porosity 4C hair, I swear by the rice water rinse as a light protein treatment every 4 weeks. It's free, it's gentle, and it filled in the gaps in my cuticle enough that my hair holds moisture significantly longer. Fermented is stronger than non-fermented — start with plain if you're new.",
    initials: 'AW',
    color: AVATAR_COLORS[4],
  },
]

const HAIR_TYPES = ['3A', '3B', '3C', '4A', '4B', '4C', 'All Types']

export function CommunityTips() {
  const [tips, setTips] = useState<CommunityTip[]>(initialTips)
  const [name, setName] = useState('')
  const [tipText, setTipText] = useState('')
  const [hairType, setHairType] = useState('')
  const [error, setError] = useState('')

  const getInitials = (n: string) =>
    n
      .trim()
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Please enter your display name.')
      return
    }
    if (!tipText.trim() || tipText.trim().length < 20) {
      setError('Please enter a tip (at least 20 characters).')
      return
    }

    const newTip: CommunityTip = {
      id: Date.now(),
      name: name.trim(),
      hairType: hairType || 'All Types',
      tip: tipText.trim(),
      initials: getInitials(name.trim()),
      color: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
    }

    setTips((prev) => [newTip, ...prev])
    setName('')
    setTipText('')
    setHairType('')

    toast.success('Tip submitted! Thank you for sharing your wisdom.', {
      duration: 4000,
    })
  }

  return (
    <section className="mt-16 pt-10 border-t border-ivory-dark">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-8 bg-amber rounded-full flex-shrink-0" />
        <h2
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          className="text-2xl sm:text-3xl font-bold text-mahogany"
        >
          Community Tips
        </h2>
      </div>

      {/* Tips list */}
      <div className="space-y-4 mb-10">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="bg-white rounded-2xl border border-ivory-dark p-4 sm:p-5 flex gap-3 sm:gap-4"
          >
            {/* Avatar */}
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm"
              style={{ backgroundColor: tip.color }}
            >
              {tip.initials}
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-mahogany">{tip.name}</span>
                <Badge variant="muted">{tip.hairType}</Badge>
              </div>
              <p className="text-sm text-brown-mid leading-relaxed">{tip.tip}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Submit form */}
      <div className="bg-terracotta/5 border border-terracotta/20 rounded-2xl p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-5">
          <MessageSquarePlus size={18} className="text-terracotta flex-shrink-0" />
          <h3
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            className="text-lg font-bold text-mahogany"
          >
            Share Your Tip
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="error">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-mahogany mb-1.5 uppercase tracking-wide">
                Your Name
              </label>
              <Input
                placeholder="e.g. Amara S."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-mahogany mb-1.5 uppercase tracking-wide">
                Hair Type
              </label>
              <Select value={hairType} onValueChange={setHairType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select hair type" />
                </SelectTrigger>
                <SelectContent>
                  {HAIR_TYPES.map((ht) => (
                    <SelectItem key={ht} value={ht}>
                      {ht}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-mahogany mb-1.5 uppercase tracking-wide">
              Your Tip
            </label>
            <Textarea
              placeholder="Share what worked for you — be specific! The more detail, the more helpful."
              value={tipText}
              onChange={(e) => setTipText(e.target.value)}
              className="min-h-28"
            />
            <p className="text-xs text-brown-light mt-1">
              {tipText.length} characters — minimum 20
            </p>
          </div>

          <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto">
            <Send size={14} />
            Submit Tip
          </Button>
        </form>
      </div>
    </section>
  )
}
