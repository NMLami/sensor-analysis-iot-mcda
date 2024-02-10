import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navigation from "../Shared/Navigation/Navigation";
import Thermometer from "react-thermometer-chart";
import GaugeChart from "react-gauge-chart";
import { Table } from "react-bootstrap";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import NumbersIcon from "@mui/icons-material/Numbers";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AirIcon from "@mui/icons-material/Air";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { userLoggedIn } from "../../utilities/localStorageUtility";


const baseUrl = require("../../Static/env.json").baseUrlLocal;


const GetRoomDetails = () => {
    const { roomId } = useParams();

        // Create new Date instance
  

    const user = userLoggedIn();
   
    // const [room, setRoom] = useState([])
    // useEffect(() => {
    //     fetch(baseUrl+`/sensors/?roomId=${roomId}`)
    //         .then(res => res.json())
    //         .then(data => setRoom(data));
    // }, [])

    const [prediction, setPrediction] = useState([]);

    const [room, setRoom] = useState(null);
    useEffect(() => {
      fetch(baseUrl + `/sensors/?roomId=${roomId}`)
        .then((res) => res.json())
        .then((data) => setRoom(data.sensorDatas[0].rooms[0]));
    }, []);

    useEffect(() => {
      fetch(baseUrl + `/sensors/prediction?roomId=${roomId}`)
        .then((res) => res.json())
        .then((data) => setPrediction(data.prediction));
    }, []);

    let predictionDatas = [];
    if(prediction.length>0){
      for(let i=0;i<=24;i++){
        let obj ={"name": `${i}H`, uv:prediction[i] };
        predictionDatas.push(obj);
      }
    }

    if (!room) {
        return <></>;
      }
      const data = [{name: 'Start', uv:0},{name: 'Humidity', uv: room?.humidity}];
      return (
        <div>
          <Navigation></Navigation>
          <div>
            <div
              style={{
                width: "100%",
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                display: "flex",
                marginTop: 20,
              }}
            >
              <Table
                striped="columns"
                style={{
                  width: "50%",
                  backgroundColor: "#FFFFFF",
                }}
                bordered
              >
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Room ID #:</td>
                    <td>
                      <NumbersIcon /> {room.roomId}
                    </td>
                  </tr>
                  <tr>
                    <td>Temperature:</td>
                    <td>
                      <DeviceThermostatIcon /> {room.temp}
                    </td>
                  </tr>
                  <tr>
                    <td>Humidity:</td>
                    <td>
                      <WbSunnyIcon /> {room.humidity}
                    </td>
                  </tr>
                  <tr>
                    <td>Pressure:</td>
                    <td>
                      <AirIcon /> {room.pressure / 5}
                    </td>
                  </tr>
                  <tr>
                    <td>Smoke:</td>
                    <td>
                      <SmokingRoomsIcon /> {room.smoke ? "Yes" : "No"}
                    </td>
                  </tr>
                  <tr>
                    <td>Sound:</td>
                    <td>
                      <VolumeUpIcon /> {room.sound}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <Thermometer
                color="red"
                width="100px"
                height="500px"
                steps={10}
                minValue={0}
                maxValue={100}
                currentValue={room.temp}
              />
              <GaugeChart
                id="gauge-chart5"
                nrOfLevels={3}
                colors={["#FF5F6D", "#FFC371"]}
                arcWidth={0.3}
                style={{ width: "40%", marginTop: 120 }}
                textColor="#c4d4e0"
                percent={room.pressure / 5}
              />
              <LineChart width={300} height={300} data={data}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
              </LineChart>

            </div>
            <div>
            { user?.email ?
              <h3 className="pb-3" ><u><i>Prediction For Next 24 Hour</i></u></h3>:
              <h3 className="pb-3"><i>Login to See Prediction for Next 24 Hours!!</i></h3>
            }
              <div>
                { user?.email ?
                    <LineChart width={1000} height={500}  margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }} data={predictionDatas}>
                    <Line  type="monotone" dataKey="uv" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                  </LineChart> : ''
                }
              </div>
            </div>
          </div>
        </div>
      );
    
    // return (
    //     <div>
    //         <Navigation></Navigation>
    //         {room?.sensorDatas ? 
    //             <div>
    //                 <h1>room : {room.sensorDatas[0].rooms[0].roomId}</h1>
    //                 <h1>temp : {room.sensorDatas[0].rooms[0].temp}</h1>
    //                 <h1>humidity : {room.sensorDatas[0].rooms[0].humidity}</h1>
    //                 <h1>pressure : {room.sensorDatas[0].rooms[0].pressure/5}</h1>
    //                 <h1>smoke : {room.sensorDatas[0].rooms[0].smoke == false ? <span>False</span>: <span>True</span>}</h1>
    //                 <h1>sound : {room.sensorDatas[0].rooms[0].sound}</h1>
    //                 <div className='flex'>
    //                 <Thermometer
    //                     color="red"
    //                     width="100px"
    //                     height="500px"
    //                     steps={10}
    //                     minValue={0}
    //                     maxValue={100}
    //                     currentValue={room.sensorDatas[0].rooms[0].temp}
    //                 />
    //                <GaugeChart id="gauge-chart5"
    //                     nrOfLevels={3} 
    //                     colors={["#FF5F6D", "#FFC371"]} 
    //                     arcWidth={0.3} 
    //                     textColor="black"
    //                     percent={(room.sensorDatas[0].rooms[0].pressure*100)/5}  
    //                     />
    //                 </div>
    //             </div>   : <div></div>
    //     }
    //     </div>


    // );
};

export default GetRoomDetails;