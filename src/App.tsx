import React, {createContext, useState} from 'react'
import './App.css'
import {Navigation} from './components/navigation/Navigation'
import Particles from 'react-tsparticles'
import {SignIn} from './components/sign-in/SignIn'
import {Register} from './components/register/Register'
import {particlesParams} from './particles'
import {useHandleImage} from './hooks/handleImage'


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
export const UserDetailsContext: any = createContext(undefined)

function UserDetailProvider(props: any) {
    return <UserDetailsContext.Provider {...props}/>
}

function App() {
    const [appState, setAppState] = useState(initState)
    const {route, user} = appState
    const {imageUrl, imageBoxSize, handleSubmit, handleFields, setImageUrl} = useHandleImage(setAppState, user)

    function onRouteChange(route: string) {
        setImageUrl(null)
        setAppState((prevState) => ({...prevState, route}))
    }

    function loadUser(user: any) {
        setAppState({route: 'home', user})
    }

    return (
        <div>
            <Particles
                className='particles'
                id="tsparticles"
                options={particlesParams}/>
            <Navigation onRouteChange={onRouteChange} isSignedIn={appState.route === 'signin'}/>
            <UserDetailProvider value={{user, handleFields, handleSubmit, imageBoxSize, imageUrl,loadUser,onRouteChange,route}}>
                <SignIn />
                <Register />

            </UserDetailProvider>
        </div>
    )
}

export default App
