const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const fetch = require('node-fetch'); // Import the 'node-fetch' module to make API requests

const API_URL = "https://api.openweathermap.org/data/2.5/forecast/hourly?q=London,gb&appid=YOUR_API_KEY"; // Replace YOUR_API_KEY with your actual OpenWeatherMap API key

async function getWeatherData(date) {
  const res = await fetch(`${API_URL}&dt=${date}`);
  return await res.json();
}

async function main() {

  while(true) {
    readline.question(`Enter option:  
1. Get Weather
2. Get Wind Speed
3. Get Pressure
0. Exit\n`, async (option) => {
      
      const input = parseInt(option);
      
      if(input === 1) {
        const date = await new Promise(resolve => readline.question("Enter date: ", resolve));
        const data = await getWeatherData(date);
        if (data.list.length > 0) {
          console.log(`Temperature on ${date} is ${data.list[0].main.temp}`);
        } else {
          console.log(`No data available for ${date}.`);
        }
      }
      
      else if(input === 2) {
        const date = await new Promise(resolve => readline.question("Enter date: ", resolve));
        const data = await getWeatherData(date);
        if (data.list.length > 0) {
          console.log(`Wind speed on ${date} is ${data.list[0].wind.speed}`);  
        } else {
          console.log(`No data available for ${date}.`);
        }
      }
      
      else if(input === 3) {
        const date = await new Promise(resolve => readline.question("Enter date: ", resolve));
        const data = await getWeatherData(date);
        if (data.list.length > 0) {
          console.log(`Pressure on ${date} is ${data.list[0].main.pressure}`);
        } else {
          console.log(`No data available for ${date}.`);
        }
      }
      
      else if(input === 0) {
        readline.close();
      }
      
    });
  }

}

main();
