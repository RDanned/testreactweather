import React, {CSSProperties} from 'react';
import "./style.css";

interface ICurrentTempProps {
    currentTemp: number;
    feelTemp: number;
    iconId: string;
}

function WeatherBlockCurrentTemp(props: ICurrentTempProps){
    const currentTemp = props.currentTemp;
    const feelTemp = props.feelTemp;

    let color = "white";

    if(currentTemp < -25)
        color = "blue";
    else if(currentTemp > -25 && currentTemp < 0)
        color = "aqua";
    else if(currentTemp === 0)
        color = "gray";
    else if(currentTemp > 0 && currentTemp < 20)
        color = "beige";
    else if(currentTemp > 20 && currentTemp < 30)
        color = "gold";
    else if(currentTemp > 30)
        color = "orange";

    return(
        <>
        <div className={"weather__temp " + color }>
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
