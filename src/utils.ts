
const defaultHeaders = {
    'Content-Type': 'application/json'
}
function customFetch(endpoint: string = '', method: string | undefined  = 'GET', headers: {[key : string]: string} | undefined = {}, payload: any){
   return  fetch(`https://ansha-smart-brain-api.herokuapp.com/${endpoint}`, {
        method,
        headers: {
            ...defaultHeaders,
            ...headers
        },
        body: method === 'GET' ? '' :  JSON.stringify(payload)
    }).then(response => response.json())
}

export {customFetch}
