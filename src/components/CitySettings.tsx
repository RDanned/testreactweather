import {Container, Row, Col} from "react-bootstrap";
import React, {useState} from "react";
import {connect} from 'react-redux';
import {addCity} from "../redux/actions";


function CitySettings(props: any){

    const [city, setCity] = useState("");


    const handleChange = (e: any) => {
        let target = e.target;
        let value = target.value;
        setCity(value);
    }

    const handleSave = () => {
        props.addCity(city);
    }

    return(
        <Container>
            <Row>
                <Col lg={3}>
                    <span>{city}</span>
                    <input type="text" onChange={handleChange}/>
                    <button onClick={handleSave}>Save</button>
                </Col>
            </Row>
        </Container>
    );
}

export default connect(null, {addCity})(CitySettings);
