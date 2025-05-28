import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-4">
      <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
        <p>Weather data provided by Open-Meteo Historical Weather API</p>
        <p className="mt-1">© {new Date().getFullYear()} Weather Dashboard</p>
      </div>
    </footer>
  )
}

export default Footer