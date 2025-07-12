import  AuthService from '@/service/AuthService'
import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useAuthStore = defineStore('auth', () => {
     const user = ref(null)
     const error = ref('')
     const successfully = ref('')
     const authenticated = ref(false)


     const authService = new AuthService()

    async function login(email:string, password:string) : Promise <boolean>
    {   
        try {
            const response = await authService.auth(email, password)
            if(!response.ok){
                const data = await response.json()
                error.value = data.message || 'dio un error pero no cargo el error que envio el server backend'
                return false
            }
            const data = await response.json()
            user.value = data
            successfully.value = data.message
            return true    
        } catch (e) {
            error.value = 'Error inesperado en la peticion'
            return false
        }
        
        
    }

    async function logout() 
    {
        try {
            const response = await authService.logout()
            if(!response.ok){
                const data = await response.json()
                error.value = data.message || 'error al cerrar sesion (store)'
                // console.log(error);
                
                return false
            }
            const data = await response.json()
            successfully.value = data.message
            // console.log(successfully);
            
            user.value = null
            return true
        } catch (e) {
            error.value = 'error inesperado en la peticion (store)'
            console.log(error);
            
            return false
        }
    }

    return {user, error, authenticated, successfully, login, logout}
})