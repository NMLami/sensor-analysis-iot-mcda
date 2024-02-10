import React,  { useEffect, useState } from 'react';
import Navigation from '../Shared/Navigation/Navigation';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import axios from 'axios';
import Histogram from 'react-chart-histogram';

const baseUrl = `http://localhost:4000/api/v1`

const CustomeParam = () => {

    const [valueTH, setValueTH] = useState(1)
    const [valueTS, setValueTS] = useState(1)
    const [valueHS, setValueHS] = useState(1)
    const [result, setResult] = useState({})
    const [xResult, setXResult] = useState([])
    const [yResult, setYResult] = useState([])

    const options = { fillColor: '#2596be', strokeColor: '#2596be' };


    function HandleChange() {
        let TH =1;
        let TS =1;
        let HS =1;
       
        if(valueTH < 0 ){
            TH = valueTH*(-1)
        }else{
            TH = parseFloat(1/valueTH)
        }

        if(valueTS <0 ){
            TS = valueTS*(-1)
        }else{
            TS = parseFloat(1/valueTS)
        }

        if(valueHS <0 ){
            HS = valueHS*(-1)
        }else{
            HS = parseFloat(1/valueHS)
        }

        const url =baseUrl+`/ahp/?temp_hum=${TH}&temp_sou=${TS}&hum_sou=${HS}`
        axios.get(url)
        .then(response => {
            setResult(response.data.data);
            setXResult(Object.keys(response.data.data));
            setYResult(Object.values(response.data.data));
        })
        .catch(error => {
            console.error('There was an error!', error);
        })

    }



    function valueTextTempHue(value) {
        setValueTH(value);
      }

    function valueTextTempSou(value) {
        setValueTS(value);
      }

    function valueTextHumSou(value) {
        setValueHS(value);
      }
      console.log(result)
      console.log(valueTH , valueTS, valueHS)
      const marks = [
        {
          value: -5,
          label: '5',
        },
        {
          value: -3,
          label: '3',
        },
        {
          value: -1,
          label: '1',
        },
        {
          value: 1,
          label: '1',
        },
        {
          value: 3,
          label: '3',
        },
        {
          value: 5,
          label: '5',
        },
      ];

      
    return (
        <div>
        <Navigation/>
        <h3>Give Custome Weights</h3>
        <div  style={{display: 'flex',flexDirection: "column",flexWrap: "wrap",  justifyContent:'center', alignItems:'center'}}>
        <div className="d-flex flex-row mb-3">
        <div className="p-2"><h4>Temperature</h4></div>
        <div className="p-2">  <Box sx={{ width: 300 }}>
        <Slider
        aria-label="Temperature"
        defaultValue={1}
        getAriaValueText= {valueTextTempHue}
        valueLabelDisplay = 'off'
        step={2}
        marks ={marks}
        min={-5}
        max={5}
         />
        </Box>
        </div>
        <div className="p-2"><h4>Humidity</h4></div>
        </div>

        <div className="d-flex flex-row mb-3">
        <div className="p-2"><h4>Temperature</h4></div>
        <div className="p-2">  <Box sx={{ width: 300 }}>
        <Slider
        aria-label="Temperature"
        defaultValue={1}
        getAriaValueText= {valueTextTempSou}
        valueLabelDisplay = 'off'
        step={2}
        marks ={marks}
        min={-5}
        max={5}
         />
        </Box>
        </div>
        <div className="p-2"><h4>Sound</h4></div>
        </div>

        <div className="d-flex flex-row mb-3">
        <div className="p-2"><h4>Humidity</h4></div>
        <div className="p-2">  <Box sx={{ width: 300 }}>
        <Slider
        aria-label="Temperature"
        defaultValue={1}
        getAriaValueText= {valueTextHumSou}
        valueLabelDisplay = 'off'
        step={2}
        marks ={marks}
        min={-5}
        max={5}
         />
        </Box>
        </div>
        <div className="p-2"><h4>Sound</h4></div>
        </div>
        </div>

        <Button variant="contained" onClick={HandleChange}>Submit</Button>
        <div>
        <Histogram
          xLabels={xResult}
          yValues={yResult}
          width='500'
          height='300'
          options={options}
        />
        </div>
        <div style={{padding:"100px"}}></div>
        </div>
    );
};

export default CustomeParam;