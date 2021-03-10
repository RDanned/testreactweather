import React, {CSSProperties} from 'react';
import "./style.css";

interface ICurrentTempProps {
    currentTemp: number;
    feelTemp: number;
    iconId: string;
    city: string;
}

function WeatherBlockCurrentTemp(props: ICurrentTempProps){
    const currentTemp = props.currentTemp;
    const feelTemp = props.feelTemp;

    return(
        <>
        <div className="weather__temp">
            <div className="weather__current-temp">
                {currentTemp}
            </div>
            <div className="weather__feels-like">
                Feels like: {feelTemp}
            </div>
        </div>
        <div className="weather__icon">
            <img src={`http://openweathermap.org/img/wn/${props.iconId}@2x.png`} alt=""/>
        </div>
        </>
    );
}

export default WeatherBlockCurrentTemp;
