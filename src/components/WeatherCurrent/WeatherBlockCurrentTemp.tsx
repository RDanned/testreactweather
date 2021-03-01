import React, {CSSProperties} from 'react';

interface ICurrentTempProps {
    currentTemp: number;
    feelTemp: number;
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

    const wrapperStyles: CSSProperties = {
        backgroundColor: color,
        width: "160px",
        height: "50px",
        textAlign: "center",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px"
    };

    return(
        <div style={wrapperStyles}>
            <span>{currentTemp}</span><br/>
            <span>Feels like: {feelTemp}</span>
        </div>
    );
}

export default WeatherBlockCurrentTemp;
