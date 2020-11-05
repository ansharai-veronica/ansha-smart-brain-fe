import React from 'react'

interface INavigation {
    onRouteChange: any
    isSignedIn: boolean
}

function Navigation({onRouteChange, isSignedIn}: INavigation) {

    return (
        <>
            {!isSignedIn ?
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('signin')}>Sign
                        Out</p>

                </nav> :
                <>
                    <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <p className='f3 link dim black underline pa3 pointer'
                           onClick={() => onRouteChange('signin')}>Sign In</p>
                        <p className='f3 link dim black underline pa3 pointer'
                           onClick={() => onRouteChange('register')}>Register</p>

                    </nav>

                </>
            }
        </>
    )
}

export {Navigation}
