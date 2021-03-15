import React from 'react';
import {apiKey, apiUrl} from "../../utils/settings";
import axios from 'axios';
import {connect} from 'react-redux';
import {getCity} from "../../redux/selectors";

class WeatherWeek extends React.Component<any, any>{
    private lat = 0;
    private lon = 0;

    constructor(props:any) {
        super(props);
        this.state = {
            city: props.city.name,
            weatherData: {}
        };

        this.fetchCoords();
    }

    setCoords = (pos:any) => {
        this.lat = pos.coords.latitude;
        this.lon = pos.coords.longitude;
    };

    fetchCoords = () => {
        navigator.geolocation.getCurrentPosition(
            (pos:any) => {
                this.lat = pos.coords.latitude;
                this.lon = pos.coords.longitude;

                console.log(this.lat, this.lon);
            },
        );
    }

    fetchWeek = async () => {
        /*let geo = new GeolocationCoordinates();
        let lat = geo.latitude;
        let lon = geo.longitude;*/
        //let lat, lon;
        //let [lat, lon]:any

        console.log(this.lat, this.lon);

        /*console.log(lat);
        console.log(lon);*/
        let response = await axios.get(`${apiUrl}/onecall`, {
            params: {
                /*lat: lat,
                lon: lon,*/
                exclude: 'daily',
                appid: apiKey
            },
        });

        if(response.status === 200){
            this.setState({
                weatherData: response.data
            });
        }
    }

    componentDidMount () {
        this.fetchWeek();
    }

    render() {
        return (
            <>
                week
            </>
        );
    }
}

const mapStateToProps = (state: any) => {
    const city = getCity(state);
    return { city };
};

export default connect(mapStateToProps)(WeatherWeek);
