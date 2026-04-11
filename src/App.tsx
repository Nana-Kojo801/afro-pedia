import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Toaster } from './components/ui/Toaster'
import { HomePage } from './pages/HomePage'
import { HairTypesPage } from './pages/HairTypesPage'
import { ArticlePage } from './pages/ArticlePage'
import { ArticlesPage } from './pages/ArticlesPage'
import { GlossaryPage } from './pages/GlossaryPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ThemeProvider } from './context/ThemeContext'
import { FontSizeProvider } from './context/FontSizeContext'

function App() {
  return (
    <ThemeProvider>
      <FontSizeProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-ivory">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/hair-types" element={<HairTypesPage />} />
                <Route path="/articles" element={<ArticlesPage />} />
                <Route path="/article/:slug" element={<ArticlePage />} />
                <Route path="/glossary" element={<GlossaryPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
            <Toaster />
          </div>
        </BrowserRouter>
      </FontSizeProvider>
    </ThemeProvider>
  )
}

export default App
