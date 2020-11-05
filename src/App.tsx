import React, {useEffect, useState} from 'react'
import './App.css'
import {Navigation} from './components/navigation/Navigation'
import {Logo} from './components/logo/Logo'
import {ImageLinkForm} from './components/image-link-form/ImageLinkForm'
import {Rank} from './components/rank/Rank'
import Particles from 'react-tsparticles'
// @ts-ignore
import Clarifai from 'clarifai'
import {FaceRecognition} from './components/face-recognition/FaceRecognition'
import {SignIn} from './components/sign-in/SignIn'
import {Register} from './components/register/Register'

const particlesParams = {
    background: {
        color: {
            value: '#0d47a1'
        }
    },
    fpsLimit: 60,
    interactivity: {
        detectsOn: 'canvas',
        events: {
            onClick: {
                enable: true,
                mode: 'push'
            },
            onHover: {
                enable: true,
                mode: 'repulse'
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: '#ffffff'
        },
        links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
        },
        collisions: {
            enable: true
        },
        move: {
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: false,
            speed: 6,
            straight: false
        },
        number: {
            density: {
                enable: true,
                value_area: 800
            },
            value: 80
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: 'circle'
        },
        size: {
            random: true,
            value: 5
        }
    },
    detectRetina: true
}

const app = new Clarifai.App({
    apiKey: '8f2e5f670c4743d5ae1f693e688c8de7'
})

const initState = {
    route: 'signin',
    user: {
        id: '',
        name:'',
        email:'',
        entries: 0,
        joined: ''
    }
}
function App() {
    const [input, setInput] = useState<string>('')
    const [imageUrl, setImageUrl] = useState<any>(null)
    const [imageBoxSize, setImageBoxSize] = useState<any>(null)
    const [appState, setAppState] = useState(initState)
    const {route, user} = appState




    function onRouteChange(route: string){
        setImageUrl(null)
        setAppState((prevState) => ({...prevState, route}))
    }

    function loadUser(user: any){
        setAppState((prevState) => ({route: 'home',user}))
    }
    function handleInputChange(e: any) {
        setInput(e.target.value)
    }

    function handleSubmit() {
        setImageUrl(input)
        fetch('http://localhost:3001/imageUrl', {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({input})
        }).then(resp => resp.json()).then((response: any) => {
            if(response){
                fetch('http://localhost:3001/image', {
                    method: 'PUT',
                    headers:{'Content-Type': 'application/json'},
                    body: JSON.stringify({id:user?.id})
                }).then(resp => resp.json()).then((count: number) =>setAppState((prevState) =>({...prevState, user:{...prevState.user, entries: count}})) )
                calculateFaceLocation(response)

            }
        }).catch((err: any) => {
            console.log(err)
        })
    }

    function calculateFaceLocation(data: any) {
        const box = data.outputs[0]?.data?.regions[0]?.region_info?.bounding_box
        const {bottom_row: bottom, left_col: left, right_col: right, top_row: top} = box
        const image: any = document.getElementById('inputImage')
        const width = Number(image?.width)
        const height = Number(image?.height)
        setImageBoxSize({
            top: top * height,
            bottom: height - (bottom * height),
            right: width - (right * width),
            left: width * left
        })
    }

    return (
        <div className="App">

            <Particles
                className='particles'
                id="tsparticles"
                options={particlesParams}/>
            <Navigation onRouteChange={onRouteChange} isSignedIn={appState.route === 'signin'}/>
            {route === 'signin' ? <SignIn onRouteChange={(onRouteChange)} loadUser={loadUser}/> :
                route === 'register' ? <Register onRouteChange={onRouteChange} loadUser={loadUser}/> :
                    <>
                        <Logo/>
                        <Rank user={user}/>
                        <ImageLinkForm handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
                        <FaceRecognition imageBoxSize={imageBoxSize} imageUrl={imageUrl}/>
                    </>}
        </div>
    )
}

export default App
