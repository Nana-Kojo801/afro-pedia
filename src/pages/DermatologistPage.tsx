import { useState, useMemo } from 'react'
import { Search, MapPin, Phone, ChevronRight, CheckCircle, XCircle, Globe, Stethoscope, Users } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { dermatologists, type Dermatologist } from '../data/mockData'
import { toast } from 'sonner'

const SPECIALTIES = [
  'All Specialties',
  'Hair Loss & Alopecia',
  'Scalp Conditions',
  'Traction Alopecia',
  'Natural Hair Care',
  'Paediatric Dermatology',
]

const SPECIALTY_COLORS: Record<string, string> = {
  'Hair Loss & Alopecia':  'bg-terracotta/10 text-terracotta border-terracotta/20',
  'Scalp Conditions':      'bg-amber/10 text-amber border-amber/30',
  'Traction Alopecia':     'bg-red-50 text-red-600 border-red-200',
  'Natural Hair Care':     'bg-green-50 text-green-700 border-green-200',
  'Paediatric Dermatology':'bg-mahogany/10 text-brown-mid border-mahogany/20',
}

function DermatologistCard({ doc }: { doc: Dermatologist }) {
  const initials = doc.name
    .replace('Dr. ', '')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')

  const handleContact = () => {
    toast.success(`Contacting ${doc.name}`, {
      description: `Call ${doc.phone} or visit ${doc.clinic}`,
    })
  }

  return (
    <div className="bg-white rounded-2xl border border-ivory-dark hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col">
      {/* Card header */}
      <div className="p-5 pb-4 flex items-start gap-4 border-b border-ivory-dark">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-2xl bg-terracotta/10 flex items-center justify-center flex-shrink-0">
          <span
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            className="text-terracotta font-bold text-lg"
          >
            {initials}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                className="font-bold text-mahogany text-base leading-snug"
              >
                {doc.name}
              </h3>
              <p className="text-brown-light text-xs mt-0.5 leading-snug">{doc.title}</p>
              <p className="text-brown-mid text-xs font-medium mt-1 truncate">{doc.clinic}</p>
            </div>
            <span
              className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
                doc.acceptingPatients
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-500 border border-red-200'
              }`}
            >
              {doc.acceptingPatients ? <CheckCircle size={10} /> : <XCircle size={10} />}
              {doc.acceptingPatients ? 'Accepting' : 'Full'}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Location + phone */}
        <div className="space-y-1.5">
          <div className="flex items-start gap-2 text-xs text-brown-mid">
            <MapPin size={13} className="text-terracotta mt-0.5 flex-shrink-0" />
            <span>{doc.address}, {doc.city}, {doc.country}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-brown-mid">
            <Phone size={13} className="text-terracotta flex-shrink-0" />
            <span>{doc.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-brown-mid">
            <Globe size={13} className="text-terracotta flex-shrink-0" />
            <span>{doc.languages.join(' · ')}</span>
          </div>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-1.5">
          {doc.specialties.map((s) => (
            <span
              key={s}
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${SPECIALTY_COLORS[s] ?? 'bg-ivory-dark text-brown-mid border-ivory-dark'}`}
            >
              {s}
            </span>
          ))}
        </div>

        {/* About */}
        <p className="text-brown-light text-xs leading-relaxed line-clamp-3">{doc.about}</p>

        {/* Conditions treated */}
        <div>
          <p className="text-xs font-semibold text-brown-mid uppercase tracking-wide mb-1.5">Conditions treated</p>
          <div className="flex flex-wrap gap-1">
            {doc.conditions.map((c) => (
              <Badge key={c} variant="muted" className="text-[10px] px-2 py-0">
                {c}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-5 pb-5 flex-shrink-0">
        <Button
          variant="primary"
          size="sm"
          onClick={handleContact}
          className="w-full flex items-center justify-center gap-1.5"
          disabled={!doc.acceptingPatients}
        >
          <Phone size={13} />
          {doc.acceptingPatients ? 'Contact Clinic' : 'Not Accepting Patients'}
        </Button>
      </div>
    </div>
  )
}

export function DermatologistPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSpecialty, setActiveSpecialty] = useState('All Specialties')

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return dermatologists.filter((d) => {
      const matchesSearch =
        !q ||
        d.city.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.name.toLowerCase().includes(q) ||
        d.clinic.toLowerCase().includes(q)
      const matchesSpecialty =
        activeSpecialty === 'All Specialties' || d.specialties.includes(activeSpecialty)
      return matchesSearch && matchesSpecialty
    })
  }, [searchQuery, activeSpecialty])

  return (
    <div className="min-h-screen bg-ivory">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="bg-mahogany text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-2 text-terracotta text-sm font-medium mb-4">
            <span>Home</span>
            <ChevronRight size={14} />
            <span>Find a Dermatologist</span>
          </div>
          <h1
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
          >
            Find a Hair
            <span className="text-terracotta"> Dermatologist</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed mb-8">
            Connect with dermatologists who specialise in Afro-textured hair conditions — from
            traction alopecia to scalp health — near you.
          </p>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, country, or name..."
                className="w-full pl-11 pr-4 py-3.5 text-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-terracotta focus:bg-white/15 transition-all"
              />
            </div>
            <Button
              variant="amber"
              size="md"
              onClick={() => setSearchQuery(searchQuery)}
              className="flex items-center gap-2 sm:flex-shrink-0"
            >
              <MapPin size={15} />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* ── Stats banner ────────────────────────────────────────────────────── */}
      <div className="bg-terracotta/5 border-b border-terracotta/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-6">
            {[
              { icon: <Stethoscope size={15} />, label: `${dermatologists.length} verified specialists` },
              { icon: <MapPin size={15} />,       label: '10+ cities across Africa, Europe & Americas' },
              { icon: <Users size={15} />,         label: `${dermatologists.filter((d) => d.acceptingPatients).length} accepting new patients` },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-brown-mid">
                <span className="text-terracotta">{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Specialty filter */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          <span className="text-xs font-semibold text-brown-light uppercase tracking-wide mr-1">Specialty:</span>
          {SPECIALTIES.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSpecialty(s)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeSpecialty === s
                  ? 'bg-terracotta text-white shadow-sm'
                  : 'bg-white text-brown-mid border border-ivory-dark hover:border-terracotta hover:text-terracotta'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-brown-light mb-6">
          Showing{' '}
          <span className="font-semibold text-mahogany">{filtered.length}</span>{' '}
          dermatologist{filtered.length !== 1 ? 's' : ''}
          {searchQuery && <> matching <span className="font-medium text-mahogany">"{searchQuery}"</span></>}
          {activeSpecialty !== 'All Specialties' && <> · {activeSpecialty}</>}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-ivory-dark">
            <MapPin size={40} className="text-ivory-dark mx-auto mb-3" />
            <p className="text-brown-mid font-medium">No dermatologists match your search</p>
            <p className="text-brown-light text-sm mt-1">Try a different city, country, or specialty</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveSpecialty('All Specialties') }}
              className="mt-4 text-terracotta text-sm font-medium hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((doc) => (
              <DermatologistCard key={doc.id} doc={doc} />
            ))}
          </div>
        )}

        {/* Info banner */}
        <div className="mt-12 bg-white rounded-2xl border border-ivory-dark p-6 sm:p-8">
          <h2
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            className="text-xl font-bold text-mahogany mb-3"
          >
            What to look for in a hair dermatologist
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
            {[
              {
                title: 'Specialisation in textured hair',
                body: 'Look for dermatologists who specifically mention Afro-textured hair, CCCA, or traction alopecia in their profile — not all skin doctors have this expertise.',
              },
              {
                title: 'Cultural competence',
                body: 'A good specialist will ask about your styling practices, chemical treatments, and personal hair history before making any recommendations.',
              },
              {
                title: 'Collaboration with trichologists',
                body: 'The best care often comes from teams: a dermatologist handles medical treatment while a trichologist guides your day-to-day hair care routine.',
              },
            ].map(({ title, body }) => (
              <div key={title} className="flex flex-col gap-2">
                <div className="w-8 h-8 rounded-lg bg-terracotta/10 flex items-center justify-center">
                  <Stethoscope size={16} className="text-terracotta" />
                </div>
                <h3 className="font-semibold text-mahogany text-sm">{title}</h3>
                <p className="text-brown-light text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
