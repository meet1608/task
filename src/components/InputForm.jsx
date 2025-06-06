import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaCalendarAlt, FaSearch } from 'react-icons/fa'
import { addDays, subMonths } from 'date-fns'

const weatherVariables = [
  { id: 'temperature_2m_max', label: 'Max Temp (2m)' },
  { id: 'temperature_2m_min', label: 'Min Temp (2m)' },
  { id: 'temperature_2m_mean', label: 'Mean Temp (2m)' },
  { id: 'apparent_temperature_max', label: 'Max Apparent Temp' },
  { id: 'apparent_temperature_min', label: 'Min Apparent Temp' },
  { id: 'apparent_temperature_mean', label: 'Mean Apparent Temp' },
]

const InputForm = ({ onSubmit, isLoading }) => {
  const today = new Date()
  const oneMonthAgo = subMonths(today, 1)

  const [formState, setFormState] = useState({
    latitude: '',
    longitude: '',
    startDate: oneMonthAgo,
    endDate: today,
    selectedVariables: ['temperature_2m_max', 'temperature_2m_min']
  })

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formState.latitude) {
      newErrors.latitude = 'Latitude is required'
    } else {
      const lat = parseFloat(formState.latitude)
      if (isNaN(lat) || lat < -90 || lat > 90) {
        newErrors.latitude = 'Latitude must be between -90 and 90'
      }
    }

    if (!formState.longitude) {
      newErrors.longitude = 'Longitude is required'
    } else {
      const lon = parseFloat(formState.longitude)
      if (isNaN(lon) || lon < -180 || lon > 180) {
        newErrors.longitude = 'Longitude must be between -180 and 180'
      }
    }

    if (!formState.startDate) {
      newErrors.startDate = 'Start date is required'
    }

    if (!formState.endDate) {
      newErrors.endDate = 'End date is required'
    }

    if (formState.startDate && formState.endDate && formState.startDate > formState.endDate) {
      newErrors.dateRange = 'End date must be after start date'
    }

    if (formState.startDate && formState.endDate) {
      const oneYearFromStart = addDays(formState.startDate, 365)
      if (formState.endDate > oneYearFromStart) {
        newErrors.dateRange = 'Maximum date range is 1 year'
      }
    }

    if (formState.selectedVariables.length === 0) {
      newErrors.selectedVariables = 'Select at least one weather variable'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date, name) => {
    setFormState(prev => ({ ...prev, [name]: date }))
  }

  const handleVariableChange = (e) => {
    const { value, checked } = e.target

    setFormState(prev => {
      if (checked) {
        return { ...prev, selectedVariables: [...prev.selectedVariables, value] }
      } else {
        return { ...prev, selectedVariables: prev.selectedVariables.filter(v => v !== value) }
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formState)
    }
  }

  return (
    <div className='bg-white shadow-md rounded-lg p-4 sm:p-6'>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Latitude Input */}
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
              Latitude
            </label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              value={formState.latitude}
              onChange={handleChange}
              step="any"
              placeholder="Enter latitude (-90 to 90)"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            />
            {errors.latitude && (
              <p className="mt-1 text-sm text-red-500">{errors.latitude}</p>
            )}
          </div>

          {/* Longitude Input */}
          <div>
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
              Longitude
            </label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              value={formState.longitude}
              onChange={handleChange}
              step="any"
              placeholder="Enter longitude (-180 to 180)"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            />
            {errors.longitude && (
              <p className="mt-1 text-sm text-red-500">{errors.longitude}</p>
            )}
          </div>

          {/* Start Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <div className="relative">
              <DatePicker
                selected={formState.startDate}
                onChange={(date) => handleDateChange(date, 'startDate')}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxDate={today}
                disabled={isLoading}
              />
              <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {errors.startDate && (
              <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>
            )}
          </div>

          {/* End Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <div className="relative">
              <DatePicker
                selected={formState.endDate}
                onChange={(date) => handleDateChange(date, 'endDate')}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxDate={today}
                disabled={isLoading}
              />
              <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {errors.endDate && (
              <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>
            )}
          </div>
        </div>

        {/* Date Range Error */}
        {errors.dateRange && (
          <p className="mt-2 text-sm text-red-500">{errors.dateRange}</p>
        )}

        {/* Weather Variables Section */}
        <div className="mt-6 sm:mt-8">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Weather Variables
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {weatherVariables.map((variable) => (
              <div key={variable.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={variable.id}
                  value={variable.id}
                  checked={formState.selectedVariables.includes(variable.id)}
                  onChange={handleVariableChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  disabled={isLoading}
                />
                <label htmlFor={variable.id} className="ml-2 text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
                  {variable.label}
                </label>
              </div>
            ))}
          </div>
          {errors.selectedVariables && (
            <p className="mt-1 text-sm text-red-500">{errors.selectedVariables}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-8 sm:mt-10 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </>
            ) : (
              <>
                <FaSearch className="mr-2" />
                Get Weather Data
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default InputForm