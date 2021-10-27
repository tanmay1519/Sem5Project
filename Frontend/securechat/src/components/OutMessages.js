import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Home.css'
export default function OutMessage (props){
   
    return ( 
            <div class="sent">
              <p>{props.msg}</p>
            </div>
        )
  }