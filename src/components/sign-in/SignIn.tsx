import React, {useState} from 'react'

interface ISignIn {
    onRouteChange: any
    loadUser: any
}

function SignIn({onRouteChange,loadUser}: ISignIn) {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    function handleEmailChange(e: any) {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e: any) {
        setPassword(e.target.value)
    }

    function handleSubmit() {
        fetch('http://localhost:3001/signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        }).then((response) => response.json()).then((u: any ) =>{
            if(typeof u =='object'){
                loadUser(u)
            }
        })
        console.log(email, password)

    }

    return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
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
                               value="Sign in"/>
                    </div>
                    <div className="lh-copy mt3">
                        <p className="f6 link dim black db" onClick={() => onRouteChange('register')}>Register</p>
                    </div>
                </div>
            </main>
        </article>
    )
}

export {SignIn}
