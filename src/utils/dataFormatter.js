/**
 * @param {Object} apiResponse - API response from Open-Meteo
 * @param {Array} selectedVariables - Selected weather variables
 * @returns {Array} - Formatted data for display
 */
export const formatData = (apiResponse, selectedVariables) => {
  if (!apiResponse || !apiResponse.daily) {
    return []
  }
  
  const { daily } = apiResponse
  const dates = daily.time
  
  return dates.map((date, index) => {
    const dayData = { date }
    
    selectedVariables.forEach(variable => {
      if (daily[variable] && daily[variable][index] !== null && daily[variable][index] !== undefined) {
        dayData[variable] = daily[variable][index]
      } else {
        dayData[variable] = null
      }
    })
    
    return dayData
  })
}