<template>
    <div v-if="authenticated">
        <button type="button" class="btn btn-outline-danger"  @click="logoutUser">Cerrar sesion</button>    
    </div>
</template>

<script lang="ts" setup>
    import { useAuthStore } from '@/stores/auth';
    import { useRouter } from 'vue-router';

    const auth = useAuthStore()
    const router = useRouter()
    const authenticated = auth.authenticated

    async function logoutUser()
        {
            const success = await auth.logout()
            if(!success){
                alert(await auth.error)
                return
            }
            auth.authenticated = false
            alert( auth.successfully)
            router.push({name: 'auth'})
        }

</script>
<style scoped> </style>