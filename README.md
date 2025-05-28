# Weather Dashboard

A responsive and interactive Weather Dashboard built with React and Tailwind CSS that fetches historical weather data from the Open-Meteo Historical Weather API.

## Features

- Fetch historical weather data based on user inputs (latitude, longitude, date range)
- Display weather data in interactive line charts and paginated tables
- Form validation for all inputs
- Responsive design for mobile, tablet, and desktop
- Loading indicators and error handling
- Data visualization with Chart.js

## Weather Variables

The dashboard allows users to select and display the following weather variables:

- Maximum Temperature (2m)
- Minimum Temperature (2m)
- Mean Temperature (2m)
- Maximum Apparent Temperature (2m)
- Minimum Apparent Temperature (2m)
- Mean Apparent Temperature (2m)

## Setup and Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in your terminal (typically http://localhost:5173)

## Technologies Used

- React JS
- Tailwind CSS
- Chart.js with react-chartjs-2
- React Datepicker
- React Icons
- Open-Meteo API

## API Information

This application uses the [Open-Meteo Historical Weather API](https://open-meteo.com/en/docs/historical-weather-api) to fetch historical weather data. The API is free to use for non-commercial purposes with limitations on request volume.

## License

MIT