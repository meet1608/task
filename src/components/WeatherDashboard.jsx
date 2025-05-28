import { useState } from 'react'
import InputForm from './InputForm'
import { fetchWeatherData } from '../utils/api'
import { formatData } from '../utils/dataFormatter'

const WeatherDashboard = ({ onDataFetched }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFormSubmit = async (formData) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetchWeatherData(formData)
      const formattedData = formatData(response, formData.selectedVariables)
      
      onDataFetched(formattedData)
    } catch (err) {
      console.error('Error fetching weather data:', err)
      setError(err.message || 'Failed to fetch weather data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 ">
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Historical Weather Data
        </h2>
        <p className="text-gray-600 mb-6">
          Enter location coordinates and date range to view historical weather data.
        </p>
        
        <InputForm onSubmit={handleFormSubmit} isLoading={loading} />
      </section>
      
      {error && (
        <div className="p-4 bg-error-50 border border-error-200 rounded-md text-error-700">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  )
}

export default WeatherDashboard