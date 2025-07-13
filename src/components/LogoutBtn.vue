<template>
     <div > <!--v-if="authenticated" -->
        <button type="button" class="btn btn-outline-danger"  @click="logoutUser">Cerrar sesion</button>    
    </div>
</template>

<script lang="ts" setup>
    import { useAuthStore } from '@/stores/auth';
    import { useRouter } from 'vue-router';
    import {ref} from 'vue'

    const auth = useAuthStore()
    const router = useRouter()
    // let authenticated = ref(auth.isAuthenticated)
    // authenticated = ref(auth.authenticated)

    async function logoutUser()
        {
            const success = await auth.logout()
            if(!success){
                alert(await auth.error)
                return
            }

            // auth.user = null
            console.log(auth.user);
            
            //  auth.authenticated = false
            alert( auth.successfully)
            router.push({name: 'auth'})
        }

</script>
<style scoped> </style>