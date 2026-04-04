import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, BookOpen, SlidersHorizontal, X, Filter } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/Sheet'
import { hairTypeArticles } from '@/data/mockData'

const porosities = ['Low', 'Medium', 'High']
const thicknesses = ['Fine', 'Medium', 'Coarse']
const scalpConditions = ['Dry', 'Oily', 'Normal']

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
        active
          ? 'bg-terracotta text-white border-terracotta shadow-sm'
          : 'bg-ivory border-ivory-dark text-brown-mid hover:border-terracotta/50 hover:text-terracotta'
      }`}
    >
      {label}
    </button>
  )
}

function FilterSection({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string
  options: string[]
  selected: string[]
  onToggle: (val: string) => void
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-brown-mid uppercase tracking-widest mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <FilterPill
            key={opt}
            label={opt}
            active={selected.includes(opt)}
            onClick={() => onToggle(opt)}
          />
        ))}
      </div>
    </div>
  )
}

export function HairTypesPage() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedPorosity, setSelectedPorosity] = useState<string[]>([])
  const [selectedThickness, setSelectedThickness] = useState<string[]>([])
  const [selectedScalp, setSelectedScalp] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('popular')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const toggle = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val])
  }

  const clearAll = () => {
    setSelectedTypes([])
    setSelectedPorosity([])
    setSelectedThickness([])
    setSelectedScalp([])
  }

  const hasFilters =
    selectedTypes.length > 0 ||
    selectedPorosity.length > 0 ||
    selectedThickness.length > 0 ||
    selectedScalp.length > 0

  const filteredArticles =
    selectedTypes.length === 0
      ? hairTypeArticles
      : hairTypeArticles.filter((a) =>
          selectedTypes.some((t) => a.tags.includes(t) || a.hairType === t)
        )

  const activeFilterCount =
    selectedTypes.length + selectedPorosity.length + selectedThickness.length + selectedScalp.length

  function SidebarContent() {
    return (
      <div className="space-y-7">
        <div className="flex items-center justify-between">
          <h3
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            className="text-lg font-bold text-mahogany flex items-center gap-2"
          >
            <SlidersHorizontal size={18} className="text-terracotta" />
            Filters
          </h3>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-xs text-terracotta hover:underline cursor-pointer"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Type 3 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-terracotta rounded-full" />
            <h4 className="text-sm font-semibold text-mahogany">Type 3</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {['3A', '3B', '3C'].map((t) => (
              <FilterPill
                key={t}
                label={t}
                active={selectedTypes.includes(t)}
                onClick={() => toggle(selectedTypes, t, setSelectedTypes)}
              />
            ))}
          </div>
        </div>

        {/* Type 4 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-amber rounded-full" />
            <h4 className="text-sm font-semibold text-mahogany">Type 4</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {['4A', '4B', '4C'].map((t) => (
              <FilterPill
                key={t}
                label={t}
                active={selectedTypes.includes(t)}
                onClick={() => toggle(selectedTypes, t, setSelectedTypes)}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-ivory-dark" />

        <FilterSection
          title="Hair Porosity"
          options={porosities}
          selected={selectedPorosity}
          onToggle={(v) => toggle(selectedPorosity, v, setSelectedPorosity)}
        />
        <FilterSection
          title="Hair Thickness"
          options={thicknesses}
          selected={selectedThickness}
          onToggle={(v) => toggle(selectedThickness, v, setSelectedThickness)}
        />
        <FilterSection
          title="Scalp Condition"
          options={scalpConditions}
          selected={selectedScalp}
          onToggle={(v) => toggle(selectedScalp, v, setSelectedScalp)}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Page header */}
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
            Hair Type Explorer
          </h1>
          <p className="text-ivory/60 text-base sm:text-lg max-w-xl">
            Filter by your hair type, porosity, and more to find articles tailored to your crown.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Mobile filter toggle row */}
        <div className="lg:hidden mb-6 flex items-center justify-between gap-3">
          <p className="text-sm text-brown-mid">
            <span className="font-semibold text-mahogany">{filteredArticles.length}</span> articles
          </p>
          <Button variant="outline" size="sm" onClick={() => setMobileSidebarOpen(true)}>
            <Filter size={14} />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-terracotta text-white text-xs flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>

        {/* Mobile filter Sheet */}
        <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
          <SheetContent side="right" className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="px-6 py-5">
              <SidebarContent />
              <Button
                variant="primary"
                className="w-full mt-8"
                onClick={() => setMobileSidebarOpen(false)}
              >
                Apply Filters
                {activeFilterCount > 0 && `(${activeFilterCount})`}
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-ivory-dark p-6 sticky top-24">
              <SidebarContent />
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {/* Active filter chips */}
            {hasFilters && (
              <div className="flex flex-wrap gap-2 mb-5">
                {[...selectedTypes, ...selectedPorosity, ...selectedThickness, ...selectedScalp].map(
                  (f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1.5 bg-terracotta/10 text-terracotta rounded-full px-3 py-1 text-xs font-medium border border-terracotta/20"
                    >
                      {f}
                      <button
                        onClick={() => {
                          if (selectedTypes.includes(f)) toggle(selectedTypes, f, setSelectedTypes)
                          if (selectedPorosity.includes(f)) toggle(selectedPorosity, f, setSelectedPorosity)
                          if (selectedThickness.includes(f)) toggle(selectedThickness, f, setSelectedThickness)
                          if (selectedScalp.includes(f)) toggle(selectedScalp, f, setSelectedScalp)
                        }}
                        className="hover:bg-terracotta/20 rounded-full p-0.5 cursor-pointer"
                      >
                        <X size={11} />
                      </button>
                    </span>
                  )
                )}
              </div>
            )}

            {/* Sort bar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-brown-mid hidden lg:block">
                Showing{' '}
                <span className="font-semibold text-mahogany">{filteredArticles.length}</span>{' '}
                articles
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-brown-light whitespace-nowrap">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-44 py-1.5 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="shortest">Shortest Read</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-ivory-dark flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={24} className="text-brown-light" />
                </div>
                <p
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  className="text-xl font-semibold text-mahogany mb-2"
                >
                  No articles found
                </p>
                <p className="text-brown-mid text-sm">
                  Try adjusting your filters to see more results.
                </p>
                <Button variant="outline" size="sm" className="mt-4" onClick={clearAll}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {filteredArticles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/article/${article.slug}`}
                    className="group bg-white rounded-2xl border border-ivory-dark hover:border-terracotta/40 hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <div className="h-1.5 bg-gradient-to-r from-terracotta to-amber" />
                    <div className="p-4 sm:p-5">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <Badge variant="default">{article.hairType}</Badge>
                        <Badge variant="muted">{article.category}</Badge>
                      </div>
                      <h3
                        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                        className="font-bold text-mahogany text-lg leading-snug mb-2 group-hover:text-terracotta transition-colors line-clamp-2"
                      >
                        {article.title}
                      </h3>
                      <p className="text-sm text-brown-mid leading-relaxed line-clamp-2 mb-4">
                        {article.description}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-ivory-dark">
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
          </main>
        </div>
      </div>
    </div>
  )
}
