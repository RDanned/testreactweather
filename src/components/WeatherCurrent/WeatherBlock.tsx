import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Container, Row, Col, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useApiKey} from '../../hooks/useApiKey';
import WeatherBlockCurrentTemp from "./WeatherBlockCurrentTemp";

interface IWeatherBlockProps {
    cityName: string
}

interface IWeatherIcon {
    icon: string
}

interface IWeatherIconArray {
    temp: number,
    feels_like: number,
    weather: Array<IWeatherIcon>
}

function WeatherBlock(props: IWeatherBlockProps){
    const apiKey = useApiKey();
    const cityName = props.cityName;
    //const [mainData, setMainData] = useState({temp: 0, feels_like: 0});
    const [loading, setLoading] = useState(true);
    const [mainData, setMainData] = useState<IWeatherIconArray|any>({
        temp: 0,
        feels_like: 0,
        weather: [
            {icon: "no"}
        ]
    });

    useEffect(() => {

        const fetchData = async () => {
            await axios(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
                .then( response => {
                    let test = response.data;
                    console.log(test);
                    setMainData(test);
                    setLoading(false);
                })
                ;
        };

        fetchData();
    }, [])

    console.log("main data");
    console.log(mainData);

    const convertToCels = (temp: number): number => {
        return Number((temp - 273).toFixed(1));
    }

    if(loading)
        return (
            <Container style={{height: "100vh"}}>
                <Row style={{height: "100%", justifyContent: "center", alignItems: "center"}}>
                    <Col lg={6}>
                        <Card>
                            Loading
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    else
        return (
            <Container style={{height: "100vh"}}>
                <Row style={{height: "100%", justifyContent: "center", alignItems: "center"}}>
                    <Col lg={6}>
                        <Card>
                            <WeatherBlockCurrentTemp
                                feelTemp={convertToCels(mainData.main.feels_like)}
                                currentTemp={convertToCels(mainData.main.temp)}
                                iconId={mainData.weather[0].icon}
                            />
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
}

export default WeatherBlock;
