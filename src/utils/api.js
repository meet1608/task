const formatDate = (date) => {
  return date.toISOString().split('T')[0]
}

/**
 * Fetch historical weather data from Open-Meteo API
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} - API response
 */
export const fetchWeatherData = async ({
  latitude,
  longitude,
  startDate,
  endDate,
  selectedVariables
}) => {
  const baseUrl = 'https://archive-api.open-meteo.com/v1/archive'
  
  const formattedStartDate = formatDate(startDate)
  const formattedEndDate = formatDate(endDate)
  
  const params = new URLSearchParams({
    latitude,
    longitude,
    start_date: formattedStartDate,
    end_date: formattedEndDate,
    daily: selectedVariables.join(','),
    timezone: 'auto'
  })
  
  const url = `${baseUrl}?${params.toString()}`
  
  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const errorMessage = errorData.reason || `HTTP error! Status: ${response.status}`
      throw new Error(errorMessage)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}