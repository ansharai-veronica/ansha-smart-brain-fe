import React, {useState} from 'react'
import './App.css'
import {Navigation} from './components/navigation/Navigation'
import {Logo} from './components/logo/Logo'
import {ImageLinkForm} from './components/image-link-form/ImageLinkForm'
import {Rank} from './components/rank/Rank'
import Particles from 'react-tsparticles'
import {FaceRecognition} from './components/face-recognition/FaceRecognition'
import {SignIn} from './components/sign-in/SignIn'
import {Register} from './components/register/Register'
import {particlesParams} from './particles'


const initState = {
    route: 'signin',
    user: {
        id: '',
        name: '',
        email: '',
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


    function onRouteChange(route: string) {
        setImageUrl(null)
        setAppState((prevState) => ({...prevState, route}))
    }

    function loadUser(user: any) {
        setAppState((prevState) => ({route: 'home', user}))
    }

    function handleInputChange(e: any) {
        setInput(e.target.value)
    }

    function handleSubmit() {
        setImageUrl(input)
        fetch('https://ansha-smart-brain-api.herokuapp.com/imageUrl', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({input})
        }).then(resp => resp.json()).then((response: any) => {
            if (response) {
                fetch('https://ansha-smart-brain-api.herokuapp.com/image', {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({id: user?.id})
                }).then(resp => resp.json()).then((count: number) => setAppState((prevState) => ({
                    ...prevState,
                    user: {...prevState.user, entries: count}
                })))
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
        <div>
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
