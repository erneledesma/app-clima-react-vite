"use client"

import { useState, useEffect } from "react"
import { useGeolocation } from "./hooks/useGeolocation"
import { Card } from "./components/ui/Card"
import { Skeleton } from "./components/ui/Skeleton"
import { Cloud, Droplets, Thermometer, Wind } from "./components/icons"

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { latitude, longitude, error: geoError } = useGeolocation()

  useEffect(() => {
    async function fetchWeatherData() {
      if (latitude && longitude) {
        try {
          setLoading(true)
          const apiKey = "438bb6e763a1efc0d729770ca5186754"
          const response = await fetch(
            `https://api.agromonitoring.com/agro/1.0/weather?appid=${apiKey}&lat=${latitude}&lon=${longitude}&units=metric`,
          )

          if (!response.ok) {
            throw new Error("No se pudo obtener los datos del clima")
          }

          const data = await response.json()
          setWeatherData(data)
          setError(null)
        } catch (err) {
          setError("Error al cargar los datos del clima")
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchWeatherData()
  }, [latitude, longitude])

  return (
    <main className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Clima Agrícola</h1>

        {geoError && (
          <div className="bg-red-900/50 border border-red-700 p-4 rounded-lg mb-6">
            <p>Error de geolocalización: {geoError}</p>
            <p>Usando coordenadas predeterminadas.</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 border border-red-700 p-4 rounded-lg mb-6">
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tarjeta de Temperatura */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-orange-500" />
                Temperatura
              </div>
            }
            description="Condiciones actuales"
          >
            {loading ? (
              <Skeleton className="h-20 w-full bg-gray-800" />
            ) : weatherData ? (
              <div className="space-y-2">
                <div className="text-4xl font-bold text-white">{Math.round(weatherData.main.temp)}°C</div>
                <div className="text-sm text-gray-400">
                  Sensación térmica: {Math.round(weatherData.main.feels_like)}°C
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                    alt={weatherData.weather[0].description}
                    className="h-10 w-10"
                  />
                  <span className="capitalize">{weatherData.weather[0].description}</span>
                </div>
              </div>
            ) : null}
          </Card>

          {/* Tarjeta de Humedad */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                Humedad
              </div>
            }
            description="Nivel de humedad en el aire"
          >
            {loading ? (
              <Skeleton className="h-20 w-full bg-gray-800" />
            ) : weatherData ? (
              <div className="space-y-2">
                <div className="text-4xl font-bold text-white">{weatherData.main.humidity}%</div>
                <div className="text-sm text-gray-400">
                  {weatherData.main.humidity < 30
                    ? "Muy seco - Considere riego adicional"
                    : weatherData.main.humidity > 70
                      ? "Muy húmedo - Riesgo de enfermedades fúngicas"
                      : "Nivel óptimo para la mayoría de cultivos"}
                </div>
              </div>
            ) : null}
          </Card>

          {/* Tarjeta de Viento */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-teal-500" />
                Viento
              </div>
            }
            description="Velocidad del viento"
          >
            {loading ? (
              <Skeleton className="h-20 w-full bg-gray-800" />
            ) : weatherData ? (
              <div className="space-y-2">
                <div className="text-4xl font-bold text-white">{(weatherData.wind.speed * 3.6).toFixed(1)} km/h</div>
                <div className="text-sm text-gray-400">
                  {weatherData.wind.speed < 5
                    ? "Viento ligero - Favorable para aplicación de productos"
                    : weatherData.wind.speed > 15
                      ? "Viento fuerte - No recomendable para fumigación"
                      : "Viento moderado - Precaución en aplicaciones"}
                </div>
              </div>
            ) : null}
          </Card>

          {/* Tarjeta de Presión */}
          <Card
            title={
              <div className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-purple-500" />
                Presión
              </div>
            }
            description="Presión atmosférica"
          >
            {loading ? (
              <Skeleton className="h-20 w-full bg-gray-800" />
            ) : weatherData ? (
              <div className="space-y-2">
                <div className="text-4xl font-bold text-white">{weatherData.main.pressure} hPa</div>
                <div className="text-sm text-gray-400">
                  {weatherData.main.pressure < 1000
                    ? "Baja presión - Posibilidad de precipitaciones"
                    : weatherData.main.pressure > 1020
                      ? "Alta presión - Condiciones estables"
                      : "Presión normal"}
                </div>
              </div>
            ) : null}
          </Card>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Coordenadas: {latitude ? latitude.toFixed(4) : "..."}, {longitude ? longitude.toFixed(4) : "..."}
          </p>
          <p className="mt-1">Datos proporcionados por AgroMonitoring API</p>
        </div>
      </div>
    </main>
  )
}

export default App
