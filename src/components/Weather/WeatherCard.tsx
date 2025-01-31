import { useEffect, useState } from "react";
import MainContainer from "../MainContainer";
import AppLayout from "../PersistentDrawer";
import { FaSearchLocation } from "react-icons/fa";
const APIKey = "a855f781b2bb66e833d0bc524090aeea";
interface WeatherData {
  main: {
    temp: number;
  };
}
interface Citytype {
  lon: number;
  lat: number;
  name: string;
  state: string;
}
const WeatherCard = () => {
  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState<Citytype | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [search, setSearch] = useState<boolean | null>(null);
  const [lon, setLon] = useState();
  const [lat, setLat] = useState();
  const fetchCitylonlat = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`
      );
      const data = await response.json();
      console.log(data);
      setSearch(true);
      setCityData(data[0]);
      setLon(data[0].lon);
      setLat(data[0].lat);
    } catch (error) {
      console.log("error", error);
      setCityData(null);
      setSearch(true);
    }
  };
  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`
      );
      const data = await response.json();
      console.log(data);
      setSearch(true);
      setWeatherData(data);
    } catch (error) {
      console.log("error", error);
      setWeatherData(null);
      setSearch(true);
    }
  };
  useEffect(() => {
    if (city && search) {
      fetchCitylonlat();
      fetchWeather();
    }
  }, [city, search]);
  return (
    <AppLayout>
      <MainContainer heading="Weather App">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-[400px] h-[320px] pt-4 mt-4  m-auto ">
          <div className="flex flex-row justify-between items-center bg-white rounded-2xl p-2 m-4">
            <input
              type="text "
              placeholder="Enter City Name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="rounded-2xl outline-none p-2 "
            />
            <button onClick={fetchCitylonlat}>
              <FaSearchLocation size={25} />
            </button>
          </div>
          {search && (
            <div>
              {weatherData ? (
                <div className="text-white">
                  <div className="flex flex-col items-center text-5xl mt-5 ml-3 text-start">
                    {(weatherData?.main?.temp - 263.15)?.toFixed(2)}°C
                  </div>
                  {cityData ? (
                    <div className="text-white">
                      <div className="text-sm mt-5 ml-3 text-start">
                        <p> {cityData.name} {cityData.state}{cityData.lon} {cityData.lat}</p>

                      </div>
                    </div>
                  ) : (
                    <div>Data Not Found</div>
                  )}
                  <div></div>
                </div>
              ) : (
                <div>Data Not Found</div>
              )}
            </div>
          )}
        </div>
      </MainContainer>
    </AppLayout>
  );
};

export default WeatherCard;
