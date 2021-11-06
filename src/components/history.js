import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Table, Form, Container, Row, Col, Alert } from 'react-bootstrap';
function History() {
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        axios.get("../places.json").then(res => {
            console.log(res)
            setData(res.data);
            setFilterData(res.data);
        }).catch(er => {
            console.log(er.message)
            setError({ message: er.message })
        })
    }, [])

    const searchInHistory = (text) => {
        if (!text) {
            setFilterData(data);
            return;
        }
        let filterDataArr = data.filter(item => item.LocationName.includes(text));
        setFilterData(filterDataArr);
    }
    return (
        <>
            {!error ?
                <Container>
                    <Row style={{ marginTop: '8rem' }}>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Enter Location Name</Form.Label>
                                <Form.Control size="sm" type="text" placeholder="Search..." onChange={(e) => searchInHistory(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            {filterData.length > 0 ? <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>lat</th>
                                        <th>len</th>
                                        <th> Location Name</th>
                                        <th>Temperature In Celsius</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {filterData.map((item, index) => {
                                        return (<tr key={index}>
                                            <td>{item.coordinates.lat}</td>
                                            <td>{item.coordinates.len}</td>
                                            <td>{item.LocationName}</td>
                                            <td>{item.TemperatureInCelsius}</td>
                                        </tr>)



                                    })}
                                </tbody>
                            </Table> : <h1>no suitable results found!</h1>}
                        </Col>
                        <Col></Col>
                    </Row>
                </Container> :
                <Alert variant="danger">  error {error.message} </Alert>}
        </>
    )
}
export default History