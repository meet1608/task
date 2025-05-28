import { useMemo, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const chartColors = [
  { borderColor: 'rgba(59, 130, 246, 1)', backgroundColor: 'rgba(59, 130, 246, 0.1)' }, 
  { borderColor: 'rgba(14, 165, 233, 1)', backgroundColor: 'rgba(14, 165, 233, 0.1)' }, 
  { borderColor: 'rgba(239, 68, 68, 1)', backgroundColor: 'rgba(239, 68, 68, 0.1)' },   
  { borderColor: 'rgba(34, 197, 94, 1)', backgroundColor: 'rgba(34, 197, 94, 0.1)' },   
  { borderColor: 'rgba(168, 85, 247, 1)', backgroundColor: 'rgba(168, 85, 247, 0.1)' }, 
  { borderColor: 'rgba(245, 158, 11, 1)', backgroundColor: 'rgba(245, 158, 11, 0.1)' }  
]

const variableLabels = {
  'temperature_2m_max': 'Max Temperature (°C)',
  'temperature_2m_min': 'Min Temperature (°C)',
  'temperature_2m_mean': 'Mean Temperature (°C)',
  'apparent_temperature_max': 'Max Apparent Temp (°C)',
  'apparent_temperature_min': 'Min Apparent Temp (°C)',
  'apparent_temperature_mean': 'Mean Apparent Temp (°C)'
}

const WeatherChart = ({ data }) => {
  const [visibleVariables, setVisibleVariables] = useState(
    Object.keys(data[0]).filter(key => key !== 'date')
  )

  const toggleVariable = (variable) => {
    setVisibleVariables(prev => 
      prev.includes(variable)
        ? prev.filter(v => v !== variable)
        : [...prev, variable]
    )
  }

  const chartData = useMemo(() => {
    const labels = data.map(item => item.date)
    
    const datasets = Object.keys(data[0])
      .filter(key => key !== 'date' && visibleVariables.includes(key))
      .map((key, index) => {
        const colorIndex = index % chartColors.length
        
        return {
          label: variableLabels[key] || key,
          data: data.map(item => item[key]),
          borderColor: chartColors[colorIndex].borderColor,
          backgroundColor: chartColors[colorIndex].backgroundColor,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
          tension: 0.2,
          fill: true,
        }
      })
    
    return { labels, datasets }
  }, [data, visibleVariables])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1e293b',
        bodyColor: '#334155',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(1) + ' °C';
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          display: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)'
        },
        grid: {
          color: 'rgba(226, 232, 240, 0.5)'
        }
      }
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(data[0])
          .filter(key => key !== 'date')
          .map((variable, index) => {
            const colorIndex = index % chartColors.length
            return (
              <button
                key={variable}
                onClick={() => toggleVariable(variable)}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  visibleVariables.includes(variable)
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-gray-50 text-gray-400'
                }`}
              >
                <span 
                  className="w-3 h-3 mr-1.5 rounded-full" 
                  style={{ backgroundColor: chartColors[colorIndex].borderColor }}
                />
                {variableLabels[variable] || variable}
              </button>
            )
          })
        }
      </div>
      
      <div className="h-[400px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
}

export default WeatherChart