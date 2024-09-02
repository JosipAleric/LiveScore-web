import {navigateTo} from "nuxt/app";

export const useAuthStore = defineStore('auth', () => {
    const user = ref() 
    const isLoggedIn = computed(() => !!user.value)

    const config = useRuntimeConfig()
    const getUser = async () => {
        let token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
        //typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
        if (!token) {
            return
        }
        
        const { data, error } = await useApi('/users/get_current_user', {
            method: 'GET',
            headers: {
                // set access token in headers
                Authorization: `Bearer ${token}`
            }

        })
        // if error redirect to /login
        if (error.value) {
            return navigateTo('/login')
        }
        user.value = data
        return data
    }

    const login = async (credentials) => {
        const { data, error } = await useApi('/users/login', {
            method: 'POST',
            body: {
                ...credentials
            }
        })
        //user.value = data.value as User   
        if (error.value) {
            return { error }
        }
        else {
            localStorage.setItem('accessToken', data.value.access_token)
            await getUser();
            navigateTo('/')
            return { data }
        }
    }

    const register = async (credentials) => {
        const { data, error } = await useApi('/users/register', {
            method: 'POST',
            body: {
                ...credentials
            }
        })
        //user.value = data.value as User   
        if (error.value) {
            return { error }
        }
        navigateTo('/login')
    }

    const logout = async () => {
        let token = localStorage.getItem('accessToken')
        const {data, error} = await useApi('/users/logout', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        localStorage.removeItem('accessToken')
        user.value = null
        return { data, error }
    }

    return {
        user,
        isLoggedIn,
        getUser,
        logout,
        login,
        register
    }
})
