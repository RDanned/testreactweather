import {useState} from 'react';
import WeatherBlock from "./WeatherBlock";

function WeatherCurrent(){
    const cityName = 'Oskemen';

    return (
        <WeatherBlock cityName={cityName}/>
    );
}

export default WeatherCurrent;
