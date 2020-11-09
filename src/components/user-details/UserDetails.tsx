import {Logo} from '../logo/Logo'
import {Rank} from '../rank/Rank'
import {ImageLinkForm} from '../image-link-form/ImageLinkForm'
import {FaceRecognition} from '../face-recognition/FaceRecognition'
import React, {useContext} from 'react'
import {UserDetailsContext} from '../../App'

function UserDetails() {
    const {user, handleFields, handleSubmit, imageBoxSize, imageUrl} = useContext(UserDetailsContext)
    return (
        <>
            <Logo/>
            <Rank user={user}/>
            <ImageLinkForm handleInputChange={handleFields} handleSubmit={handleSubmit}/>
            <FaceRecognition imageBoxSize={imageBoxSize} imageUrl={imageUrl}/>
        </>
    )
}

export {UserDetails}
