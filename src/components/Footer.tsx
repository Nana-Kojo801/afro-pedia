import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { AfroPediaIcon } from './AfroPediaIcon'

export function Footer() {
  return (
    <footer className="bg-mahogany text-ivory/80 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <AfroPediaIcon size={20} />
              <span
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                className="text-xl font-bold text-ivory"
              >
                Afro<span className="text-amber">Pedia</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-ivory/60 max-w-sm">
              Your comprehensive knowledge base for African hair care. Rooted in culture, backed by science, written for your crown.
            </p>
            <div className="flex items-center gap-1.5 mt-6 text-xs text-ivory/40">
              <span>Made with</span>
              <Heart size={12} className="text-terracotta fill-terracotta" />
              <span>for every curl, coil, and loc</span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              className="text-xs font-semibold text-ivory mb-4 uppercase tracking-wider"
            >
              Explore
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: '4C Hair', to: '/hair-types' },
                { label: 'Locs', to: '/hair-types' },
                { label: 'Protective Styles', to: '/hair-types' },
                { label: 'Natural Oils', to: '/hair-types' },
                { label: 'Scalp Care', to: '/hair-types' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-ivory/60 hover:text-amber transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              className="text-xs font-semibold text-ivory mb-4 uppercase tracking-wider"
            >
              Resources
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Hair Type Guide', to: '/hair-types' },
                { label: 'Glossary', to: '/glossary' },
                { label: 'Porosity Test', to: '/article/understanding-hair-porosity' },
                { label: 'Beginner\'s Journey', to: '/article/starter-locs-guide' },
                { label: 'All Articles', to: '/articles' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-ivory/60 hover:text-amber transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-ivory/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ivory/40">© 2024 AfroPedia. All rights reserved.</p>
          <p className="text-xs text-ivory/40 italic" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>Know Your Crown.</p>
        </div>
      </div>
    </footer>
  )
}
