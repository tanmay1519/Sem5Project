import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Home.css'

export default function InMessage (props){
 
    return ( 
            <div class="recieved">
              <p>{props.msg}</p>
            </div>
        )
}
