import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, BookOpen, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Separator } from '@/components/ui/Separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import { hairTypeArticles } from '@/data/mockData'

// ─── Data ────────────────────────────────────────────────────────────────────

const tocSections = [
  { id: 'determine', label: 'How to Determine Your Hair Type' },
  { id: 'all-types', label: 'All Hair Types' },
  { id: 'explore', label: 'Explore Articles' },
]

const determineSteps = [
  {
    n: 1,
    title: 'Start with clean, product-free hair',
    body: 'Wash with a gentle shampoo and conditioner only. Do not apply any leave-in, oil, gel, or styling product. Let it air dry completely without touching or disturbing it. This is the only accurate baseline — product residue or disturbance while wet will alter the result.',
  },
  {
    n: 2,
    title: 'Look at your curl or coil pattern',
    body: 'Once fully dry, observe the overall pattern across your head:',
    bullets: [
      'Hair lies flat with no movement → likely Type 1 (straight)',
      'Gentle wave but no defined curl → likely Type 2 (wavy)',
      'Springy, defined curls → likely Type 3 (curly)',
      'Tight coils, z-shaped bends, or no visible curl pattern → likely Type 4 (coily/kinky)',
    ],
  },
  {
    n: 3,
    title: 'Assess coil or curl size',
    body: 'For Type 3 and 4 hair, compare your coil or curl diameter:',
    bullets: [
      'Width of a finger or wider → 3A or 3B',
      'Width of a pencil → 3B or 3C',
      'Width of a crochet needle → 4A',
      'Z-shaped angles or no visible coil definition → 4B or 4C',
    ],
  },
  {
    n: 4,
    title: 'Check your shrinkage',
    body: 'After your hair dries, compare dry length to wet length:',
    bullets: [
      'Less than 20% shrinkage → likely an A subtype',
      '30–50% shrinkage → likely a B subtype',
      '50%+ shrinkage → likely a C subtype, especially 4B or 4C',
    ],
  },
  {
    n: 5,
    title: 'Check definition without product',
    body: 'Look at individual sections of your hair when fully dry:',
    bullets: [
      'Curls are clearly defined and separated → A or B subtype',
      'Curls clump or have frizz but shape is visible → B or C subtype',
      'No visible curl pattern, looks like a full cloud or puff → likely 4C',
    ],
  },
]

interface HairTypeEntry {
  type: string
  descriptor: string
  curlSize: string
  shrinkage: string
  porosityTendency: string
  densityTendency: string
  pattern: string
  challenges: string
  carePrinciples: string
  worksWell: string[]
  avoid: string[]
}

const hairTypeData: HairTypeEntry[] = [
  {
    type: '3A',
    descriptor: 'Large, loose, well-defined S-shaped curls',
    curlSize: 'Finger-width or wider',
    shrinkage: '20–30%',
    porosityTendency: 'Low to medium',
    densityTendency: 'Low to medium',
    pattern:
      'Loose, shiny S-shaped curls that typically maintain definition even without heavy product. The curl pattern is consistent and each strand usually forms its own visible ringlet. 3A is the least dense of the curl types and often has natural sheen due to how easily sebum travels down the relatively open curl pattern.',
    challenges:
      'Frizz in humidity is the most common concern, as the open cuticle absorbs atmospheric moisture unevenly. Heavy products easily weigh 3A curls down, causing them to lose definition and become stringy. Over-manipulation when dry causes significant breakage.',
    carePrinciples:
      'Keep products light — this hair type does not need heavy butters or thick creams. Focus on humidity control and preserving definition. Diffuse rather than air-dry flat to avoid stretching the curl. The goal is to add moisture without weight.',
    worksWell: [
      'Lightweight leave-in conditioners (spray or lotion)',
      'Light curl creams and mousses for hold',
      'Diffuser attachment on low heat',
      'Microfiber towel or cotton T-shirt to absorb water',
      'Glycerin-based products in humid climates for definition',
    ],
    avoid: [
      'Heavy oils (castor, shea butter) applied to wet hair as styler',
      'Excess protein treatments — can cause stiffness',
      'Brushing or combing when dry',
      'Skipping heat protectant if using any heat',
    ],
  },
  {
    type: '3B',
    descriptor: 'Bouncy, pencil-width springy spirals',
    curlSize: 'Pencil-width',
    shrinkage: '30–40%',
    porosityTendency: 'Medium',
    densityTendency: 'Medium',
    pattern:
      'Medium-width spirals that are springy with good volume. More prone to frizz than 3A and noticeably drier at the ends due to increased curl tightness making it harder for sebum to travel the full length of the strand. Hair is densely packed and has significant body.',
    challenges:
      'Dryness especially at the ends is persistent, as is frizz in changing weather. Tangles when dry can be severe if hair isn\'t kept in a protective or low-manipulation style overnight. Sulfate shampoos strip natural oils aggressively.',
    carePrinciples:
      'Prioritise moisture at the ends above all else. Always condition thoroughly after shampooing and detangle while saturated with conditioner. Section the hair when detangling to reduce mechanical stress. Deep conditioning bi-weekly is important.',
    worksWell: [
      'Rich leave-in conditioners applied in sections',
      'Curl defining creams with good slip',
      'Detangling in 4–6 sections while wet and conditioned',
      'Finger detangling before using a wide-tooth comb',
      'Satin pillowcase or bonnet to reduce overnight frizz',
    ],
    avoid: [
      'Sulfate or harsh clarifying shampoos used frequently',
      'Skipping conditioner at any wash',
      'Rough towel drying — causes frizz and breakage',
      'Detangling when dry',
    ],
  },
  {
    type: '3C',
    descriptor: 'Dense, tightly packed corkscrew coils',
    curlSize: 'Crochet-needle width',
    shrinkage: '40–50%',
    porosityTendency: 'Medium to high',
    densityTendency: 'High',
    pattern:
      'Tight corkscrew coils that are densely packed together, creating significant volume. Many people with 3C hair also have a section of 3B — particularly at the crown or perimeter. When moisturised well, the coils have beautiful definition but without moisture, they mat and tangle rapidly.',
    challenges:
      'Significant dryness across the length, rapid tangling, and high risk of breakage during detangling. The density means products take longer to distribute evenly, and the coil tightness means the hair is particularly vulnerable to mechanical damage when manipulated incorrectly.',
    carePrinciples:
      'Moisture is the priority — always. The LOC method (Liquid, Oil, Cream) suits 3C well. Detangling only on wet hair with a conditioner that has high slip is non-negotiable. Protective styling regularly to retain length at the fragile ends.',
    worksWell: [
      'High-slip conditioners for detangling',
      'LOC method for moisture retention',
      'Protective styles: twists, braids, buns',
      'Satin bonnet or scarf every night',
      'Pre-poo treatments before wash day',
    ],
    avoid: [
      'Fine-tooth or paddle combs on dry hair',
      'Skipping deep conditioning sessions',
      'Over-manipulation — restyling daily causes breakage',
      'Tight styles without scalp care underneath',
    ],
  },
  {
    type: '4A',
    descriptor: 'Defined S-pattern coils with good retention',
    curlSize: 'Crochet-needle width, visible S-shape',
    shrinkage: '50–60%',
    porosityTendency: 'Medium to high',
    densityTendency: 'Medium to high',
    pattern:
      'Tight but defined S-shaped coils that hold their pattern well when moisturised. Often has natural sheen when in good condition. The coils are smaller than 3C but still form a discernible pattern. 4A hair is versatile — it can be worn in wash-and-go styles with the right products, though shrinkage makes length appear shorter than it is.',
    challenges:
      'Moisture retention is the core challenge. The tighter coil means the cuticle layer is more compact, and products need to penetrate effectively or they sit on the surface. Shrinkage can be discouraging for length retention goals. Tangles form at the ends if hair is not kept moisturised or protected.',
    carePrinciples:
      'Use the LOC or LCO method consistently. Lightweight, water-based leave-ins followed by a sealing oil work well. Protective styles like twists and braids help retain length and reduce daily manipulation. Re-moisturise mid-week, not just on wash day.',
    worksWell: [
      'Water-based leave-in conditioners',
      'Sealing with lightweight oils: jojoba, argan, sweet almond',
      'Twist-outs and braid-outs for stretched, defined styles',
      'Regular protein treatments (every 4–6 weeks)',
      'Finger detangling first, followed by wide-tooth comb',
    ],
    avoid: [
      'Heavy waxes that cause buildup without providing moisture',
      'Going more than 2–3 days without re-moisturising',
      'Heat without protectant — high porosity makes heat damage accumulate faster',
      'Skipping the sealing step in your routine',
    ],
  },
  {
    type: '4B',
    descriptor: 'Z-shaped pattern with sharp angular bends',
    curlSize: 'No defined circular coil; sharp z-shaped bends',
    shrinkage: '50–70%',
    porosityTendency: 'High',
    densityTendency: 'High',
    pattern:
      'Rather than forming a curl or coil, 4B hair bends at sharp angles — zigzag rather than spiral. The overall appearance is a full, dense cloud. Individual strands have significant texture. Most 4B hair has high density, meaning there are many strands per square inch, which creates incredible volume but also means moisture needs to be distributed across far more surface area.',
    challenges:
      'The hardest of the Type 4s to detangle due to the angular bend pattern — tangles are not loops, they are true knots. Single-strand knots (fairy knots) are a persistent problem. Dryness is significant because the bends in the hair shaft reduce how effectively sebum travels down the length. Shrinkage can be demoralising.',
    carePrinciples:
      'Stretch styles reduce tangles, single-strand knots, and manipulation damage. Heavy moisturisers are necessary. Handle hair in sections always. Low-manipulation styles should be the default, not the exception. Sealing with shea butter is highly effective.',
    worksWell: [
      'Shea butter, mango butter, or avocado butter for sealing',
      'Banding method to stretch and reduce single-strand knots',
      'Chunky twists or braids as a default style',
      'Steam treatments to open cuticle for deep conditioning',
      'Fleece-lined satin bonnet — essential nightly protection',
    ],
    avoid: [
      'Fine-tooth combs at any time',
      'Going more than 1–2 days without moisture in dry climates',
      'Wearing hair loose for extended periods without stretching',
      'Rushing the detangling process — patience is non-negotiable',
    ],
  },
  {
    type: '4C',
    descriptor: 'Tightest coil; maximum volume, maximum versatility',
    curlSize: 'No visible curl pattern without product; tightest of all types',
    shrinkage: '70–75%+ — can appear half its actual length',
    porosityTendency: 'High',
    densityTendency: 'Very high',
    pattern:
      'In its natural state, 4C hair has almost no visible curl definition — it appears as a full, dense cloud or puff. The individual strands have the tightest coil of all types, but that coil is so small it\'s not visible to the eye without close inspection. Despite looking "undefined", 4C hair is extraordinarily versatile: it takes styles beautifully — twists, braids, locs, puffs, Bantu knots — because its texture holds form well.',
    challenges:
      'Highest dryness of all hair types. Most prone to breakage from mechanical stress. Shrinkage is often misread as a lack of growth — 4C hair that is 10 inches long may appear to be 3–4 inches. Single-strand knots are endemic. The persistent, undeserved misconception that it "doesn\'t grow" causes psychological harm and encourages neglectful routines.',
    carePrinciples:
      'Maximum moisture, maximum gentleness. The LOC method daily or every other day. Handle hair in sections only. Steam treatments are highly effective for penetrating the cuticle. Protective styles with proper scalp care are the most reliable length retention strategy. Never compare your shrunk length to anyone else\'s.',
    worksWell: [
      'Castor oil (JBCO) for sealing and scalp stimulation',
      'Heavy butters — shea, mango, kokum — for lasting moisture seal',
      'Steam treatments weekly or bi-weekly',
      'African threading, banding, or twist-outs to stretch without heat',
      'Low-manipulation protective styles: cornrows, flat twists, wigs',
      'Rice water or protein treatment every 4 weeks for strand strength',
    ],
    avoid: [
      'Skipping moisture even one day in dry or cold climates',
      'Tight styles (high-tension braids) without scalp care and breaks',
      'Measuring growth by shrunk length — always stretch before assessing',
      'Any form of combing or manipulation when dry',
    ],
  },
]

const FILTER_TYPES = ['All', '3A', '3B', '3C', '4A', '4B', '4C']

// ─── Sub-components ───────────────────────────────────────────────────────────

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-1.5">
      <span className="text-xs font-semibold text-brown-light uppercase tracking-wider">{label}</span>
      <span className="text-sm text-mahogany">{value}</span>
    </span>
  )
}

function HairTypeSection({ entry, isLast }: { entry: HairTypeEntry; isLast: boolean }) {
  return (
    <>
      <section id={`type-${entry.type}`} className="scroll-mt-24 py-10">
        {/* Type heading */}
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h3
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            className="text-3xl font-bold text-mahogany"
          >
            {entry.type}
          </h3>
          <Badge variant="default">{entry.type}</Badge>
        </div>
        <p className="text-base text-brown-mid italic mb-5">{entry.descriptor}</p>

        {/* Metadata row */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 mb-6 pb-5 border-b border-ivory-dark">
          <MetaRow label="Curl Size" value={entry.curlSize} />
          <MetaRow label="Shrinkage" value={entry.shrinkage} />
          <MetaRow label="Porosity Tendency" value={entry.porosityTendency} />
          <MetaRow label="Density Tendency" value={entry.densityTendency} />
        </div>

        {/* Body sections */}
        <div className="space-y-5 text-sm leading-relaxed">
          <div>
            <h4 className="text-xs font-semibold text-mahogany uppercase tracking-widest mb-1.5">Pattern</h4>
            <p className="text-brown-mid">{entry.pattern}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-mahogany uppercase tracking-widest mb-1.5">Common Challenges</h4>
            <p className="text-brown-mid">{entry.challenges}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-mahogany uppercase tracking-widest mb-1.5">Care Principles</h4>
            <p className="text-brown-mid">{entry.carePrinciples}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 pt-1">
            {/* What Works */}
            <div className="bg-terracotta/5 border border-terracotta/15 rounded-xl p-4">
              <h4 className="text-xs font-semibold text-terracotta uppercase tracking-widest mb-3">What Works Well</h4>
              <ul className="space-y-1.5">
                {entry.worksWell.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-brown-mid">
                    <span className="text-terracotta mt-1 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* What to Avoid */}
            <div className="bg-amber/5 border border-amber/20 rounded-xl p-4">
              <h4 className="text-xs font-semibold text-amber-700 uppercase tracking-widest mb-3">What to Avoid</h4>
              <ul className="space-y-1.5">
                {entry.avoid.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-brown-mid">
                    <span className="text-amber-600 mt-1 flex-shrink-0">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {!isLast && <Separator />}
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function HairTypesPage() {
  const [activeToc, setActiveToc] = useState('determine')
  const [selectedType, setSelectedType] = useState('All')

  const filteredArticles =
    selectedType === 'All'
      ? hairTypeArticles
      : hairTypeArticles.filter(
          (a) => a.tags.includes(selectedType) || a.hairType === selectedType
        )

  const scrollTo = (id: string) => {
    setActiveToc(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Page header */}
      <div className="bg-mahogany py-12 sm:py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #FAF7F2 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-amber text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">
            Reference Guide
          </p>
          <h1
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory mb-3"
          >
            Hair Type Guide
          </h1>
          <p className="text-ivory/60 text-base sm:text-lg max-w-xl">
            How to identify your type, what it means, and how to care for it.
          </p>
        </div>
      </div>

      {/* Mobile "On this page" dropdown */}
      <div className="lg:hidden sticky top-16 z-30 bg-ivory/95 backdrop-blur-sm border-b border-ivory-dark px-4 py-2.5">
        <div className="flex items-center gap-2 max-w-7xl mx-auto">
          <ChevronDown size={14} className="text-terracotta flex-shrink-0" />
          <span className="text-xs font-semibold text-mahogany uppercase tracking-wider mr-2 flex-shrink-0">
            On this page:
          </span>
          <Select
            value={activeToc}
            onValueChange={(val) => scrollTo(val)}
          >
            <SelectTrigger className="flex-1 text-xs py-1.5 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tocSections.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.label}
                </SelectItem>
              ))}
              {hairTypeData.map((ht) => (
                <SelectItem key={ht.type} value={`type-${ht.type}`}>
                  → {ht.type}: {ht.descriptor.split(',')[0]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-12">

          {/* Desktop sticky TOC sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-24 space-y-1">
              <p className="text-xs font-semibold text-brown-light uppercase tracking-widest mb-4 px-3">
                On this page
              </p>
              {tocSections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`w-full text-left flex items-center gap-2 px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer ${
                    activeToc === s.id
                      ? 'bg-terracotta/10 text-terracotta font-semibold'
                      : 'text-brown-mid hover:text-terracotta hover:bg-terracotta/5'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${activeToc === s.id ? 'bg-terracotta' : 'bg-brown-light'}`} />
                  {s.label}
                </button>
              ))}
              <div className="pt-3 pl-3">
                <p className="text-xs font-semibold text-brown-light uppercase tracking-widest mb-2">
                  Hair Types
                </p>
                {hairTypeData.map((ht) => (
                  <button
                    key={ht.type}
                    onClick={() => scrollTo(`type-${ht.type}`)}
                    className={`w-full text-left flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                      activeToc === `type-${ht.type}`
                        ? 'text-terracotta font-semibold'
                        : 'text-brown-mid hover:text-terracotta'
                    }`}
                  >
                    <span className="text-brown-light">—</span>
                    {ht.type}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0 max-w-3xl">

            {/* ── ACT 1 ─────────────────────────────────────────────── */}
            <section id="determine" className="scroll-mt-28 pb-12">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-7 h-7 rounded-full bg-terracotta flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</div>
                <h2
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  className="text-2xl sm:text-3xl font-bold text-mahogany"
                >
                  How to Determine Your Hair Type
                </h2>
              </div>

              <p className="text-brown-mid text-sm sm:text-base leading-relaxed mb-8">
                Hair typing — the Andre Walker system that gave us the 1–4 scale — is a useful starting point, but not the whole picture. It describes <em>pattern shape</em> only. It tells you nothing about porosity (how well your hair absorbs moisture), density (how many strands you have), or strand thickness — all of which matter just as much, if not more, for building an effective routine. Use your hair type as a loose framework, not a rigid prescription.
              </p>

              <div className="space-y-5">
                {determineSteps.map((step) => (
                  <div key={step.n} className="flex gap-4">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-7 h-7 rounded-full border-2 border-terracotta text-terracotta flex items-center justify-center text-xs font-bold">
                        {step.n}
                      </div>
                    </div>
                    <div className="flex-1 pb-5 border-b border-ivory-dark last:border-0 last:pb-0">
                      <h3
                        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                        className="font-semibold text-mahogany text-base mb-1.5"
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm text-brown-mid leading-relaxed mb-2">{step.body}</p>
                      {step.bullets && (
                        <ul className="space-y-1 ml-1">
                          {step.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2 text-sm text-brown-mid">
                              <span className="text-terracotta flex-shrink-0 mt-0.5">→</span>
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-amber/10 border border-amber/30 rounded-xl p-4 text-sm text-brown-mid leading-relaxed">
                <strong className="text-mahogany">Note:</strong> Most people have more than one hair type on their head — this is completely normal. The crown, nape, and perimeter often differ. Identify the type that is most dominant, and treat the rest accordingly.
              </div>
            </section>

            <Separator className="my-4" />

            {/* ── ACT 2 ─────────────────────────────────────────────── */}
            <section id="all-types" className="scroll-mt-28 py-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-full bg-terracotta flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</div>
                <h2
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  className="text-2xl sm:text-3xl font-bold text-mahogany"
                >
                  All Hair Types
                </h2>
              </div>
              <p className="text-sm sm:text-base text-brown-mid leading-relaxed mb-4">
                Below is a full breakdown of every hair type, with details on pattern, characteristics, common challenges, and care principles. Use this as a reference — not a rulebook. Your hair's behaviour and needs will always override any generalisation.
              </p>

              {hairTypeData.map((entry, i) => (
                <HairTypeSection
                  key={entry.type}
                  entry={entry}
                  isLast={i === hairTypeData.length - 1}
                />
              ))}
            </section>

            <Separator className="my-4" />

            {/* ── ACT 3 ─────────────────────────────────────────────── */}
            <section id="explore" className="scroll-mt-28 py-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-full bg-terracotta flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</div>
                <h2
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  className="text-2xl sm:text-3xl font-bold text-mahogany"
                >
                  Explore Articles by Hair Type
                </h2>
              </div>
              <p className="text-sm text-brown-mid mb-6 leading-relaxed">
                Find guides, routines, and deep-dives written for your specific hair type. Select a type to filter.
              </p>

              {/* Filter buttons */}
              <div className="flex flex-wrap gap-2 mb-6">
                {FILTER_TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                      selectedType === t
                        ? 'bg-mahogany text-ivory border-mahogany'
                        : 'bg-transparent text-brown-mid border-ivory-dark hover:border-mahogany/40 hover:text-mahogany'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Result count */}
              <p className="text-xs text-brown-light mb-4 uppercase tracking-wider">
                {selectedType === 'All'
                  ? `Showing all ${filteredArticles.length} articles`
                  : `Showing ${filteredArticles.length} article${filteredArticles.length !== 1 ? 's' : ''} for ${selectedType}`}
              </p>

              {/* Article list */}
              {filteredArticles.length === 0 ? (
                <p className="text-sm text-brown-mid py-8 text-center border border-ivory-dark rounded-xl bg-white">
                  No articles yet for this hair type. Check back soon.
                </p>
              ) : (
                <div className="divide-y divide-ivory-dark">
                  {filteredArticles.map((article) => (
                    <div key={article.slug} className="py-5 group">
                      <div className="flex flex-wrap gap-1.5 mb-1.5">
                        {article.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="muted">{tag}</Badge>
                        ))}
                      </div>
                      <Link
                        to={`/article/${article.slug}`}
                        className="block font-semibold text-mahogany hover:text-terracotta underline decoration-transparent hover:decoration-terracotta transition-all text-base mb-1"
                        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                      >
                        {article.title}
                      </Link>
                      <p className="text-sm text-brown-mid leading-relaxed line-clamp-2 mb-2">
                        {article.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-brown-light">
                        <span className="flex items-center gap-1">
                          <BookOpen size={11} /> {article.readTime}
                        </span>
                        <Link
                          to={`/article/${article.slug}`}
                          className="flex items-center gap-1 text-terracotta hover:gap-2 transition-all font-medium"
                        >
                          Read article <ArrowRight size={11} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

          </main>
        </div>
      </div>
    </div>
  )
}
