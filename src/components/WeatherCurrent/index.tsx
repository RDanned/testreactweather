import {useState} from 'react';
import WeatherBlock from "./WeatherBlock";
import '../CitySettings';
import CitySettings from "../CitySettings";

function WeatherCurrent(){

    return (
        <>
            <CitySettings/>
            <WeatherBlock/>
        </>
    );
}

export default WeatherCurrent;
