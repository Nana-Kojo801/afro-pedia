import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Menu, Sun, Moon } from 'lucide-react'
import { Button } from './ui/Button'
import { AfroPediaIcon } from './AfroPediaIcon'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from './ui/Sheet'
import { useTheme } from '../context/ThemeContext'
import { useFontSize, type FontSize } from '../context/FontSizeContext'

const fontSizeOptions: { value: FontSize; label: string; className: string }[] = [
  { value: 'sm', label: 'A', className: 'text-xs' },
  { value: 'md', label: 'A', className: 'text-sm' },
  { value: 'lg', label: 'A', className: 'text-base' },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { fontSize, setFontSize } = useFontSize()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      navigate('/hair-types')
    }
  }

  const navLinks = [
    { label: 'Hair Types', to: '/hair-types' },
    { label: 'Articles', to: '/articles' },
    { label: 'Glossary', to: '/glossary' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-ivory-dark shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <AfroPediaIcon size={28} className="group-hover:opacity-85 transition-opacity" />
            <span
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              className="text-xl font-bold text-mahogany tracking-tight"
            >
              Afro<span className="text-terracotta">Pedia</span>
            </span>
          </Link>

          {/* Search bar — desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-light" />
              <input
                type="text"
                placeholder="Search articles, hair types, ingredients..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-ivory rounded-full border border-ivory-dark focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta text-mahogany placeholder:text-brown-light transition-all"
              />
            </div>
          </form>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6 flex-shrink-0">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm text-brown-mid hover:text-terracotta font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Font size controls */}
            <div className="flex items-center gap-0.5" aria-label="Font size">
              {fontSizeOptions.map(({ value, label, className }) => (
                <button
                  key={value}
                  onClick={() => setFontSize(value)}
                  aria-label={`Font size ${value}`}
                  className={`${className} w-7 h-7 flex items-center justify-center rounded font-semibold transition-colors
                    ${fontSize === value
                      ? 'text-terracotta bg-terracotta/10'
                      : 'text-brown-mid hover:text-terracotta hover:bg-terracotta/10'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-8 h-8 flex items-center justify-center rounded-full text-brown-mid hover:text-terracotta hover:bg-terracotta/10 transition-colors"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <Button variant="primary" size="sm" onClick={() => navigate('/hair-types')}>
              Explore Hair Types
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-brown-mid hover:text-terracotta transition-colors rounded-lg hover:bg-ivory-dark"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Sheet drawer */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="right" className="overflow-y-auto">
          <SheetHeader>
            <div className="flex items-center gap-3">
              <AfroPediaIcon size={36} />
              <SheetTitle>
                Afro<span className="text-terracotta">Pedia</span>
              </SheetTitle>
            </div>
          </SheetHeader>

          <div className="px-6 py-5 space-y-6">
            {/* Mobile search */}
            <form onSubmit={(e) => { handleSearch(e); setMenuOpen(false) }}>
              <div className="relative">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-light" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-ivory rounded-full border border-ivory-dark focus:outline-none focus:border-terracotta text-mahogany placeholder:text-brown-light"
                />
              </div>
            </form>

            {/* Mobile nav links */}
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-brown-mid hover:bg-terracotta/10 hover:text-terracotta transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Font size + theme controls */}
            <div className="border-t border-ivory-dark pt-4 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-xs text-brown-light mr-1.5">Size</span>
                {fontSizeOptions.map(({ value, label, className }) => (
                  <button
                    key={value}
                    onClick={() => setFontSize(value)}
                    aria-label={`Font size ${value}`}
                    className={`${className} w-8 h-8 flex items-center justify-center rounded font-semibold transition-colors
                      ${fontSize === value
                        ? 'text-terracotta bg-terracotta/10'
                        : 'text-brown-mid hover:text-terracotta hover:bg-terracotta/10'
                      }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-brown-mid hover:bg-terracotta/10 hover:text-terracotta transition-colors"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
              </button>
            </div>

            <div>
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => { navigate('/hair-types'); setMenuOpen(false) }}
              >
                Explore Hair Types
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  )
}
