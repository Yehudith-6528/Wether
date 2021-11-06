import React, { useState, useEffect } from 'react'
import axios from "axios";
import { BsSnow2, BsCloudSnow, BsFillSunFill } from "react-icons/bs";
import { Container, Card, Col, Row, Alert } from 'react-bootstrap';
import Moment from 'react-moment';
import Switch from '@mui/material/Switch';

function Wether() {
    const [tempType, setTempType] = useState('c')
    const [temp, setTemp] = useState(null);
    const [error, setError] = useState(null);
    const dateTime = new Date();

    const convertTempToF = (cTemp) => {
        return cTemp * 9 / 5 + 32;
    }
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);

        } else {
            setError({ message: "Geolocation is not supported by this browser" })
        }
    }
    const showPosition = (position) => {
        console.log(position.coords.latitude);

        axios.get(`https://www.7timer.info/bin/astro.php?lon=${position.coords.longitude}lat=${position.coords.latitude}&ac=0&unit=metric&output=json&tzshift=0`)
            .then((response) => {
                console.log(response.data.dataseries[0].temp2m);
                setTemp(response.data.dataseries[0].temp2m)
            }).catch(e => { setError({ message: e.message }) });
    }
    useEffect(() => {
        getLocation()

    }, [])
    return (
        <>

            {!error ? <Container>
                <Row style={{ marginTop: '8rem' }}>
                    <Col></Col>
                    <Col > <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Wether Details</Card.Title>
                            <Card.Text>
                                <Moment format="DD/MM/yyyy hh:mm:ss">{dateTime}</Moment>
                            </Card.Text>
                            <Card.Text>
                                <Switch
                                    onChange={() => {
                                        setTempType(tempType == 'c' ? 'f' : 'c')
                                    }} defaultChecked />
                      temp is:{tempType == 'c' ? temp + "c" : convertTempToF(temp) + "f"}
                            </Card.Text>
                            {temp > 15 ? <BsFillSunFill /> : temp > 0 ? <BsCloudSnow /> : <BsSnow2 />}
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col></Col>
                </Row>
            </Container> : <Alert variant="danger">  error {error.message} </Alert>}
        </>)
}

export default Wether