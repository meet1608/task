import { useState } from 'react'
import Header from './components/Header'
import WeatherDashboard from './components/WeatherDashboard'
import WeatherDisplay from './components/WeatherDisplay'
import Footer from './components/Footer'

function App() {
  const [showResults, setShowResults] = useState(false)
  const [weatherData, setWeatherData] = useState(null)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {!showResults ? (
          <WeatherDashboard 
            onDataFetched={(data) => {
              setWeatherData(data)
              setShowResults(true)
            }}
          />
        ) : (
          <div>
            <button
              onClick={() => setShowResults(false)}
              className="mb-6 btn-secondary"
            >
              ← Back to Search
            </button>
            <WeatherDisplay data={weatherData} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App