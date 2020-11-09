import {useState} from 'react'

function useHandleChangeHook(initialValues ={}): {[key: string] : any}{
    const [fields, setFields] = useState(initialValues)

    function handleFields(e:any){
        setFields((oldFields) => ({...oldFields,[e.target.name]: e.target.value}))
    }

    return {fields,handleFields}
}

export {useHandleChangeHook}
