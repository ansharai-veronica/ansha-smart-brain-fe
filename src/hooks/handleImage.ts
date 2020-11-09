import {customFetch} from '../utils'
import {useHandleChangeHook} from './handleChangeHook'
import {useState} from 'react'

// todo solve anny
function useHandleImage(setAppState: any, user: any) {
    const {fields: field, handleFields} = useHandleChangeHook({input: ''})
    const {input} = field
    const [imageUrl, setImageUrl] = useState<any>(null)
    const [imageBoxSize, setImageBoxSize] = useState<any>(null)

    function handleSubmit() {
        setImageUrl(input)
        customFetch('imageUrl', 'POST', undefined, {input}).then((response: any) => {
            if (response) {
                customFetch('image', 'PUT', undefined, {id: user?.id}).then((count: number) => setAppState((prevState: any) => ({
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

    return {
        imageUrl,
        imageBoxSize,
        handleSubmit,
        handleFields,
        setImageUrl
    }
}

export {useHandleImage}
