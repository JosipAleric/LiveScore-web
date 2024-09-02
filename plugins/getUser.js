import {useAuthStore} from "~/stores/auth";

export default defineNuxtPlugin(async(nuxtApp) => {
    const authStore = useAuthStore();
    // get current route
    // const route = nuxtApp._route.path;
    if (!process.server) {
        await authStore.getUser()
    }
})
