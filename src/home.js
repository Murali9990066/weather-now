import React, { useState } from 'react';
import './style.css';
import axios from 'axios';

function Home() {
    const [data, setData] = useState({
        celcius: 10,
        name: 'London',
        humidity: 10,
        wind: 2,
        weatherMain: '' // Added for weather condition
    });
    const [name, setName] = useState('');

    const handleClick = () => {
        if (name.trim() !== "") {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=f0acfc94ac39a1eacb5640dc85a381ce&units=metric`;
            
            axios.get(apiUrl)
                .then(res => {
                    setData({
                        celcius: Math.round(res.data.main.temp),
                        name: res.data.name,
                        humidity: Math.round(res.data.main.humidity),
                        wind: Math.round(res.data.wind.speed),
                        weatherMain: res.data.weather[0].main 
                    });
                })
                .catch(err => console.log(err));
        }
    };

    // Function to get the appropriate weather icon
    const getWeatherIcon = () => {
        const { celcius, weatherMain } = data;

        if (weatherMain === 'Snow') {
            return 'snowy.png';
        } else if (weatherMain === 'Rain' || weatherMain === 'Drizzle') {
            return 'rain.png';
        } else if (weatherMain === 'Thunderstorm') {
            return 'storm.png';
        } else if (celcius >= 30) {
            return 'bright sun.png'; // High temperature
        } else {
            return 'sun.png'; // Normal temperature
        }
    };

    return (
        <div className='container'>
            <div className='weather'>
                <div className='search'>
                    <input
                        type='text'
                        placeholder='Enter city name'
                        onChange={e => setName(e.target.value)}
                    />
                    <button onClick={handleClick}>
                        <img src='search.png' alt='Search' />
                    </button>
                </div>
                <div className='winfo'>
                    <img src={getWeatherIcon()} alt='Weather Icon' />
                    <div className='dt'>
                        <h1>{data.celcius}°C</h1>
                        <h2>{data.name}</h2>
                    </div>
                    <div className='details'>
                        <div className='col'>
                            <img src='humidity.png' alt='Humidity Icon' />
                            <div className='humidity'>
                                <p>{data.humidity}%</p>
                                <p>humidity</p>
                            </div>
                        </div>
                        <div className='col'>
                            <img src='wind.png' alt='Wind Icon' />
                            <div className='wind'>
                                <p>{data.wind} km/h</p>
                                <p>wind</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
