import React from 'react'

interface IRank{
    user: any
}
function Rank({user:{name,entries}}:IRank){
    return (
        <div className='center'>
         <div className="white f3">
             {name}, your current rank is...
         </div>
            <div className="white f3">
                {entries}
            </div>
        </div>
    )
}
export {Rank}
