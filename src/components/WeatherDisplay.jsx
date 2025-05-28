import WeatherChart from './WeatherChart'
import WeatherTable from './WeatherTable'

const WeatherDisplay = ({ data, loading }) => {
  if (!data || data.length === 0) return null
  
  return (
    <section className="space-y-8 animate-fade-in">
      <h3 className="text-xl font-bold text-gray-800">
        Weather Data Results
      </h3>
      
      <div className="card p-4">
        <WeatherChart data={data} />
      </div>
      
      <div className="card">
        <WeatherTable data={data} />
      </div>
    </section>
  )
}

export default WeatherDisplay