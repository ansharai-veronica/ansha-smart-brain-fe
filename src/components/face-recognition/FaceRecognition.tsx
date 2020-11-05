import React from 'react'
import './face-recognition.css'
interface IFaceRecognition{
    imageBoxSize?:{
        top: number,
        bottom: number
        left: number
        right: number
    },
    imageUrl: string
}
function FaceRecognition({imageUrl,imageBoxSize}:IFaceRecognition){
    console.log(imageBoxSize,'imageBoxSize')
    return(
        <div className='center'>
            <div className='absolute mt2'>
                {imageUrl &&<img id='inputImage' src={imageUrl} alt="img" width='500px' height=' auto' />}
                <div className='bounding-box' style={imageBoxSize}/>
            </div>
        </div>
    )
}

export {FaceRecognition}
