import { useState, useEffect } from 'react'
import { WiDaySunny } from 'react-icons/wi'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-10 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <WiDaySunny className="text-3xl text-primary-500" />
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Weather Dashboard
          </h1>
        </div>
        <div className="text-sm md:text-base text-gray-600">
          Historical Weather Data
        </div>
      </div>
    </header>
  )
}

export default Header