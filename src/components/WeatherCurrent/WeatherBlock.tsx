import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {apiKey} from "../../utils/settings";
import {connect} from 'react-redux';
import {getCity} from '../../redux/selectors';
import {convertToCels} from "../../utils/temp";
import './style.css';
import moment from 'moment';
import CitySettings from "../CitySettings";

function WeatherBlock(props: any){
    const cityName = props.city.name;
    const [loading, setLoading] = useState(true);
    const [mainData, setMainData] = useState<any>({
        main: {
            temp: 0,
            feels_like: 0,
            weather: [
                {icon: "no"}
            ]
        }
    });

    const fetchData = async () => {
        /*await axios(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
            .then( response => {
                setMainData(response.data);
                setLoading(false);
            });*/

        let response:any = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);

        if(response.status === 200){
            setMainData(response.data);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        if(cityName.length){
            fetchData();
        }
    }, [cityName])

    if(loading)
        return (
            <>
            <div className="container" style={{height: "100vh"}}>
                <div className="row" style={{height: "100vh"}}>
                    <div className="col-12 d-flex justify-content-center align-items-center">
                        <div style={{fontSize: "100px"}}>
                            Loading...
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    else {
        let weekDay: string = moment().format('ddd');
        let monthDay: string = moment().format('D');
        let month: string = moment().format('MMM');

        return (
            <div className="container" style={{height: "100vh"}}>
                <div className="row" style={{height: "100vh"}}>
                    <div className="col-12 d-flex justify-content-center align-items-center">
                        <div className="weather-current-block">
                            <header className="weather-current-block__header">
                                <img className="weather-current-block__icon"
                                     src={`http://openweathermap.org/img/wn/${mainData.weather[0].icon}@2x.png`}/>
                                <div className="weather-current-block__date-time-block">
                                    <div className="weather-current-block__date">
                                        Today
                                    </div>
                                    <div className="weather-current-block__sub-date">
                                        {weekDay}, {monthDay} {month}
                                    </div>
                                </div>
                            </header>
                            <div className="weather-current-block__temp">
                                {convertToCels(mainData.main.temp)} ℃
                            </div>
                            {/*
                            todo: add change city btn
                            */}
                            <div className="weather-current-block__place">
                                {cityName}, {mainData.sys.country} <CitySettings/>
                            </div>
                            <footer className="weather-current-block__footer">
                                <div className="weather-current-block__feel">
                                    Feels like {convertToCels(mainData.main.feels_like)}
                                </div>
                                <div className="white-dot"> </div>
                                <div className="weather-current-block__sunset">
                                    Sunset {moment(mainData.sys.sunset).format('HH:mm')}<br/>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    const city = getCity(state);
    return { city };
};

export default connect(mapStateToProps)(WeatherBlock);
