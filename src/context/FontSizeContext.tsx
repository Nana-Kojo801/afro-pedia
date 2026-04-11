import { createContext, useContext, useEffect, useState } from 'react'

export type FontSize = 'sm' | 'md' | 'lg'

const fontSizeValues: Record<FontSize, string> = {
  sm: '14px',
  md: '16px',
  lg: '18px',
}

interface FontSizeContextValue {
  fontSize: FontSize
  setFontSize: (size: FontSize) => void
}

const FontSizeContext = createContext<FontSizeContextValue | null>(null)

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    const stored = localStorage.getItem('afropedia-font-size')
    return (stored as FontSize) ?? 'md'
  })

  useEffect(() => {
    document.documentElement.style.fontSize = fontSizeValues[fontSize]
    localStorage.setItem('afropedia-font-size', fontSize)
  }, [fontSize])

  const setFontSize = (size: FontSize) => setFontSizeState(size)

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  )
}

export function useFontSize() {
  const ctx = useContext(FontSizeContext)
  if (!ctx) throw new Error('useFontSize must be used within FontSizeProvider')
  return ctx
}
