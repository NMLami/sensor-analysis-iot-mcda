import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

const Room = (props) => {
    const {roomId, humidity, pressure, smoke, sound, temp}=props.room

    const random = Math.floor(Math.random() * (4 - 1 + 1) + 1)
    let srcPic ='';
    if(random == 1){
      srcPic ='https://images.unsplash.com/photo-1561089489-f13d5e730d72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80';
    }else if(random == 2){
      srcPic='https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
    }else if(random == 3){
      srcPic='https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'
    }
    else{
      srcPic="https://images.unsplash.com/photo-1481277542470-605612bd2d61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=806&q=80"
    }

    return (
      <Col xs={6} md={4}>
        <Card style={{ width: "18rem", marginTop: "10px" }}>
          <Card.Img
            variant="top"
            src={srcPic}
          />
          <Card.Body>
            <Card.Title>Room {roomId}</Card.Title>
          </Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item><DeviceThermostatIcon/>{temp.toFixed(2)}°C<span></span> <WbSunnyIcon />{humidity} </ListGroup.Item>
            {/* <ListGroup.Item>Humidity : </ListGroup.Item> */}
            {/* <ListGroup.Item>Pressure: {pressure}</ListGroup.Item> */}
            {/* <ListGroup.Item>Smoke: {smoke ? "Yes" : "No"}</ListGroup.Item> */}
            {/* <ListGroup.Item>Sound: {sound}</ListGroup.Item> */}
          </ListGroup>
          <Card.Body style={{}}>
            <Link to={`/rooms/${roomId}`}>
              <Button className="btn-info">Show more details</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    );
    // return (
    // <Col xs={6} md={4}>
    // <Card style={{ width: '18rem' }}>
    //   <Card.Img variant="top" src="https://images.unsplash.com/photo-1481277542470-605612bd2d61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=806&q=80" />
    //   <Card.Body>
    //     <Card.Title>Room {roomId}</Card.Title>
    //     <Card.Text>
    //       Some quick example text to build on the card title and make up the
    //       bulk of the card's content.
    //     </Card.Text>
    //   </Card.Body>
    //   <ListGroup className="list-group-flush">
    //     <ListGroup.Item>temp: {temp}</ListGroup.Item>
    //     <ListGroup.Item>humidity : {humidity}</ListGroup.Item>
    //     <ListGroup.Item>pressure: {pressure}</ListGroup.Item>
    //     <ListGroup.Item>smoke: {smoke}</ListGroup.Item>
    //     <ListGroup.Item>sound: {sound}</ListGroup.Item>
    //   </ListGroup>
    //   <Card.Body>
    //     {/* <Card.Link href="#" onClick={test} >Card Link</Card.Link>
    //     <Card.Link href="#">Another Link</Card.Link> */}
    //      <Link to={`/rooms/${roomId}`}>
    //         <button className="btn btn-info">Details</button>
    //     </Link>

    //   </Card.Body>
    // </Card>
    // </Col>
    // );
};

export default Room;