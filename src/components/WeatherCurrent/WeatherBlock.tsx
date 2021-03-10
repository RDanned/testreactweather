import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Container, Row, Col, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {apiKey} from "../../utils/settings";
import {connect} from 'react-redux';
import {getCity} from '../../redux/selectors';
import {convertToCels} from "../../utils/temp";
import './style.css';
import moment from 'moment';

interface IWeatherIconArray {
    temp: number,
    feels_like: number,
    weather: Array<any>
}

function WeatherBlock(props: any){
    const cityName = props.city.name;
    const [loading, setLoading] = useState(true);
    const [mainData, setMainData] = useState<IWeatherIconArray|any>({
        temp: 0,
        feels_like: 0,
        weather: [
            {icon: "no"}
        ]
    });

    const fetchData = async () => {
        await axios(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
            .then( response => {
                setMainData(response.data);
                setLoading(false);
            });
    };

    useEffect(() => {
        if(cityName.length){
            fetchData();
        }
    }, [cityName])

    if(loading)
        return (
            <div className="container" style={{height: "100vh"}}>
                <div className="row">
                    <div className="col-12">
                        <div>
                            {cityName}
                            Loading
                        </div>
                    </div>
                </div>
            </div>
        );
    else {
        let date = new Date(mainData.sys.sunrise);
        return (
            <div className="container" style={{height: "100vh"}}>
                <div className="row">
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
                                        Sat, 3 Aug
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
                                {cityName}, {mainData.sys.country} [edt city btn]
                            </div>
                            <footer className="weather-current-block__footer">
                                <div className="weather-current-block__feel">
                                    Feels like {convertToCels(mainData.main.feels_like)}
                                </div>
                                <div className="white-dot"></div>
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
