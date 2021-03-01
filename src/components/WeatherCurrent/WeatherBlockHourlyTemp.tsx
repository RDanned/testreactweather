import {useState, useEffect} from 'react';
import {useApiKey} from '../../hooks/useApiKey';
import axios from "axios";

function WeatherBlockHourlyTemp(){
    const apiKey = useApiKey();
    const cityName = "Oskemen";
    const [mainData, setMainData] = useState({});

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
}

export default WeatherBlockHourlyTemp;
