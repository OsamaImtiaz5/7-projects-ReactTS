import { useEffect, useState } from "react";
import MainContainer from "../MainContainer";
import AppLayout from "../PersistentDrawer";
import { FaSearchLocation } from "react-icons/fa";
import { BiWind } from "react-icons/bi";
import { LuWaves } from "react-icons/lu";
import { HiSun } from "react-icons/hi";
import { PiCloudSunFill } from "react-icons/pi";

const APIKey = "a855f781b2bb66e833d0bc524090aeea";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
}

interface CityType {
  lon: number;
  lat: number;
  name: string;
  state?: string;
}

const WeatherCard = () => {
  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState<CityType | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [search, setSearch] = useState(false);
  const [lon, setLon] = useState<number | null>(null);
  const [lat, setLat] = useState<number | null>(null);

  // Fetch city coordinates
  const fetchCityLonLat = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKey}`
      );
      const data = await response.json();

      if (data.length === 0) {
        alert("City not found");
        return;
      }

      setCityData(data[0]);
      setLon(data[0].lon);
      setLat(data[0].lat);
      setSearch(true);
    } catch (error) {
      console.error("Error fetching city coordinates:", error);
      setCityData(null);
    }
  };

  // Fetch weather data only when lon and lat are available
  useEffect(() => {
    if (!lon || !lat) return;

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeatherData(null);
      }
    };

    fetchWeather();
  }, [lon, lat]); // Trigger when lon & lat change

  return (
    <AppLayout>
      <MainContainer heading="Weather App">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500  h-[420px] pt-4 mt-4 m-auto rounded-2xl">
          <div className="flex flex-row justify-between items-center bg-white rounded-2xl p-2 m-4">
            <input
              type="text"
              placeholder="Enter City Name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="rounded-2xl outline-none p-2"
            />
            <button onClick={fetchCityLonLat}>
              <FaSearchLocation size={25} />
            </button>
          </div>

          {search && weatherData && (
            <div className="text-white">
              {/* Temperature */}
              <div className="flex flex-col items-center text-5xl mt-5 ml-3 text-start">
                {weatherData?.main?.temp?.toFixed(2)}°C
              </div>

              {/* City Info */}
              {cityData ? (
                <div className="text-sm mt-5 ml-3 text-start">
                  <p>
                    {cityData.name} {cityData.state && `(${cityData.state})`}
                    <br />
                    Lon: {cityData.lon.toFixed(2)}, Lat:{" "}
                    {cityData.lat.toFixed(2)}
                  </p>
                </div>
              ) : (
                <div>Data Not Found</div>
              )}

              <div className="flex flex-row items-center text-md mt-5 ml-3 p-4 text-start justify-between">
                {/* Wind Speed */}

                <div className="flex flex-row gap-4">
                  <BiWind size={24} />
                  <p>{weatherData?.wind?.speed.toFixed(2)} km/h</p>
                </div>
                {/* Humidity */}

                <div className="flex flex-row gap-4">
                  <LuWaves size={24} />
                  <p>{weatherData?.main?.humidity}kmph</p>
                </div>
              </div>
              <div className="flex flex-row items-center text-md mt-5 ml-3  p-2 text-start justify-between">
                {/* Sun Rise */}

                <div className="flex flex-row gap-4">
                  <HiSun size={24} />
                  <p>
                    {new Date(
                      weatherData?.sys?.sunrise * 1000
                    )?.toLocaleDateString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                  </p>
                </div>
                {/* SunSet */}

                <div className="flex flex-row gap-4">
                  <PiCloudSunFill size={24} />
                  <p>
                    {new Date(
                      weatherData?.sys?.sunset * 1000
                    )?.toLocaleDateString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </MainContainer>
    </AppLayout>
  );
};

export default WeatherCard;
