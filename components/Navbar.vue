<script setup>
import { initFlowbite } from 'flowbite'
import { useAuthStore } from "/stores/auth";

const { $event } = useNuxtApp()

onMounted(() => {
    initFlowbite();
    fetchUser();
})

// fetch user data from store
const auth = useAuthStore()
const user = ref(null);
const loaded = ref(false);
async function fetchUser() {
    user.value = await auth.getUser();
}

setTimeout(() => {
    fetchUser();
    loaded.value = true;
}, 500);


async function logout() {
    const error = await auth.logout();
    fetchUser();
    if (error.value) {
        $event('notify', {
            type: 'error',
            message: 'Nešto je pošlo krivo!',
        })
    }
    else {
        $event('notify', {
            type: 'success',
            message: 'Uspješna odjava.',
        })
    }
}
</script>

<template>
    <nav class="bg-[#350038] pt-20 container">
        <div class="flex flex-wrap justify-between items-center">
            <div class="flex items-center">
                <img src="/img/4.svg" class="m-auto h-[40px] mr-3">
                <Icon name="line-md:chevron-down" color="white" class="w-6 h-6" />
            </div>
            <div class="flex items-center hidden md:flex" v-if="!user">
                <!-- <Icon name="fluent:search-28-filled" color="white" class="h-6 w-6 mr-7" /> -->
                <nuxt-link to="/login">
                    <button type="button"
                        class="text-white font-semibold transition duration-800 hover:bg-secondary hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
                        <!-- <Icon name="basil:login-solid" class="w-5 h-5 mr-0.5"/> -->
                        Login
                    </button>
                </nuxt-link>
                <!-- <Icon name="ic:baseline-account-circle" color="white" class="h-6 w-6"/> -->
                <nuxt-link to="/register">
                    <button type="button"
                        class="text-primary font-semibold bg-gray-200 transition duration-800 hover:bg-secondary hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
                        <!-- <Icon name="basil:login-solid" class="w-5 h-5 mr-0.5"/> -->
                        Registracija
                    </button>
                </nuxt-link>
            </div>

            <div class="flex items-center hidden md:flex" v-if="user">
                <div class="text-white pr-4 pb-2">
                    {{ user.value.first_name }} {{ user.value.last_name }}
                </div>
                <button type="button" @click="logout()"
                    class="text-primary font-semibold bg-gray-200 transition duration-800 hover:bg-secondary hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full text-sm pr-5 pl-3 py-2.5 text-center me-2 mb-2">
                    <Icon name="basil:login-solid" class="w-5 h-5 mr-0.5" />
                    Odjava
                </button>
            </div>

            <button data-collapse-toggle="navbar-default" type="button"
                class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-800 rounded-lg md:hidden"
                aria-controls="navbar-default" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <Icon name="ri:menu-3-line" color="white" class="w-7 h-7" />
            </button>
            <div class="hidden w-full bg-gray-50 rounded-lg mx-3 mt-5" id="navbar-default">
                <ul
                    class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50  rtl:space-x-reverse">
                    <li>
                        <a href="#" class="block py-2.5 px-3 text-white bg-secondary rounded-lg"
                            aria-current="page">Početna</a>
                    </li>
                    <li>
                        <a href="#" class="block py-2 px-3 text-gray-900 rounded">Prethonde utakmice</a>
                    </li>
                    <li>
                        <a href="#" class="block py-2 px-3 text-gray-900 rounded">Klubovi</a>
                    </li>
                    <li>
                        <a href="#" class="block py-2 px-3 text-gray-900 rounded">Igrači</a>
                    </li>
                </ul>
                <div>
                    <div class="flex items-center md:hidden justify-between px-5" v-if="user">
                        <div class="text-secondary font-bold pr-4 pb-2 flex items-center">
                            <Icon name="uil:user" color="#640a69" class="h-5 w-5 mr-1"></Icon>
                            <div>
                                {{ user.value.first_name }} {{ user.value.last_name }}
                            </div>
                        </div>
                        <button type="button" @click="logout()"
                            class="text-white font-semibold bg-secondary transition duration-800 hover:bg-secondary hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full text-sm pr-5 pl-3 py-2.5 text-center me-2 mb-2">
                            <Icon name="basil:login-solid" class="w-5 h-5 mr-0.5" />
                            Odjava
                        </button>
                    </div>

                    <div class="flex items-center md:hidden justify-center" v-if="!user">
                        <!-- <Icon name="fluent:search-28-filled" color="white" class="h-6 w-6 mr-7" /> -->
                        <nuxt-link to="/login">
                            <button type="button"
                                class="text-secondary font-semibold border-2 border-primary hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
                                <!-- <Icon name="basil:login-solid" class="w-5 h-5 mr-0.5"/> -->
                                Login
                            </button>
                        </nuxt-link>
                        <!-- <Icon name="ic:baseline-account-circle" color="white" class="h-6 w-6"/> -->
                        <nuxt-link to="/register">
                            <button type="button"
                                class="text-white font-semibold bg-secondary transition duration-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
                                <!-- <Icon name="basil:login-solid" class="w-5 h-5 mr-0.5"/> -->
                                Registracija
                            </button>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>