import React, { useEffect, useState } from 'react';

export const FetchData = () => {
  const [state, setState] = useState({ forecasts: [], loading: true })

  const populateWeatherData = async () => {
    const response = await fetch('weatherforecast');
    console.log(response)

    const data = await response.json();
    setState({ forecasts: data, loading: false });
  }

  useEffect(() => {
    populateWeatherData();
  }, [])

  return (
    <table className='table table-striped' aria-labelledby="tabelLabel">
      <thead>
        <tr>
          <th>Date</th>
          <th>Temp. (C)</th>
          <th>Temp. (F)</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        {state.loading
          ? <p>Loading...</p>
          : state.forecasts.map((forecast: any) =>
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          )}
      </tbody>
    </table>
  );
}
