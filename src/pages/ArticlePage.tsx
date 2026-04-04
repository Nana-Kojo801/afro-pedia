import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight, Clock, BookOpen, AlertTriangle,
  CheckCircle, Star, ArrowRight, Tag, Home, ChevronDown,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { CommunityTips } from '@/components/CommunityTips'
import { articleData } from '@/data/mockData'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'

const productRecommendations = [
  { name: 'Mielle Organics Rosemary Mint Scalp & Hair Strengthening Oil', type: 'Sealing Oil', rating: 4.8 },
  { name: 'As I Am Hydration Elation Intensive Conditioner', type: 'Deep Conditioner', rating: 4.7 },
  { name: 'Shea Moisture JBCO Strengthen & Restore Shampoo', type: 'Clarifying Shampoo', rating: 4.6 },
]

export function ArticlePage() {
  const article = articleData
  const [activeToc, setActiveToc] = useState(article.tableOfContents[0].id)

  return (
    <div className="min-h-screen bg-ivory">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-ivory-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-brown-light overflow-x-auto whitespace-nowrap">
            <Link to="/" className="flex items-center gap-1 hover:text-terracotta transition-colors flex-shrink-0">
              <Home size={12} />
              Home
            </Link>
            {article.breadcrumbs.slice(1).map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-1.5 flex-shrink-0">
                <ChevronRight size={12} />
                {crumb.href === '#' ? (
                  <span className="text-mahogany font-medium max-w-48 truncate">{crumb.label}</span>
                ) : (
                  <Link to={crumb.href} className="hover:text-terracotta transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Mobile: sticky "Jump to section" TOC dropdown */}
        <div className="lg:hidden mb-6 sticky top-16 z-30 bg-ivory/95 backdrop-blur-sm pt-2 pb-3 -mx-4 px-4 border-b border-ivory-dark">
          <div className="flex items-center gap-2">
            <ChevronDown size={14} className="text-terracotta flex-shrink-0" />
            <span className="text-xs font-semibold text-mahogany uppercase tracking-wider mr-2 flex-shrink-0">
              Jump to:
            </span>
            <Select value={activeToc} onValueChange={(val) => {
              setActiveToc(val)
              document.getElementById(val)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}>
              <SelectTrigger className="flex-1 text-xs py-1.5 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {article.tableOfContents.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-10">
          {/* Main article */}
          <article className="flex-1 min-w-0">
            {/* Article header */}
            <header className="mb-8 sm:mb-10">
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-5">
                {article.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={tag.match(/^[34][ABC]/) ? 'default' : 'muted'}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                className="text-2xl sm:text-3xl lg:text-5xl font-black text-mahogany leading-tight mb-5 sm:mb-6"
              >
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-brown-mid pb-6 border-b border-ivory-dark">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-terracotta" />
                  {article.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag size={14} className="text-terracotta" />
                  {article.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen size={14} className="text-terracotta" />
                  {article.publishDate}
                </span>
              </div>
            </header>

            {/* Overview */}
            <section id="overview" className="mb-10 sm:mb-12 scroll-mt-28">
              <h2
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                className="text-xl sm:text-2xl font-bold text-mahogany mb-4 flex items-center gap-3"
              >
                <span className="w-1 h-6 sm:h-7 bg-terracotta rounded-full inline-block flex-shrink-0" />
                Overview
              </h2>
              <div className="space-y-4 text-brown-mid leading-relaxed">
                <p>
                  Hair porosity refers to your hair's ability to absorb and retain moisture. It's determined by the structure of your hair cuticle — the outer layer of each hair strand. Understanding your porosity is arguably the single most important step in building an effective hair care routine.
                </p>
                <p>
                  Many naturalistas struggle with chronic dryness, breakage, or products that just "sit on" the hair without absorbing — all of these issues often trace back to mismatched products or routines for a specific porosity level. When you know your porosity, you stop guessing and start seeing results.
                </p>
                <div className="bg-terracotta/5 border border-terracotta/20 rounded-xl p-4 sm:p-5">
                  <p className="font-semibold text-mahogany mb-2 text-sm">Key Insight</p>
                  <p className="text-sm">
                    Porosity is influenced by both genetics and external factors like heat styling,
                    chemical processing, and even sun exposure. Your porosity may change over
                    time — especially after chemical treatments.
                  </p>
                </div>
              </div>
            </section>

            {/* What to Know */}
            <section id="what-to-know" className="mb-10 sm:mb-12 scroll-mt-28">
              <h2
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                className="text-xl sm:text-2xl font-bold text-mahogany mb-4 flex items-center gap-3"
              >
                <span className="w-1 h-6 sm:h-7 bg-terracotta rounded-full inline-block flex-shrink-0" />
                What to Know
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                {[
                  {
                    level: 'Low Porosity',
                    color: 'bg-amber/10 border-amber/30',
                    textColor: 'text-amber-700',
                    description:
                      'Tightly closed cuticles. Water beads on surface. Products sit on hair. Needs heat to open cuticle.',
                    emoji: '💧',
                  },
                  {
                    level: 'Medium Porosity',
                    color: 'bg-terracotta/10 border-terracotta/20',
                    textColor: 'text-terracotta',
                    description:
                      'Slightly raised cuticles. Absorbs and retains moisture well. Requires minimal effort to maintain.',
                    emoji: '✨',
                  },
                  {
                    level: 'High Porosity',
                    color: 'bg-mahogany/5 border-mahogany/10',
                    textColor: 'text-mahogany',
                    description:
                      'Open or damaged cuticles. Absorbs moisture quickly but loses it just as fast. Prone to frizz.',
                    emoji: '🌿',
                  },
                ].map((item) => (
                  <div key={item.level} className={`rounded-xl border p-4 ${item.color}`}>
                    <div className="text-2xl mb-2">{item.emoji}</div>
                    <h4 className={`font-bold text-sm mb-1.5 ${item.textColor}`}>{item.level}</h4>
                    <p className="text-xs text-brown-mid leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>

              <h3
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                className="text-lg sm:text-xl font-bold text-mahogany mb-3"
              >
                How to Test Your Porosity
              </h3>
              <p className="text-brown-mid leading-relaxed mb-4 text-sm sm:text-base">
                The float test is the most common DIY method: take a strand of clean hair (no
                products) and drop it into a glass of water. Observe for 2–4 minutes.
              </p>
              <ul className="space-y-2">
                {[
                  'Hair floats on top: Low porosity — closed cuticles resist water',
                  'Hair sinks slowly to the middle: Medium porosity — optimal moisture balance',
                  'Hair sinks quickly to the bottom: High porosity — open cuticles absorb water fast',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-brown-mid">
                    <CheckCircle size={16} className="text-terracotta flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Step-by-Step Care Routine */}
            <section id="care-routine" className="mb-10 sm:mb-12 scroll-mt-28">
              <h2
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                className="text-xl sm:text-2xl font-bold text-mahogany mb-5 sm:mb-6 flex items-center gap-3"
              >
                <span className="w-1 h-6 sm:h-7 bg-terracotta rounded-full inline-block flex-shrink-0" />
                Step-by-Step Care Routine
              </h2>

              <div className="space-y-3 sm:space-y-4">
                {[
                  {
                    step: 1,
                    title: 'Pre-Poo Treatment',
                    duration: '30–60 min',
                    description:
                      'Apply a generous amount of a penetrating oil (coconut or olive oil) to dry hair before washing. This prevents excessive moisture loss during shampooing and reduces hygral fatigue.',
                  },
                  {
                    step: 2,
                    title: 'Clarify, Then Moisturise',
                    duration: '15 min',
                    description:
                      'Use a clarifying shampoo once a month to remove product buildup. Follow with a moisturising shampoo on regular wash days.',
                  },
                  {
                    step: 3,
                    title: 'Deep Condition with Heat',
                    duration: '30–45 min',
                    description:
                      'For low porosity hair, always apply heat during deep conditioning. A hooded dryer, heat cap, or warm towel will open the cuticle and allow the conditioner to penetrate effectively.',
                  },
                  {
                    step: 4,
                    title: 'Apply the LOC/LCO Method',
                    duration: '10 min',
                    description:
                      'Layer your products in the correct order for your porosity. Low porosity: LCO (Liquid, Cream, Oil). High porosity: LOC (Liquid, Oil, Cream) to seal in moisture longer.',
                  },
                  {
                    step: 5,
                    title: 'Seal with a Butter or Heavy Oil',
                    duration: '5 min',
                    description:
                      'High porosity hair benefits greatly from heavy sealants like shea butter, castor oil, or mango butter to prevent moisture from escaping through the open cuticles.',
                  },
                ].map((s) => (
                  <div key={s.step} className="flex gap-3 sm:gap-4 group">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-terracotta text-white flex items-center justify-center text-sm font-bold shadow-sm">
                        {s.step}
                      </div>
                    </div>
                    <div className="flex-1 bg-white rounded-xl border border-ivory-dark p-3 sm:p-4 group-hover:border-terracotta/30 transition-colors">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4
                          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                          className="font-bold text-mahogany text-sm sm:text-base"
                        >
                          {s.title}
                        </h4>
                        <span className="text-xs text-brown-light flex items-center gap-1 flex-shrink-0">
                          <Clock size={11} /> {s.duration}
                        </span>
                      </div>
                      <p className="text-sm text-brown-mid leading-relaxed">{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recommended Products */}
            <section id="recommended-products" className="mb-10 sm:mb-12 scroll-mt-28">
              <h2
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                className="text-xl sm:text-2xl font-bold text-mahogany mb-4 flex items-center gap-3"
              >
                <span className="w-1 h-6 sm:h-7 bg-amber rounded-full inline-block flex-shrink-0" />
                Recommended Products
              </h2>
              <p className="text-brown-mid text-sm mb-5">
                Community-favoured products known to work well for this hair care need.
              </p>

              <div className="space-y-3">
                {productRecommendations.map((prod) => (
                  <div
                    key={prod.name}
                    className="bg-white rounded-xl border border-ivory-dark p-4 flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-mahogany leading-snug">{prod.name}</p>
                      <Badge variant="muted" className="mt-1.5">
                        {prod.type}
                      </Badge>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-1">
                      <Star size={14} className="fill-amber text-amber" />
                      <span className="text-sm font-bold text-mahogany">{prod.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tips & Warnings */}
            <section id="tips-warnings" className="mb-10 sm:mb-12 scroll-mt-28">
              <h2
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                className="text-xl sm:text-2xl font-bold text-mahogany mb-5 flex items-center gap-3"
              >
                <span className="w-1 h-6 sm:h-7 bg-terracotta rounded-full inline-block flex-shrink-0" />
                Tips &amp; Warnings
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-terracotta/5 border border-terracotta/20 rounded-xl p-4 sm:p-5">
                  <h4 className="font-bold text-terracotta flex items-center gap-2 mb-3 text-sm">
                    <CheckCircle size={16} /> Pro Tips
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'Steam treatments are excellent for low porosity hair',
                      'Use apple cider vinegar rinses to temporarily close cuticles for high porosity',
                      'Avoid heavy butters on low porosity hair — they cause buildup',
                      'Protein treatments help high porosity hair strengthen the cuticle',
                    ].map((tip) => (
                      <li key={tip} className="text-xs text-brown-mid flex items-start gap-2">
                        <span className="text-terracotta mt-0.5 flex-shrink-0">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber/5 border border-amber/30 rounded-xl p-4 sm:p-5">
                  <h4 className="font-bold text-amber-700 flex items-center gap-2 mb-3 text-sm">
                    <AlertTriangle size={16} /> Watch Out For
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'Over-moisturising low porosity hair — leads to hygral fatigue',
                      'Skipping protein if you have high porosity — weakens the strand',
                      'Applying heat too often — can permanently raise the cuticle',
                      'Confusing porosity with density — they require different approaches',
                    ].map((warn) => (
                      <li key={warn} className="text-xs text-brown-mid flex items-start gap-2">
                        <span className="text-amber-600 mt-0.5 flex-shrink-0">•</span>
                        {warn}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Community Tips */}
            <CommunityTips />
          </article>

          {/* Desktop Sidebar — sticky TOC */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-5">
              {/* Table of Contents */}
              <div className="bg-white rounded-2xl border border-ivory-dark p-5">
                <h3
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  className="text-sm font-bold text-mahogany mb-4 uppercase tracking-wider"
                >
                  Contents
                </h3>
                <nav className="space-y-1">
                  {article.tableOfContents.map((item, i) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setActiveToc(item.id)}
                      className={`flex items-center gap-2 px-3 py-2 text-xs rounded-lg transition-colors group hover:bg-terracotta/5 hover:text-terracotta ${
                        activeToc === item.id || (activeToc === item.id && i === 0)
                          ? 'bg-terracotta/10 text-terracotta font-medium'
                          : 'text-brown-mid'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          activeToc === item.id
                            ? 'bg-terracotta'
                            : 'bg-brown-light group-hover:bg-terracotta'
                        }`}
                      />
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Hair type info */}
              <div className="bg-terracotta/10 border border-terracotta/20 rounded-2xl p-5">
                <p className="text-xs font-semibold text-terracotta uppercase tracking-wider mb-1">
                  Best For
                </p>
                <p
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  className="text-2xl font-bold text-mahogany"
                >
                  {article.hairType}
                </p>
                <p className="text-xs text-brown-mid mt-1">Hair Type</p>
                <div className="border-t border-terracotta/20 mt-3 pt-3">
                  <p className="text-xs font-semibold text-terracotta uppercase tracking-wider mb-1">
                    Read Time
                  </p>
                  <p className="text-sm font-bold text-mahogany">{article.readTime}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Articles */}
        <div className="mt-14 sm:mt-16 pt-10 border-t border-ivory-dark">
          <div className="flex items-center justify-between mb-7 sm:mb-8">
            <h2
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              className="text-2xl sm:text-3xl font-bold text-mahogany"
            >
              Related Articles
            </h2>
            <Link
              to="/hair-types"
              className="text-sm text-terracotta font-medium flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {article.relatedArticles.map((rel) => (
              <Link
                key={rel.slug}
                to={`/article/${rel.slug}`}
                className="group bg-white rounded-2xl border border-ivory-dark hover:border-terracotta/40 hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="h-1.5 bg-gradient-to-r from-terracotta to-amber" />
                <div className="p-4 sm:p-5">
                  <Badge variant="muted" className="mb-3">
                    {rel.tag}
                  </Badge>
                  <h3
                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                    className="font-bold text-mahogany leading-snug mb-3 group-hover:text-terracotta transition-colors line-clamp-2"
                  >
                    {rel.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-brown-light">
                    <span className="flex items-center gap-1">
                      <BookOpen size={12} /> {rel.readTime}
                    </span>
                    <span className="text-terracotta flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
