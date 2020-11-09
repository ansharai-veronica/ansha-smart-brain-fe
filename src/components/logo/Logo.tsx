import React from 'react'
// @ts-ignore
import Tilt from 'react-tilt'
import './logo.css'
import Brain from './brain.png'
function Logo(){

    return(
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3 ">
                    <img src={Brain} alt="brain" style={{paddingTop:'5px'}}/>
                </div>
            </Tilt>
        </div>
    )
}
export {Logo}
