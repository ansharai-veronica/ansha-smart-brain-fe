import React, {useState} from 'react'

interface IRegister {
    onRouteChange: any
    loadUser: any
}

function Register({onRouteChange, loadUser}: IRegister) {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [name, setName] = useState<string>('')

    function handleEmailChange(e: any) {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e: any) {
        setPassword(e.target.value)
    }

    function handleNameChange(e: any) {
        setName(e.target.value)
    }

    function handleSubmit() {
        fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, password})
        }).then((response) => response.json())
            .then((user: any) => {
                console.log(user,'user')
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
                                   onChange={handleNameChange}
                                   name="name" id="name"/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                   type="email"
                                   value={email}
                                   onChange={handleEmailChange}
                                   name="email-address" id="email-address"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                   value={password}
                                   onChange={handlePasswordChange}
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
