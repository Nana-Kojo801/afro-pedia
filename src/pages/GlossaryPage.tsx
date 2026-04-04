import { useState, useMemo } from 'react'
import { Search, X, BookOpen, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AfroPediaIcon } from '@/components/AfroPediaIcon'
import { Badge } from '@/components/ui/Badge'

interface GlossaryTerm {
  term: string
  definition: string
  relatedSlug?: string
  relatedLabel?: string
  tags?: string[]
}

const glossaryTerms: GlossaryTerm[] = [
  // A
  {
    term: 'ACV Rinse',
    definition:
      'An apple cider vinegar rinse is a diluted solution (typically 1–2 tablespoons ACV in 2 cups water) used after conditioning. The mild acidity helps close the hair cuticle, balance scalp pH, remove product buildup, and reduce frizz. It is particularly beneficial for high porosity hair and those dealing with scalp issues like dandruff.',
    tags: ['Moisture', 'Scalp'],
  },
  // B
  {
    term: 'Banding',
    definition:
      'A heat-free stretching method where hair ties or bands are placed at intervals down the length of a twist or braid, pulling the hair taut as it dries. Banding reduces shrinkage and elongates 4B/4C hair without causing heat damage. It\'s often used to make detangling, styling, or trimming easier on longer natural hair.',
    tags: ['Styling', '4C'],
  },
  {
    term: 'Big Chop',
    definition:
      'The act of cutting off all chemically relaxed, heat-damaged, or colour-treated hair in one go to start fresh with completely natural hair growth. The big chop is both a practical decision and, for many, a deeply personal and empowering milestone in the natural hair journey. The result is often a very short Teeny Weeny Afro (TWA).',
    relatedSlug: 'starter-locs-guide',
    relatedLabel: 'Starting Your Natural Journey',
    tags: ['Beginner', 'Transitioning'],
  },
  // C
  {
    term: 'Clarifying',
    definition:
      'Clarifying refers to using a clarifying or chelating shampoo to perform a deep cleanse that removes stubborn product buildup, mineral deposits, and sebum accumulation that regular shampoo cannot fully lift. It is recommended once a month or whenever hair feels weighed down, dull, or stops responding to products as expected.',
    tags: ['Scalp', 'Wash Day'],
  },
  {
    term: 'Co-wash',
    definition:
      'Co-washing (conditioner washing) is the practice of cleansing the hair with a lightweight conditioner instead of shampoo. It preserves the hair\'s natural oils while removing light dirt and sweat, making it a popular choice for highly coiled hair types that are prone to dryness. Co-washing is best done between shampoo wash days rather than as a full replacement.',
    relatedSlug: 'understanding-hair-porosity',
    relatedLabel: 'Understanding Hair Porosity',
    tags: ['Moisture', 'Wash Day'],
  },
  // D
  {
    term: 'Deep Conditioning',
    definition:
      'A deep conditioning treatment uses a rich, protein- or moisture-heavy conditioner left on the hair for an extended period (typically 20–45 minutes) to thoroughly penetrate and restore the hair shaft. Regular deep conditioning — ideally once a week or every two weeks — is essential for maintaining soft, elastic, and well-hydrated natural hair. Heat amplifies the results.',
    relatedSlug: 'understanding-hair-porosity',
    relatedLabel: 'Understanding Hair Porosity',
    tags: ['Moisture', '4C'],
  },
  {
    term: 'Detangling',
    definition:
      'Detangling is the process of removing knots, tangles, and shed hair from natural hair to prevent matting and breakage. It should always be done on wet or damp hair that is saturated with conditioner, working from ends to roots with fingers or a wide-tooth comb. Natural hair with tight curl patterns (3C–4C) benefits most from finger detangling to minimise unnecessary breakage.',
    tags: ['4C', 'Beginner'],
  },
  // E
  {
    term: 'Elasticity',
    definition:
      'Hair elasticity is the hair\'s ability to stretch under tension and then return to its original shape without breaking. Healthy hair can stretch up to 30% of its length when wet. Low elasticity — often caused by protein deficiency or extreme moisture overload — causes hair to feel mushy when wet or snap easily. A proper moisture-protein balance is the key to maintaining good elasticity.',
    tags: ['Hair Science', 'Protein'],
  },
  {
    term: 'Emollient',
    definition:
      'Emollients are ingredients that soften and smooth the hair cuticle by filling in microscopic gaps, reducing roughness and frizz. Common emollients include fatty alcohols (cetyl, stearyl), plant butters (shea, mango), and certain oils (jojoba, argan). Unlike occlusives, emollients actually condition the hair fibre rather than just coating it.',
    relatedSlug: 'castor-oil-benefits',
    relatedLabel: 'Natural Oils Guide',
    tags: ['Oils', 'Ingredients'],
  },
  // H
  {
    term: 'Hair Density',
    definition:
      'Hair density refers to the number of individual hair strands per square inch of scalp. It is separate from hair thickness or texture. High density hair appears full and voluminous; low density hair can look thin even if each individual strand is coarse. Density affects how much product to use and which protective styles will lay flat versus stand upright.',
    tags: ['Hair Science'],
  },
  {
    term: 'Humectant',
    definition:
      'Humectants are hygroscopic ingredients that attract and draw water molecules from the surrounding environment — or from deeper within the hair shaft — into the cortex. Common humectants include glycerin, aloe vera, honey, and panthenol. In high-humidity environments they are excellent; in low-humidity or dry climates they can backfire by pulling moisture out of the hair instead.',
    tags: ['Moisture', 'Ingredients'],
  },
  {
    term: 'Hygral Fatigue',
    definition:
      'Hygral fatigue is structural damage caused by repeated cycles of the hair shaft swelling when wet and contracting when dry. It is most common in high porosity hair or hair that is washed very frequently without protective measures. Symptoms include chronic mushy texture when wet, excess elasticity loss, and increased breakage. Pre-pooing with oils before washing provides significant protection.',
    relatedSlug: 'understanding-hair-porosity',
    relatedLabel: 'Understanding Hair Porosity',
    tags: ['Hair Science', 'High Porosity'],
  },
  // L
  {
    term: 'LCO Method',
    definition:
      'The LCO method (Liquid, Cream, Oil) is a moisture layering technique where a water-based liquid is applied first, followed by a moisturising cream, and sealed with an oil. This sequence is typically recommended for low porosity hair, as the cream creates a layer before the oil that can help prevent the oil from blocking moisture absorption. Compare with the LOC method.',
    tags: ['Moisture', 'Low Porosity'],
  },
  {
    term: 'LOC Method',
    definition:
      'The LOC method (Liquid, Oil, Cream) layers moisture in a specific order: first a water-based liquid or leave-in, then an oil to seal, then a cream or butter as the final sealant. This sequence is widely used for medium and high porosity hair. The oil layer traps the water inside the hair shaft before the cream provides additional sealing and hold.',
    relatedSlug: 'loc-method-guide',
    relatedLabel: 'The LOC Method: Done Right',
    tags: ['Moisture', '4C'],
  },
  {
    term: 'Low Manipulation',
    definition:
      'Low manipulation refers to styling and handling hair as infrequently as possible to reduce mechanical damage. This includes avoiding daily re-styling, excessive combing, or tight pulling. Low manipulation styles — like twist-outs, braid-outs, and wash-and-gos — are left in for several days before being re-done. The less you touch your hair, the less breakage occurs over time.',
    tags: ['Protective Styles', 'Growth'],
  },
  // M
  {
    term: 'Moisture-Protein Balance',
    definition:
      'The moisture-protein balance is the equilibrium between the hydration level and structural protein content of the hair shaft. Too much moisture without protein creates soft, weak, overly elastic hair that breaks when stretched. Too much protein without moisture creates stiff, brittle hair that snaps easily. Signs of imbalance include mushy texture, excessive tangles, or hard, rigid strands.',
    relatedSlug: 'understanding-hair-porosity',
    relatedLabel: 'Understanding Hair Porosity',
    tags: ['Hair Science', 'Moisture', 'Protein'],
  },
  // O
  {
    term: 'Occlusive',
    definition:
      'Occlusives are thick, heavy ingredients that create a physical barrier over the hair shaft to prevent moisture from escaping. Unlike humectants (which attract moisture) or emollients (which smooth), occlusives simply lock in what is already there. Petrolatum, shea butter, castor oil, and beeswax are classic occlusives. They are most beneficial for high porosity hair that loses moisture rapidly.',
    relatedSlug: 'castor-oil-benefits',
    relatedLabel: 'Natural Oils Guide',
    tags: ['Moisture', 'Ingredients', 'Oils'],
  },
  // P
  {
    term: 'Porosity',
    definition:
      'Hair porosity describes how easily the hair cuticle allows water and other substances to pass through. It is determined by the spacing and elevation of the cuticle scales. Low porosity hair has flat, tightly overlapping scales; high porosity hair has gaps or raised scales. Porosity dictates which products, methods, and frequencies of treatment will work best for your hair.',
    relatedSlug: 'understanding-hair-porosity',
    relatedLabel: 'Understanding Hair Porosity',
    tags: ['Hair Science', 'Beginner'],
  },
  {
    term: 'Porosity Float Test',
    definition:
      'A simple DIY test to approximate hair porosity: take a strand of clean, product-free hair and drop it into a glass of room-temperature water. If it floats for several minutes, porosity is likely low. If it sinks slowly to the mid-section, porosity is medium. If it sinks immediately, porosity is high. Results can vary with residue or freshly washed hair, so test multiple strands.',
    relatedSlug: 'understanding-hair-porosity',
    relatedLabel: 'Understanding Hair Porosity',
    tags: ['Hair Science'],
  },
  {
    term: 'Pre-Poo',
    definition:
      'A pre-poo (pre-shampoo treatment) involves applying a conditioning agent — typically an oil, butter, or conditioner — to dry hair before shampooing. This protective layer prevents the shampoo from stripping too much natural moisture and helps reduce hygral fatigue. Coconut oil is the most popular pre-poo for its ability to penetrate the hair shaft and protect from the inside out.',
    tags: ['Wash Day', 'Moisture'],
  },
  {
    term: 'Protein Treatment',
    definition:
      'A protein treatment replenishes the keratin and amino acid content of the hair shaft, which can be depleted by chemical processing, heat damage, or mechanical stress. Treatments range from light (rice water rinse, keratin conditioner) to heavy (Aphogee Two-Step). High porosity hair generally needs protein treatments regularly; healthy low porosity hair should use them sparingly as excess protein causes stiffness.',
    tags: ['Protein', 'Hair Science'],
  },
  {
    term: 'Protective Style',
    definition:
      'A protective style tucks the ends of the hair away to minimise manipulation, prevent environmental damage, and retain length. Examples include braids, twists, buns, updos, and wigs. The key is maintaining moisture underneath — protective styles that are left in too long without moisturising can actually cause breakage. Scalp care continues even while protective styles are worn.',
    relatedSlug: 'protective-styles-retention',
    relatedLabel: 'How Protective Styles Retain Length',
    tags: ['Protective Styles', 'Growth'],
  },
  // S
  {
    term: 'Scalp Sebum',
    definition:
      'Sebum is the natural oil produced by the sebaceous glands attached to each hair follicle. It lubricates and waterproofs the hair, protects the scalp\'s acid mantle, and has mild antimicrobial properties. Tightly coiled hair types often have sebum distribution challenges because the oil cannot travel easily down the spiralled hair shaft, making the roots oilier while the lengths remain dry.',
    tags: ['Scalp', 'Hair Science'],
  },
  {
    term: 'Sealing',
    definition:
      'Sealing refers to applying an oil or butter as the final step in a moisturising routine to lock moisture inside the hair shaft. Effective sealants include castor oil, shea butter, jojoba oil, and avocado oil. Sealing is the critical last step of the LOC or LCO method. Without sealing, water-based moisture evaporates quickly, especially in high porosity hair.',
    relatedSlug: 'castor-oil-benefits',
    relatedLabel: 'Natural Oils Guide',
    tags: ['Moisture', 'Oils'],
  },
  {
    term: 'Shedding vs. Breakage',
    definition:
      'Shedding is the natural release of hair at the end of its growth cycle — shed hairs always have a white bulb at the root and typically measure full strand length. Breakage is damage-related hair loss that occurs mid-shaft, leaving short pieces without a bulb. Healthy hair sheds 50–100 strands daily. Excessive breakage (no bulb, short pieces, fuzzy ends) signals a need for protein, better detangling technique, or reduced tension.',
    tags: ['Hair Science', 'Beginner'],
  },
  {
    term: 'Shrinkage',
    definition:
      'Shrinkage is the visible shortening of natural hair as it dries, caused by the curl or coil pattern contracting. Type 4C hair can shrink 70–80% of its actual length. While often misread as a lack of growth, shrinkage is a sign of healthy moisture and curl elasticity. Stretching techniques like banding, twist-outs, and flexi-rods reduce shrinkage without heat.',
    tags: ['4C', 'Hair Science'],
  },
  {
    term: 'Single-Strand Knots',
    definition:
      'Single-strand knots (SSKs), sometimes called fairy knots, are tiny knots that form when a single curly hair strand loops around itself during normal movement. They are more common in shorter, tightly coiled textures like 4B and 4C. While some SSKs are unavoidable, keeping hair stretched, sealing ends well, and sleeping on satin reduce their frequency. Severely knotted ends may need to be trimmed.',
    tags: ['4C', '4B'],
  },
  // T
  {
    term: 'Transitioning',
    definition:
      'Transitioning is the process of growing out relaxed, texturised, or chemically treated hair without doing a big chop. The goal is to gradually replace the processed hair with natural growth. It involves managing two very different textures simultaneously and usually requires intensive conditioning, protective styling, and careful detangling at the line of demarcation — where new growth meets processed hair.',
    tags: ['Beginner', 'Protective Styles'],
  },
  {
    term: 'TWA (Teeny Weeny Afro)',
    definition:
      'A TWA is a very short natural hairstyle, typically less than two inches in length, that often results from a big chop. Far from being a limiting style, TWAs are versatile and celebrated as a bold statement of natural beauty. Caring for a TWA involves keeping the scalp moisturised, using lightweight products to avoid buildup, and embracing the texture in its most unmanipulated form.',
    tags: ['Beginner', '4C'],
  },
  // W
  {
    term: 'Wash Day',
    definition:
      'Wash day is the dedicated session — typically weekly or bi-weekly for natural hair — when the full hair care routine is completed: pre-poo, shampoo, deep condition, detangle, style, and seal. Natural hair, especially type 4, often requires several hours to complete wash day thoroughly. Many naturalistas treat wash day as self-care ritual, preparing in advance with sectioned hair and all products within reach.',
    relatedSlug: '4c-wash-day-routine',
    relatedLabel: '4C Wash Day Routine',
    tags: ['Wash Day', 'Beginner'],
  },
]

function groupByLetter(terms: GlossaryTerm[]) {
  const groups: Record<string, GlossaryTerm[]> = {}
  for (const t of terms) {
    const letter = t.term[0].toUpperCase()
    if (!groups[letter]) groups[letter] = []
    groups[letter].push(t)
  }
  return groups
}

export function GlossaryPage() {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return glossaryTerms
    return glossaryTerms.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        t.tags?.some((tag) => tag.toLowerCase().includes(q))
    )
  }, [search])

  const grouped = useMemo(() => groupByLetter(filtered), [filtered])
  const letters = Object.keys(grouped).sort()
  const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

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
        <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-terracotta/10 -translate-y-1/3 translate-x-1/3" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <AfroPediaIcon size={24} />
            <p className="text-amber text-xs sm:text-sm font-semibold uppercase tracking-widest">
              Reference
            </p>
          </div>
          <h1
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory mb-3"
          >
            Hair Care Glossary
          </h1>
          <p className="text-ivory/60 text-base sm:text-lg max-w-xl">
            {glossaryTerms.length} essential terms for your natural hair journey — from ACV rinse to
            wash day.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search */}
        <div className="relative mb-8">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-light"
          />
          <input
            type="text"
            placeholder="Search terms, definitions, or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-10 py-3 text-sm bg-white rounded-2xl border border-ivory-dark focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta text-mahogany placeholder:text-brown-light shadow-sm transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-brown-light hover:text-terracotta transition-colors cursor-pointer"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Alpha jump links */}
        {!search && (
          <div className="flex flex-wrap gap-1.5 mb-10 pb-6 border-b border-ivory-dark">
            {allLetters.map((l) => {
              const active = letters.includes(l)
              return (
                <a
                  key={l}
                  href={active ? `#letter-${l}` : undefined}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${
                    active
                      ? 'bg-terracotta text-white hover:bg-terracotta-dark cursor-pointer shadow-sm'
                      : 'bg-ivory-dark text-brown-light cursor-default opacity-50'
                  }`}
                  aria-disabled={!active}
                >
                  {l}
                </a>
              )
            })}
          </div>
        )}

        {/* Search results count */}
        {search && (
          <p className="text-sm text-brown-mid mb-6">
            {filtered.length === 0 ? (
              <>No terms match &ldquo;<strong className="text-mahogany">{search}</strong>&rdquo;</>
            ) : (
              <>
                <strong className="text-mahogany">{filtered.length}</strong> term
                {filtered.length !== 1 ? 's' : ''} match &ldquo;
                <strong className="text-mahogany">{search}</strong>&rdquo;
              </>
            )}
          </p>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="w-14 h-14 rounded-full bg-ivory-dark flex items-center justify-center mx-auto mb-4">
              <BookOpen size={22} className="text-brown-light" />
            </div>
            <p
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              className="text-xl font-semibold text-mahogany mb-2"
            >
              No terms found
            </p>
            <p className="text-brown-mid text-sm">Try a different search term.</p>
            <button
              onClick={() => setSearch('')}
              className="mt-4 text-sm text-terracotta hover:underline cursor-pointer"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Grouped terms */}
        <div className="space-y-12">
          {letters.map((letter) => (
            <section key={letter} id={`letter-${letter}`} className="scroll-mt-20">
              {/* Letter heading */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-terracotta flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span
                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                    className="text-white text-lg font-bold"
                  >
                    {letter}
                  </span>
                </div>
                <div className="h-px flex-1 bg-ivory-dark" />
                <span className="text-xs text-brown-light flex-shrink-0">
                  {grouped[letter].length} term{grouped[letter].length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Terms */}
              <div className="space-y-4">
                {grouped[letter].map((item) => (
                  <div
                    key={item.term}
                    className="bg-white rounded-2xl border border-ivory-dark p-5 sm:p-6 hover:border-terracotta/30 transition-colors group"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <h3
                        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                        className="text-lg sm:text-xl font-bold text-mahogany group-hover:text-terracotta transition-colors"
                      >
                        {item.term}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags?.map((tag) => (
                          <Badge key={tag} variant="muted">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-brown-mid leading-relaxed">{item.definition}</p>

                    {item.relatedSlug && (
                      <div className="mt-4 pt-3 border-t border-ivory-dark">
                        <Link
                          to={`/article/${item.relatedSlug}`}
                          className="inline-flex items-center gap-1.5 text-xs text-terracotta font-semibold hover:gap-2.5 transition-all"
                        >
                          <BookOpen size={12} />
                          See article: {item.relatedLabel}
                          <ArrowRight size={12} />
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom CTA */}
        {!search && (
          <div className="mt-16 bg-terracotta/10 border border-terracotta/20 rounded-2xl p-6 sm:p-8 text-center">
            <p
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              className="text-xl font-bold text-mahogany mb-2"
            >
              Ready to put this knowledge to use?
            </p>
            <p className="text-sm text-brown-mid mb-5">
              Explore articles tailored to your hair type and build your perfect routine.
            </p>
            <Link
              to="/hair-types"
              className="inline-flex items-center gap-2 bg-terracotta text-white rounded-full px-6 py-2.5 text-sm font-medium hover:bg-terracotta-dark transition-colors shadow-sm"
            >
              Explore Hair Types
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
