import axios from 'axios'
process.loadEnvFile();
const judge0 = axios.create({
    baseURL: process.env.BASE_URL, // Replace with the actual base URL
    headers: {
        'X-RapidAPI-Key': `${process.env.X_RAPIDAPI_KEY}`,
        'X-RapidAPI-Host':  `${process.env.X_RAPIDAPI_HOST}`
    } // Replace with your API key
  });

  export default judge0;