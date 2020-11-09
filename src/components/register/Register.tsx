import React, {useState} from 'react'
import {customFetch} from '../../utils'
import {useHandleChangeHook} from '../../hooks/handleChangeHook'

interface IRegister {
    onRouteChange: any
    loadUser: any
}

function Register({onRouteChange, loadUser}: IRegister) {
    const {fields, handleFields} = useHandleChangeHook({email:'',password:'',name:''})
    const {email,password, name} = fields

    function handleSubmit() {
        customFetch('register','POST',undefined,{name, email, password}).then((user: any) => {
                if (typeof user === 'object') {
                    loadUser(user)
                }else{
                    throw  new Error('Unable to register')
                }
                //handle error
            }).catch(err => {
                return
        })
    }

    return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                   type="text"
                                   value={name}
                                   onChange={handleFields}
                                   name="name" id="name"/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                   type="email"
                                   value={email}
                                   onChange={handleFields}
                                   name="email" id="email"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                   value={password}
                                   onChange={handleFields}
                                   type="password" name="password" id="password"/>
                        </div>
                    </fieldset>
                    <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                               type="submit"

                               onClick={handleSubmit}
                               value="Register"/>
                    </div>
                    <div className="lh-copy mt3">
                        <p className="f6 link dim black db">Sign In</p>
                    </div>
                </div>
            </main>
        </article>
    )
}

export {Register}
