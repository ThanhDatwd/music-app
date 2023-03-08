


import React, { useRef, useLayoutEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import './trending.css'
import TitleApp from '../hook/TitleApp';
import Bxh from './Bxh';
import axios from 'axios';


const Trending = () => {
    // const chart = useRef(null);
    const [songsBxh,setSongsBxh]=React.useState([])
    useLayoutEffect(() => {
        let chart = am4core.createFromConfig({
            "type": "XYChart",
            "data": [{
                "date": "2022-03-16T09:28:48.175Z",
                "value1": 64,
                "value2": 103
            }, {
                "date": "2022-03-17T09:28:48.175Z",
                "value1": 58,
                "value2": 82
            }, {
                "date": "2022-03-18T09:28:48.175Z",
                "value1": 50,
                "value2": 88
            }, {
                "date": "2022-03-19T09:28:48.175Z",
                "value1": 55,
                "value2": 111
            }, {
                "date": "2022-03-20T09:28:48.175Z",
                "value1": 75,
                "value2": 109
            }, {
                "date": "2022-03-21T09:28:48.175Z",
                "value1": 62,
                "value2": 83
            }, {
                "date": "2022-03-22T09:28:48.175Z",
                "value1": 69,
                "value2": 90
            }, {
                "date": "2022-03-23T09:28:48.175Z",
                "value1": 87,
                "value2": 86
            }, {
                "date": "2022-03-24T09:28:48.175Z",
                "value1": 91,
                "value2": 109
            }, {
                "date": "2022-03-25T09:28:48.175Z",
                "value1": 65,
                "value2": 106
            }, {
                "date": "2022-03-26T09:28:48.175Z",
                "value1": 75,
                "value2": 86
            }],
            "xAxes": [{
                "type": "DateAxis",
                "renderer": {
                    "grid": {
                        "template": {
                            "type": "Grid",
                            "location": 0
                        }
                    },
                    "minGridDistance": 20
                }
            }],
            "yAxes": [{
                "type": "ValueAxis",
                "renderer": {
                    // "maxLabelPosition": 0
                }
            }],
            "series": [{
                "type": "LineSeries",
                "name": "Series 1",
                "bullets": {
                    "values": [{
                        "type": "CircleBullet",
                        "tooltipText": "{name}\n{dateX}: {valueY}"
                    }],
                    "template": {
                        "type": "Bullet"
                    }
                },
                "dataFields": {
                    "valueY": "value1",
                    "dateX": "date"
                },
                "strokeWidth": 3,
                "tensionX": 0.8,
                "tensionY": 0.9,
                "sequencedInterpolation": true,
                "sequencedInterpolationDelay": 100
            }, {
                "type": "LineSeries",
                "name": "Series 2",
                "bullets": {
                    "values": [{
                        "type": "Bullet",
                        "children": [{
                            "type": "Rectangle",
                            "width": 10,
                            "height": 10,
                            "horizontalCenter": "middle",
                            "verticalCenter": "middle"
                        }],
                        "tooltipText": "{name}\n{dateX}: {valueY}"
                    }],
                    "template": {
                        "type": "Bullet"
                    }
                },
                "dataFields": {
                    "valueY": "value2",
                    "dateX": "date"
                },
                "strokeWidth": 3,
                "tensionX": 0.5,
                "sequencedInterpolation": true,
                "sequencedInterpolationDelay": 100
            }]
        },
            document.getElementById('chartdiv')
        );
    }, []);
    React.useEffect(()=>{
        axios.get('http://localhost:3001/api/songs/?limit=100')
             .then(res=>{
                 const result=res.data
                let songs=result.sort((a,b)=>b.listens-a.listens)
                setSongsBxh(songs)
             })
    },[])
    return (
        <>
          <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
          <div className='bxh_trending'>
              <Bxh songs={songsBxh}/>
          </div>
          <div className='bxh_week_area'>
              <TitleApp title={'Bảng xếp hạng tuần'}/>
              <div className='bxh_week'>
                  <Bxh songs={songsBxh} bxhName={'Việt Nam'}/>
                  <Bxh songs={songsBxh} bxhName={"US-UK"}/>
              </div>
          </div>
        </>

    );
}

export default Trending;
