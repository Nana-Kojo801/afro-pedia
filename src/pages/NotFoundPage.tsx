import { Link } from 'react-router-dom'
import { ArrowRight, Home, BookOpen } from 'lucide-react'
import { AfroPediaIcon } from '@/components/AfroPediaIcon'

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <AfroPediaIcon size={80} className="opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                className="text-4xl font-black text-terracotta"
              >
                404
              </span>
            </div>
          </div>
        </div>

        <h1
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          className="text-3xl sm:text-4xl font-bold text-mahogany mb-3"
        >
          Page Not Found
        </h1>

        <p className="text-brown-mid text-base sm:text-lg mb-8 leading-relaxed">
          This page doesn't exist — but your hair journey does. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-terracotta text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-terracotta-dark transition-colors shadow-sm"
          >
            <Home size={16} />
            Back to Home
          </Link>
          <Link
            to="/hair-types"
            className="inline-flex items-center justify-center gap-2 border-2 border-terracotta text-terracotta bg-transparent rounded-full px-6 py-3 text-sm font-medium hover:bg-terracotta hover:text-white transition-colors"
          >
            <BookOpen size={16} />
            Explore Articles
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-10 pt-8 border-t border-ivory-dark">
          <p className="text-xs text-brown-light uppercase tracking-wider mb-4">Popular pages</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: 'Hair Type Explorer', to: '/hair-types' },
              { label: 'Glossary', to: '/glossary' },
              { label: 'Porosity Guide', to: '/article/understanding-hair-porosity' },
            ].map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="text-xs text-terracotta border border-terracotta/30 rounded-full px-3 py-1.5 hover:bg-terracotta/10 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
