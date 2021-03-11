import React, {useState} from "react";
import {connect} from 'react-redux';
import {addCity} from "../redux/actions";
import {faEdit} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {apiKey} from "../utils/settings";
import axios from 'axios';

const checkCity = async (cityName: string) => {
    let response = false;

    try {
        let result = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
        response = true;
    } catch(err){
        response = false;
    }
    return response;
}

function CitySettings(props: any){

    const [city, setCity] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);


    const handleChange = (e: any) => {
        let target = e.target;
        let value = target.value;
        setCity(value);
    }

    const handleSave = async (e: any) => {
        e.preventDefault();

        if(await checkCity(city) && city.length > 0){
            setShowPopup(false);
            props.addCity(city);
        } else {
            setIsError(true);
            setError("City not found");
        }
    }

    const openCitySettings = () => {
        setShowPopup(true);
    }

    return(
        <>
        <FontAwesomeIcon icon={faEdit} onClick={openCitySettings}/>
        {
            showPopup && (
                <div className="weather-city__wrapper">
                    <div className="weather-city">
                        {
                            isError && (
                                <p className="alert alert-danger">
                                    {error}
                                </p>
                            )
                        }
                        <input className="form-control" type="text" onChange={handleChange}/>
                        <button className="form-control" onClick={handleSave}>Save</button>
                    </div>
                </div>
            )
        }
        </>
    );
}

export default connect(null, {addCity})(CitySettings);
