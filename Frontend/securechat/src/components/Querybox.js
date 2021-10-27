import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Home.css'

export default function QueryBox(props) {

    return (
        <button onClick={props.onPress} style={{
            width: "60%",
            display: "flex", alignItems: "center", justifyContent: "space-evenly",
            paddingTop: "15px", height: "30px", backgroundColor: "rgba(255, 0, 0, 0.2)",  
            // position: "relative", zIndex: -1
        }}>
            <h4 > {props.name}</h4>
            <h4 >{props.email}</h4>
        </button>
    )
}
