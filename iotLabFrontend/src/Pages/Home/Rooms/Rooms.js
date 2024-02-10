import React, { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Room from '../Room/Room';





const baseUrl = require('./../../../Static/env.json').baseUrlLocal;

const Rooms = () => {

    const [rooms, setRooms] = useState([])

    useEffect(() => {
        fetch(baseUrl+'/sensors/?limit=1')
            .then(res => res.json())
            .then(data => setRooms(data));
    }, [])

    
    // console.log(rooms.sensorDatas && rooms.sensorDatas[0].rooms)
    return (
        <Container>
            <Row>
                
            {
                        rooms.sensorDatas && rooms.sensorDatas[0].rooms.map(room => <Room
                            key={room.roomId}
                            room={room}
                        ></Room>)
                    }
            
            </Row>
        </Container>
    );
};

export default Rooms;