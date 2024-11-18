import React, { useState } from 'react'
import { Search, MapPin, Zap, Compass } from 'lucide-react'
import { useLanguage, LanguageProvider } from './contexts/LanguageContext'
import LanguageSwitcher from './components/LanguageSwitcher'
import SearchResults from './components/SearchResults'
import { mockSearch, SearchResult } from './data/searchData'

const AppContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { language, t } = useLanguage()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsLoading(true)
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500))
      const results = mockSearch(searchQuery)
      setSearchResults(results)
    } catch (error) {
      console.error('Search failed:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const isRTL = language === 'he'

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 ${isRTL ? 'rtl' : 'ltr'}`}>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="https://easy.co.il/assets/images/easy-share-icon.png" alt="Easy Logo" className="h-10 w-auto mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">{t('app.title')}</h1>
          </div>
          <nav className="flex items-center">
            <a href="#features" className="text-gray-600 hover:text-blue-600 mx-4">{t('nav.features')}</a>
            <a href="#demo" className="text-gray-600 hover:text-blue-600 mx-4">{t('nav.demo')}</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 mx-4">{t('nav.about')}</a>
            <LanguageSwitcher />
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('hero.title')}</h2>
          <p className="text-xl text-gray-600 mb-8">{t('hero.subtitle')}</p>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex">
            <input
              type="text"
              placeholder={t('search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-4 py-2 rounded-l-lg border-2 border-blue-300 focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition duration-300">
              <Search className="h-5 w-5" />
            </button>
          </form>
          <SearchResults results={searchResults} isLoading={isLoading} />
        </section>

        <section id="features" className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <MapPin className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t('feature.location.title')}</h3>
            <p className="text-gray-600">{t('feature.location.description')}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Zap className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t('feature.speed.title')}</h3>
            <p className="text-gray-600">{t('feature.speed.description')}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Compass className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t('feature.explore.title')}</h3>
            <p className="text-gray-600">{t('feature.explore.description')}</p>
          </div>
        </section>

        <section id="demo" className="bg-white p-8 rounded-lg shadow-md mb-16">
          <h2 className="text-3xl font-bold mb-4">{t('demo.title')}</h2>
          <p className="text-gray-600 mb-4">{t('demo.description')}</p>
          <ul className="list-disc list-inside text-blue-600">
            <li className="mb-2"><button className="hover:underline" onClick={() => setSearchQuery(t('demo.example1'))}>{t('demo.example1')}</button></li>
            <li className="mb-2"><button className="hover:underline" onClick={() => setSearchQuery(t('demo.example2'))}>{t('demo.example2')}</button></li>
            <li><button className="hover:underline" onClick={() => setSearchQuery(t('demo.example3'))}>{t('demo.example3')}</button></li>
          </ul>
        </section>

        <section id="about" className="text-center">
          <h2 className="text-3xl font-bold mb-4">{t('about.title')}</h2>
          <p className="text-gray-600 mb-4">{t('about.description')}</p>
          <a href="https://www.easy.co.il" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">{t('about.cta')}</a>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App