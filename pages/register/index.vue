<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import { useAuthStore } from "/stores/auth";

const { $event } = useNuxtApp()

function alert() {
    $event('notify', {
        type: 'success',
        message: 'Uspješna prijava.',
    })
}


// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})

// set login layout
definePageMeta({
    layout: 'login'
})

const email = ref('');
const password = ref('');
const username = ref('');
const first_name = ref('');
const last_name = ref('');

async function register() {
    const data = {
        email: email.value,
        password: password.value,
        username: username.value,
        first_name: first_name.value,
        last_name: last_name.value,
        is_admin: false,
    }
    const { error } = await useAuthStore().register(data)
    if (error.value) {
        console.log(error.value, data)
        $event('notify', {
            type: 'error',
            message: 'Neuspješna registracija. Provjerite unesene podatke!',
        })
    }
    else {
        $event('notify', {
            type: 'success',
            message: 'Uspješna registracija.',
        })
    }
};

const isFormValid = computed(() => {
    return email.value && password.value && username.value && first_name.value && last_name.value
})
</script>

<template>
    <section class="max-w-[100vw] min-h-[100vh] bg-cover bg-[#37003c] md:bg-[url('/img/6.png')] bg-gray-900 flex"
       >
        <div class="md:px-4 m-auto max-w-screen-xl text-center my-10">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img class="w-[350px] mr-2" src="/img/4.svg" alt="logo">
                </a>
                <div class="md:w-[55vw] bg-gray-800 rounded-lg shadow md:mt-0 xl:p-0">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1
                            class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white text-left mb-5 md:mb-0">
                            Registracija
                        </h1>
                        <form class="space-y-4 md:space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 ">
                                <div class="md:mr-3">
                                    <label for="first_name" class="block mb-2 text-sm font-medium text-white text-left">
                                        <Icon name="line-md:email-opened-twotone" class="w-4 h-4 mr-1" color="white" />
                                        Ime
                                    </label>
                                    <input type="text" name="first_name" id="first_name" v-model="first_name" required
                                        class="sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
                                </div>
                                <div class="mt-3 md:mt-0">
                                    <label for="last_name" class="block mb-2 text-sm font-medium text-white text-left">
                                        <Icon name="line-md:email-opened-twotone" class="w-4 h-4 mr-1" color="white" />
                                        Prezime
                                    </label>
                                    <input type="text" name="last_name" id="last_name" v-model="last_name" required
                                        class="sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
                                </div>
                            </div>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-white text-left">
                                    <Icon name="line-md:email-opened-twotone" class="w-4 h-4 mr-1" color="white" />
                                    Vaš email
                                </label>
                                <input type="email" name="email" id="email" v-model="email" required
                                    class="sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="name@example.com">
                            </div>
                            <div>
                                <label for="username" class="block mb-2 text-sm font-medium text-white text-left">
                                    <Icon name="line-md:email-opened-twotone" class="w-4 h-4 mr-1" color="white" />
                                    Vaše korisničko ime
                                </label>
                                <input type="text" name="username" id="username" v-model="username" required
                                    class="sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
                            </div>

                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-white text-left">
                                    <Icon name="teenyicons:password-solid" class="w-4 h-4 mr-2" />Lozinka
                                </label>
                                <input type="password" name="password" id="password" placeholder="••••••••" required
                                    v-model="password"
                                    class="sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox"
                                            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">
                                    </div>
                                    <div class="ml-1 md:ml-3 text-sm">
                                        <label for="remember" class="text-gray-500 dark:text-gray-300">Zapamti me
                                        </label>
                                    </div>
                                </div>
                                <a href="#" class="text-sm font-medium hover:underline text-blue-500 pl-3">Zaboravljena
                                    lozinka?</a>
                            </div>
                            <!-- #66006F -->
                            <button type="button" @click="register()" :disabled="!isFormValid"
                                class="w-full text-white bg-blue-500 disabled:bg-opacity-50 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                <Icon name="solar:login-3-bold" class="w-5 h-5 mr-1" />
                                Registrirajte se
                            </button>
                            <p class="text-sm font-regular text-gray-500 dark:text-gray-400 text-left">
                                Imate račun? <nuxt-link to="/login" class="font-medium text-blue-600 hover:underline">Prijavite se</nuxt-link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
