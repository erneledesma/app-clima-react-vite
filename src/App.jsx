import { useState, useEffect, use } from "react"
import { useGeolocation } from './hooks/useGeolocation'
import { Card } from './components/ui/Card'
import { Skeleton } from './components/ui/Skeleton'

function App() {



  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { latitud, longitude, error: geoError } = useGeolocation()

//llamada a la api de clima

useEffect(() => {
  async function fetchWeatherData(){
    if(latitude && longitude) {
      try {
        setLoading(true)
        // En react puro hacemos la peticion directamente al API
        const apiKey = ''
        const responde = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitude}&appid=${apiKey}&units=metric`
        )

        if (!responde.ok) {
          throw new Error('Error al obtener los datos del clima')
        }
        const data = await responde.json()
        setWeatherData(data)
        setError(null)
      } catch (error) {
        setError("error al obtener los datos del clima")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }
  fetchWeatherData()
}, [latitud, longitude])


  return (
    <h1>Clima Agricola</h1>
  )
}

export default App
