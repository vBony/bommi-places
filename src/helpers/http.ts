import axios from 'axios'
class Http {    
    public serverUrl = import.meta.env.VITE_SERVER_URL

    post(type:string, url:string, data:object, config:object){
        axios({
            method: type,
            url: this.serverUrl+url,
            data: data,
            headers: {
               'Access-Control-Allow-Origin': '*',
               'Content-type': 'application/json',
            }
        })
    }
}

export default Http
