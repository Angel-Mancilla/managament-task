import Cookie from 'js-cookie'

class AuthService {

    constructor() {

    }

    async getMe() : Promise <Response>
    {   
        const url_api = "http://localhost:8000/api/me"
        return await fetch(url_api,{
            credentials:'include'
        })
    }

    async getTokenCsrf() : Promise <void>
    {
        const url_api_sanctum = "http://localhost:8000/sanctum/csrf-cookie"
        await fetch(url_api_sanctum,{
            credentials: 'include'
        })
    }

    async  tokenDecode() : Promise <string>
    {
        const tokDecode = decodeURIComponent(Cookie.get('XSRF-TOKEN') || '')
        console.log('INTENTANDO OBTENER LA COOKIE');
        return tokDecode
    }
   
    async auth($email:string, $password:string) : Promise <Response>
    {   await this.getTokenCsrf()
        const tokDecode = await this.tokenDecode()
        const url_api = "http://localhost:8000/api/login"

        return await fetch(url_api, {
            method: 'POST',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': tokDecode //decodeURIComponent(Cookie.get('XSRF-TOKEN') || '')
            },
            body: JSON.stringify({
            "email" : $email,
            "password": $password,
            })
        })     
    }

    async logout() 
    {
        const tokDecode = await this.tokenDecode()
        // const tokenDecode =  await this.getTokenCsrf()
        const url_api = "http://localhost:8000/api/logout"

        return await fetch(url_api, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'X-XSRF-TOKEN': tokDecode//decodeURIComponent(Cookie.get('XSRF-TOKEN') || '')
            }
        })
    }
}   

export default AuthService