<template>
    <div>
        
        <form >
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label" >Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit"  class="btn btn-primary" @click.prevent="authUser">Submit</button>
        </form>
        <h3>{{ email }} {{ password }}</h3>
    </div>
    
</template>

<script lang="ts" setup>
    import { useAuthStore } from '@/stores/auth'
    import { useRouter } from 'vue-router'
    import {ref} from 'vue'

    const auth = useAuthStore()
    const router = useRouter()
    let email = ref('')
    let password = ref('')
    
    async function authUser() 
    {    
        // console.log('estoy mandando los datos'+email.value + password.value);
        const success = await auth.login(email.value, password.value)
        if(!success){
            alert('Error bro')
            return 
        }
        // authenticated.value = true
        auth.authenticated = true
        alert(auth.successfully)
        router.push({name: 'home'})
        return 
    }
</script>
<style scoped>


</style>