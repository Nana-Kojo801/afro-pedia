import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Search, ChevronRight, X } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { hairTypeArticles, popularArticles } from '@/data/mockData'

// Merge and deduplicate both article sources
const allArticles = [
  ...hairTypeArticles,
  ...popularArticles
    .filter((p) => !hairTypeArticles.some((h) => h.slug === p.slug))
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      hairType: p.hairType,
      category: p.tag,
      description: p.excerpt,
      readTime: p.readTime,
      tags: [p.hairType, p.tag],
    })),
]

const allCategories = [...new Set(allArticles.map((a) => a.category))]

export function ArticlesPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = allArticles.filter((a) => {
    const matchesSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !activeCategory || a.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <div className="bg-mahogany py-12 sm:py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #FAF7F2 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-amber text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">
            Knowledge Base
          </p>
          <h1
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory mb-3"
          >
            All Articles
          </h1>
          <p className="text-ivory/60 text-base sm:text-lg max-w-xl">
            Browse every guide, routine, and deep-dive in the AfroPedia library.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search + category filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-light" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 text-sm bg-white rounded-full border border-ivory-dark focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta text-mahogany placeholder:text-brown-light transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brown-light hover:text-terracotta cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                !activeCategory
                  ? 'bg-terracotta text-white border-terracotta'
                  : 'bg-ivory border-ivory-dark text-brown-mid hover:border-terracotta/50'
              }`}
            >
              All
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-terracotta text-white border-terracotta'
                    : 'bg-ivory border-ivory-dark text-brown-mid hover:border-terracotta/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p className="text-sm text-brown-mid mb-6">
          <span className="font-semibold text-mahogany">{filtered.length}</span> article
          {filtered.length !== 1 ? 's' : ''}
          {activeCategory && (
            <> in <span className="text-terracotta font-medium">{activeCategory}</span></>
          )}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-14 h-14 rounded-full bg-ivory-dark flex items-center justify-center mx-auto mb-4">
              <BookOpen size={22} className="text-brown-light" />
            </div>
            <p
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              className="text-xl font-semibold text-mahogany mb-2"
            >
              No articles found
            </p>
            <p className="text-brown-mid text-sm">Try clearing your search or filter.</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory(null) }}
              className="mt-4 text-sm text-terracotta hover:underline cursor-pointer"
            >
              Clear all
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((article) => (
              <Link
                key={article.slug}
                to={`/article/${article.slug}`}
                className="group bg-white rounded-2xl border border-ivory-dark hover:border-terracotta/40 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="h-1.5 bg-gradient-to-r from-terracotta to-amber" />
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <Badge variant="default">{article.hairType}</Badge>
                    <Badge variant="muted">{article.category}</Badge>
                  </div>
                  <h3
                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                    className="font-bold text-mahogany text-lg leading-snug mb-2 group-hover:text-terracotta transition-colors line-clamp-2 flex-1"
                  >
                    {article.title}
                  </h3>
                  <p className="text-sm text-brown-mid leading-relaxed line-clamp-2 mb-4">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-ivory-dark mt-auto">
                    <span className="text-xs text-brown-light flex items-center gap-1">
                      <BookOpen size={12} />
                      {article.readTime}
                    </span>
                    <span className="text-xs text-terracotta font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
