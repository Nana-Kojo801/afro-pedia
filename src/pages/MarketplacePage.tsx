import { useState } from 'react'
import { ShoppingCart, Star, Package, FlaskConical, Filter, ChevronRight, Tag, Truck, ShieldCheck } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { marketplaceProducts, type Product } from '../data/mockData'
import { toast } from 'sonner'

const HAIR_TYPE_FILTERS = ['All', '3A', '3B', '3C', '4A', '4B', '4C']

const CATEGORY_LABELS: Record<Product['category'], string> = {
  shampoo: 'Shampoo',
  conditioner: 'Conditioner',
  styling: 'Styling',
  oil: 'Oil',
  treatment: 'Treatment',
  kit: 'Testing Kit',
}

const accentClasses = {
  terracotta: {
    bg: 'bg-terracotta/10',
    text: 'text-terracotta',
    border: 'border-terracotta/20',
    dot: 'bg-terracotta',
  },
  amber: {
    bg: 'bg-amber/10',
    text: 'text-amber',
    border: 'border-amber/20',
    dot: 'bg-amber',
  },
  mahogany: {
    bg: 'bg-mahogany/10',
    text: 'text-mahogany',
    border: 'border-mahogany/20',
    dot: 'bg-mahogany',
  },
  brown: {
    bg: 'bg-brown-light/10',
    text: 'text-brown-mid',
    border: 'border-brown-light/20',
    dot: 'bg-brown-mid',
  },
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
          className={star <= Math.round(rating) ? 'fill-amber text-amber' : 'text-ivory-dark fill-ivory-dark'}
        />
      ))}
    </div>
  )
}

function BadgePill({ badge }: { badge: Product['badge'] }) {
  if (!badge) return null
  const styles: Record<string, string> = {
    'Best Seller': 'bg-terracotta text-white',
    'New': 'bg-amber text-mahogany',
    'Sale': 'bg-green-600 text-white',
    'Staff Pick': 'bg-mahogany text-white',
  }
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${styles[badge]}`}>
      {badge}
    </span>
  )
}

function ProductCard({ product }: { product: Product }) {
  const accent = accentClasses[product.accent]

  const handleAddToCart = () => {
    toast.success(`${product.name} added to cart!`, {
      description: `${product.brand} — $${product.price.toFixed(2)}`,
    })
  }

  return (
    <div className="bg-white rounded-2xl border border-ivory-dark hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col overflow-hidden group">
      {/* Product image area */}
      <div className={`${accent.bg} h-44 flex items-center justify-center relative flex-shrink-0`}>
        <div className={`w-20 h-20 rounded-2xl bg-white/60 border-2 ${accent.border} flex items-center justify-center`}>
          {product.category === 'kit' ? (
            <FlaskConical size={36} className={accent.text} />
          ) : product.category === 'oil' ? (
            <span className="text-3xl">🫙</span>
          ) : product.category === 'shampoo' ? (
            <span className="text-3xl">🧴</span>
          ) : product.category === 'conditioner' ? (
            <span className="text-3xl">💧</span>
          ) : product.category === 'treatment' ? (
            <span className="text-3xl">✨</span>
          ) : (
            <span className="text-3xl">💆</span>
          )}
        </div>
        {product.badge && (
          <div className="absolute top-3 left-3">
            <BadgePill badge={product.badge} />
          </div>
        )}
        {product.originalPrice && (
          <div className="absolute top-3 right-3 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </div>
        )}
      </div>

      {/* Scrolling content — grows to fill available space */}
      <div className="flex flex-col flex-1 p-4 pb-0 gap-2">
        {/* Brand + category */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-brown-light uppercase tracking-wider truncate">
            {product.brand}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${accent.bg} ${accent.text} font-medium flex-shrink-0`}>
            {CATEGORY_LABELS[product.category]}
          </span>
        </div>

        {/* Name — fixed 2-line height so cards align */}
        <h3
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          className="text-mahogany font-semibold text-base leading-snug line-clamp-2 min-h-[2.75rem]"
        >
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-brown-light text-xs leading-relaxed line-clamp-2">{product.description}</p>

        {/* Hair types */}
        <div className="flex flex-wrap gap-1">
          {product.hairTypes.map((ht) => (
            <Badge key={ht} variant="muted" className="text-[10px] px-2 py-0">
              {ht}
            </Badge>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-brown-light">
            {product.rating.toFixed(1)} ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Benefits */}
        <ul className="space-y-1">
          {product.benefits.slice(0, 2).map((b) => (
            <li key={b} className="flex items-start gap-1.5 text-xs text-brown-mid">
              <span className={`w-1.5 h-1.5 rounded-full ${accent.dot} mt-1 flex-shrink-0`} />
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Price + CTA — always anchored to the card bottom */}
      <div className="p-4 pt-3 mt-3 border-t border-ivory-dark flex items-center justify-between gap-2 flex-shrink-0">
        <div className="flex items-baseline gap-1.5 min-w-0">
          <span
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            className="text-xl font-bold text-mahogany"
          >
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-brown-light line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={handleAddToCart}
          className="flex items-center gap-1.5 flex-shrink-0 whitespace-nowrap"
        >
          <ShoppingCart size={13} />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

function TestingKitCard({ product }: { product: Product }) {
  const accent = accentClasses[product.accent]

  const handleAddToCart = () => {
    toast.success(`${product.name} added to cart!`, {
      description: `${product.brand} — $${product.price.toFixed(2)}`,
    })
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-terracotta/20 hover:border-terracotta/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden">
      <div className={`${accent.bg} p-6 flex items-start gap-4`}>
        <div className={`w-14 h-14 rounded-xl bg-white/60 border ${accent.border} flex items-center justify-center flex-shrink-0`}>
          <FlaskConical size={28} className={accent.text} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-bold text-brown-light uppercase tracking-wider">{product.brand}</span>
            {product.badge && <BadgePill badge={product.badge} />}
          </div>
          <h3
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            className="text-mahogany font-bold text-lg leading-snug"
          >
            {product.name}
          </h3>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 gap-4">
        <p className="text-brown-mid text-sm leading-relaxed">{product.description}</p>

        <div className="grid grid-cols-2 gap-2">
          {product.benefits.map((b) => (
            <div key={b} className="flex items-start gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${accent.dot} mt-1.5 flex-shrink-0`} />
              <span className="text-xs text-brown-mid leading-snug">{b}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-1">
          <StarRating rating={product.rating} />
          <span className="text-xs text-brown-light">{product.rating.toFixed(1)} ({product.reviewCount.toLocaleString()} reviews)</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-ivory-dark">
          <div>
            <span
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              className="text-2xl font-bold text-mahogany"
            >
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-brown-light line-through ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button variant="primary" size="md" onClick={handleAddToCart} className="flex items-center gap-2">
            <ShoppingCart size={15} />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export function MarketplacePage() {
  const [activeHairType, setActiveHairType] = useState('All')
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const kits = marketplaceProducts.filter((p) => p.category === 'kit')
  const nonKitProducts = marketplaceProducts.filter((p) => p.category !== 'kit')

  const categoryOptions = ['All', 'Shampoo', 'Conditioner', 'Styling', 'Oil', 'Treatment']

  const filteredProducts = nonKitProducts.filter((p) => {
    const hairMatch =
      activeHairType === 'All' ||
      p.hairTypes.includes(activeHairType) ||
      p.hairTypes.includes('All Types')
    const catMatch =
      activeCategory === 'All' ||
      CATEGORY_LABELS[p.category] === activeCategory
    return hairMatch && catMatch
  })

  return (
    <div className="min-h-screen bg-ivory">
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="bg-mahogany text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-2 text-terracotta text-sm font-medium mb-4">
            <span>Home</span>
            <ChevronRight size={14} />
            <span>Marketplace</span>
          </div>
          <h1
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
          >
            The Afro
            <span className="text-terracotta">Pedia</span> Shop
          </h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            Carefully curated products matched to your specific hair type — from deep conditioners to
            professional testing kits that reveal exactly what your curls and coils need.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { icon: <Truck size={16} />, label: 'Free shipping over $50' },
              { icon: <ShieldCheck size={16} />, label: 'Satisfaction guaranteed' },
              { icon: <Tag size={16} />, label: 'Curated for natural hair' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/60 text-sm">
                <span className="text-terracotta">{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* ── Hair Type Testing Kits ─────────────────────────────────────────── */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-10 h-10 rounded-xl bg-terracotta/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <FlaskConical size={20} className="text-terracotta" />
            </div>
            <div>
              <h2
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                className="text-2xl sm:text-3xl font-bold text-mahogany"
              >
                Find Your Hair Type
              </h2>
              <p className="text-brown-light mt-1 text-sm sm:text-base max-w-2xl">
                Not sure of your curl pattern, porosity, or hair needs? Our testing kits give you the
                science-backed answers — so every product you choose actually works for your hair.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kits.map((kit) => (
              <TestingKitCard key={kit.id} product={kit} />
            ))}
          </div>
        </section>

        {/* ── Divider ─────────────────────────────────────────────────────────── */}
        <div className="border-t border-ivory-dark" />

        {/* ── Product Catalogue ─────────────────────────────────────────────── */}
        <section>
          <div className="flex items-start gap-4 mb-8">
            <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Package size={20} className="text-amber" />
            </div>
            <div>
              <h2
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                className="text-2xl sm:text-3xl font-bold text-mahogany"
              >
                Shop by Hair Type
              </h2>
              <p className="text-brown-light mt-1 text-sm sm:text-base">
                Filter products curated specifically for your curl pattern and texture.
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Hair type tabs */}
            <div className="flex items-center gap-1 flex-wrap">
              <Filter size={14} className="text-brown-light mr-1 flex-shrink-0" />
              {HAIR_TYPE_FILTERS.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveHairType(type)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    activeHairType === type
                      ? 'bg-terracotta text-white shadow-sm'
                      : 'bg-white text-brown-mid border border-ivory-dark hover:border-terracotta hover:text-terracotta'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Category filter */}
            <div className="flex items-center gap-1 flex-wrap sm:ml-auto">
              {categoryOptions.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-mahogany text-white shadow-sm'
                      : 'bg-white text-brown-mid border border-ivory-dark hover:border-mahogany hover:text-mahogany'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products count */}
          <p className="text-sm text-brown-light mb-6">
            Showing <span className="font-semibold text-mahogany">{filteredProducts.length}</span> product
            {filteredProducts.length !== 1 ? 's' : ''}
            {activeHairType !== 'All' ? ` for ${activeHairType} hair` : ''}
            {activeCategory !== 'All' ? ` · ${activeCategory}` : ''}
          </p>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-ivory-dark">
              <Package size={40} className="text-ivory-dark mx-auto mb-3" />
              <p className="text-brown-mid font-medium">No products match these filters</p>
              <p className="text-brown-light text-sm mt-1">Try adjusting your hair type or category selection</p>
              <button
                onClick={() => { setActiveHairType('All'); setActiveCategory('All') }}
                className="mt-4 text-terracotta text-sm font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* ── Bottom CTA ──────────────────────────────────────────────────────── */}
        <div className="bg-terracotta rounded-2xl p-8 sm:p-12 text-white text-center">
          <h2
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            className="text-2xl sm:text-3xl font-bold mb-3"
          >
            Not sure where to start?
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto text-sm sm:text-base">
            Take one of our hair type testing kits and get a personalised product recommendation
            report based on your exact curl pattern, porosity, and scalp health.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-terracotta"
            onClick={() => {
              const kitsSection = document.getElementById('kits-section')
              kitsSection?.scrollIntoView({ behavior: 'smooth' })
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <FlaskConical size={16} className="mr-2" />
            Browse Testing Kits
          </Button>
        </div>
      </div>
    </div>
  )
}
