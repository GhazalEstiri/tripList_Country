const BASE_URL = "https://api.restcountries.com";
const API_KEY = import.meta.env.VITE_API_KEY_COUNTRY;
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export async function getCountry() {
  const response = await fetch(
    `${BASE_URL}/countries/v5?response_fields=names.common,coordinates&limit=100`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  );

  console.log(response.status);

  const data = await response.json();
  console.log("data:", data);

  return data.data.objects;
}

export async function getWeather(latitude, longitude) {
  const response = await fetch(`
${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m
    
    `);
  console.log(response.status);

  const data = await response.json();

  console.log("weather:", data);

  return data;
}
