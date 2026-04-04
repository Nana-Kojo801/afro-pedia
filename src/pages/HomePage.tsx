import { Link } from 'react-router-dom'
import {
  Crown, Scissors, Shield, Droplets, Sparkles, Leaf,
  ChevronRight, BookOpen, Star, ArrowRight
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { categories, popularArticles } from '@/data/mockData'

const iconMap: Record<string, React.ElementType> = {
  Crown, Scissors, Shield, Droplets, Sparkles, Leaf
}

function HeroDecoration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-72 h-72 rounded-full border-2 border-terracotta/20 animate-[spin_30s_linear_infinite]" />
      <div className="absolute w-52 h-52 rounded-full border border-amber/30" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <div
          key={deg}
          className="absolute w-2.5 h-2.5 rounded-full bg-terracotta/40"
          style={{ transform: `rotate(${deg}deg) translateX(130px)` }}
        />
      ))}
      <div className="w-36 h-36 rounded-full bg-gradient-to-br from-terracotta/30 via-amber/20 to-terracotta/10 flex items-center justify-center shadow-lg">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-terracotta to-terracotta-dark flex items-center justify-center shadow-inner">
          <Crown size={36} className="text-ivory" />
        </div>
      </div>
      <svg className="absolute opacity-20" width="320" height="320" viewBox="0 0 320 320">
        <path d="M160 40 C220 40, 280 100, 280 160 C280 220, 220 280, 160 280 C100 280, 40 220, 40 160 C40 100, 100 40, 160 40" fill="none" stroke="#C4622D" strokeWidth="1.5" strokeDasharray="4 6" />
        <path d="M160 70 C205 70, 250 115, 250 160 C250 205, 205 250, 160 250 C115 250, 70 205, 70 160 C70 115, 115 70, 160 70" fill="none" stroke="#E8A838" strokeWidth="1" strokeDasharray="3 8" />
      </svg>
    </div>
  )
}

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ivory via-ivory to-ivory-dark pt-16 pb-20">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #2C1810 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta rounded-full px-4 py-1.5 text-sm font-medium border border-terracotta/20">
                <Star size={14} className="fill-terracotta" />
                The African Hair Care Knowledge Base
              </div>

              <h1 style={{ fontFamily: '"Playfair Display", Georgia, serif' }} className="text-5xl sm:text-6xl lg:text-7xl font-black text-mahogany leading-[1.05] tracking-tight">
                Know Your<br />
                <span className="text-terracotta italic">Crown.</span>
              </h1>

              <p className="text-lg text-brown-mid leading-relaxed max-w-md">
                Deep-dive guides, science-backed routines, and cultural wisdom for every curl type, coil pattern, and natural hair journey.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/hair-types"
                  className="inline-flex items-center gap-2 bg-terracotta text-white rounded-full px-8 py-3.5 text-base font-medium hover:bg-terracotta-dark shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Explore Hair Types
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/articles"
                  className="inline-flex items-center gap-2 border-2 border-terracotta text-terracotta bg-transparent rounded-full px-8 py-3.5 text-base font-medium hover:bg-terracotta hover:text-white transition-all duration-200"
                >
                  Browse Articles
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-4 border-t border-ivory-dark">
                {[
                  { num: '137+', label: 'Articles' },
                  { num: '6', label: 'Hair Types' },
                  { num: '50+', label: 'Routines' },
                ].map(({ num, label }) => (
                  <div key={label}>
                    <div style={{ fontFamily: '"Playfair Display", Georgia, serif' }} className="text-2xl font-bold text-terracotta">{num}</div>
                    <div className="text-xs text-brown-mid mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block h-96">
              <HeroDecoration />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-terracotta text-sm font-semibold uppercase tracking-widest mb-2">Browse by Topic</p>
              <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif' }} className="text-4xl font-bold text-mahogany">
                Featured Categories
              </h2>
            </div>
            <Link
              to="/hair-types"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-brown-mid hover:text-terracotta font-medium transition-colors"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon]
              return (
                <Link
                  key={cat.id}
                  to="/hair-types"
                  className="group bg-white rounded-2xl p-6 border border-ivory-dark hover:border-terracotta/40 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-terracotta/10 group-hover:bg-terracotta/20 flex items-center justify-center flex-shrink-0 transition-colors">
                      {Icon && <Icon size={22} className="text-terracotta" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif' }} className="font-semibold text-mahogany text-lg group-hover:text-terracotta transition-colors">
                          {cat.label}
                        </h3>
                        <ChevronRight size={16} className="text-brown-light group-hover:text-terracotta transition-colors flex-shrink-0" />
                      </div>
                      <p className="text-sm text-brown-mid leading-relaxed">{cat.description}</p>
                      <p className="text-xs text-brown-light mt-2">{cat.articleCount} articles</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Popular Articles — horizontal scroll */}
      <section className="py-20 bg-gradient-to-b from-ivory to-ivory-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-terracotta text-sm font-semibold uppercase tracking-widest mb-2">Editor's Picks</p>
              <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif' }} className="text-4xl font-bold text-mahogany">
                Popular Articles
              </h2>
            </div>
            <Link
              to="/articles"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-brown-mid hover:text-terracotta font-medium transition-colors"
            >
              All Articles <ChevronRight size={16} />
            </Link>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory">
            {popularArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/article/${article.slug}`}
                className="group flex-shrink-0 w-72 sm:w-80 bg-white rounded-2xl border border-ivory-dark hover:border-terracotta/40 hover:shadow-lg transition-all duration-300 overflow-hidden snap-start"
              >
                <div className="h-2 bg-gradient-to-r from-terracotta to-amber" />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="muted">{article.tag}</Badge>
                    <Badge variant="outline">{article.hairType}</Badge>
                  </div>
                  <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif' }} className="font-bold text-mahogany text-lg leading-snug mb-2 group-hover:text-terracotta transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-brown-mid leading-relaxed line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-brown-light flex items-center gap-1">
                      <BookOpen size={12} />
                      {article.readTime}
                    </span>
                    <span className="text-xs text-terracotta font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-mahogany relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #FAF7F2 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
        <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-terracotta/10 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-64 h-64 rounded-full bg-amber/10 translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-amber text-sm font-semibold uppercase tracking-widest mb-4">Start Your Journey</p>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif' }} className="text-4xl sm:text-5xl font-bold text-ivory leading-tight mb-6">
            Not sure where to start?
          </h2>
          <p className="text-ivory/70 text-lg mb-8 leading-relaxed">
            Find your hair type, understand your porosity, and get a personalised care routine built around your unique crown.
          </p>
          <Link
            to="/hair-types"
            className="inline-flex items-center gap-2 bg-amber text-mahogany rounded-full px-8 py-3.5 text-base font-medium hover:bg-amber-light shadow-sm transition-all duration-200"
          >
            Find Your Hair Type
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
