import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Container, Row, Col, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useApiKey} from '../../hooks/useApiKey';
import WeatherBlockCurrentTemp from "./WeatherBlockCurrentTemp";

interface IWeatherBlockProps {
    cityName: string
}

function WeatherBlock(props: IWeatherBlockProps){
    const apiKey = useApiKey();
    const cityName = props.cityName;
    const [mainData, setMainData] = useState({temp: 0, feels_like: 0});

    useEffect(() => {

        const fetchData = async () => {
            await axios(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
                .then( response => {
                    let test = response.data;
                    console.log(test);
                    setMainData(test.main);
                })
                ;
        };

        fetchData();

    }, [])

    const convertToCels = (temp: number): number => {
        return Number((temp - 273).toFixed(1));
    }


    return (
        <Container style={{height: "100vh"}}>
            <Row style={{height: "100%", justifyContent: "center", alignItems: "center"}}>
                <Col lg={6}>
                    <Card>
                        <WeatherBlockCurrentTemp
                            feelTemp={convertToCels(mainData.feels_like)}
                            currentTemp={convertToCels(mainData.temp)}/>
                        <p>{(mainData.feels_like - 273).toFixed()}</p>
                        weather
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default WeatherBlock;
