<script setup>
import { initFlowbite } from 'flowbite'

let socket = ref(null)
const message = ref('')

const live_matches = ref()
const show_alert = ref(true)
async function getLiveMatches() {
    const response = await useApi('/matches/live_matches', {
        method: 'GET',
    })
    live_matches.value = response.data.value
    if (live_matches.value.length > 0) {
        show_alert.value = false
    }
    console.log(live_matches.value)
}

onMounted(() => {
    initFlowbite();
    setTimeout(() => {
        getLiveMatches()
    }, 100);
    socket = new WebSocket('ws://localhost:8000/match_events')
    socket.onopen = () => {
        //console.log('WebSocket connection opened')
    }

    socket.onmessage = (event) => {
        try {
            let formatted_event = event.data.replace(/'/g, '"')
            let data = JSON.parse(formatted_event)
            message.value = data

            if (data.goals) {
                live_matches.value.forEach(match => {
                    if (match.id == data.match_id) {
                        match.match_results[0].home_team_goals = data.goals.home_team_goals
                        match.match_results[0].away_team_goals = data.goals.away_team_goals
                    }
                })
            }
        } catch (error) {
            console.error(error)
        }
    }
})

onUnmounted(() => {
    if (socket) {
        socket.close()
    }
})

</script>


<template>
    <div class="bg-[#350038] min-h-[100vh]">
        <div class="pt-20 gap-x-10 hidden md:flex">
            <div
                class="text-lg font-medium whitespace-nowrap text-white  hover:cursor-pointer hover:scale-110 transition duration-500">
                Početna</div>
            <div
                class="text-lg font-medium whitespace-nowrap text-white  hover:cursor-pointer hover:scale-110 transition duration-500">
                Prethonde utakmice</div>
            <div
                class="text-lg font-medium whitespace-nowrap text-white  hover:cursor-pointer hover:scale-110 transition duration-500">
                Klubovi</div>
            <div
                class="text-lg font-medium whitespace-nowrap text-white  hover:cursor-pointer hover:scale-110 transition duration-500">
                Igrači</div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-[50px]">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg md:col-span-2">
                <div class="text-white text-lg font-medium pb-5 pl-2 flex items-center">
                    <div class="h-2 w-2 rounded-full bg-white me-2"></div>
                    Utakmice uživo
                </div>

                <div class="text-white text-2xl font-semibold" v-if="show_alert">
                    <div class="flex items-center p-4 mb-4 text-sm text-fuchsia-800 rounded-lg bg-white" role="alert">
                        <Icon name="ep:info-filled" class="w-6 h-6 mr-2" />
                        <span class="sr-only">Info</span>
                        <div class="font-bold">
                            Trenutno nema dostupnih utakmica uživo.
                        </div>
                    </div>
                </div>
                <div class="flex items-center mb-5 grid grid-cols-1 md:grid-cols-2 gap-x-5" v-else>
                    <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full"
                        v-for="match in live_matches">
                        <div class="grid grid-cols-3">
                            <div class="flex flex-col py-7 items-center justify-center">
                                <img class="w-12 h-12 mb-3 rounded-full shadow-lg"
                                    src="https://i.pinimg.com/736x/ec/35/f8/ec35f8366779e0f2918bd5f61e04964f.jpg" />
                                <h5 class="mb-1 text-lg font-medium text-gray-900 dark:text-white">{{ match.home_team }}
                                </h5>
                            </div>

                            <div class="flex flex-col justify-center items-center">
                                <div class="flex items-center text-red-500">
                                    <span class="relative flex h-3 w-3 mr-2">
                                        <span
                                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                    </span>
                                    <div class="text-md font-bold">Live</div>
                                </div>
                                <div class="text-2xl font-bold mt-2 mb-3">{{ match.match_results[0].home_team_goals }} :
                                    {{ match.match_results[0].away_team_goals }}</div>
                                <span
                                    class="px-3 md:px-4 py-1.5 text-xs font-bold text-green-600 bg-green-300 rounded-xl text-center">
                                    {{ match.stadium }} stadion</span>
                            </div>

                            <div class="flex flex-col py-7 items-center justify-center">
                                <img class="w-12 h-12 mb-3 rounded-full shadow-lg"
                                    src="https://e7.pngegg.com/pngimages/287/555/png-clipart-manchester-city-f-c-manchester-city-w-f-c-premier-league-2011-fa-cup-final-premier-league-text-trademark.png" />
                                <h5 class="mb-1 text-lg font-medium text-gray-900 dark:text-white text-center">{{
                                    match.away_team }}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="shadow-md relative overflow-hidden rounded-lg">
                    <div class="text-white text-lg font-medium pb-5 pl-2 flex items-center pt-5">
                        <div class="h-2 w-2 rounded-full bg-white me-2"></div>
                        Tablica
                    </div>
                    <div
                        class="flex items-center justify-between !rounded-t-lg flex-column px-5 pt-4 flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                        <div class="flex items-center">
                            <img src="https://www.premierleague.com/resources/rebrand/v7.146.5/i/elements/pl-main-logo.png"
                                class="h-12 mr-3">
                            <div class="text-xl text-secondary font-bold">FA Premier liga</div>
                        </div>
                        <div class="relative">
                            <nuxt-link>
                                <button type="button"
                                    class="text-white font-semibold bg-secondary transition duration-800 hover:bg-secondary hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    <Icon name="basil:login-solid" class="w-5 h-5 mr-0.5" />
                                    Pogledaj sve klubove
                                </button>
                            </nuxt-link>
                        </div>
                    </div>
                    <table class="w-full text-sm text-left rtl:text-right !rounded-lg text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Naziv kluba
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Zemlja
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Liga
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Stadion
                                </th>
                            </tr>
                        </thead>
                        <tbody class="w-full">
                            <tr
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row"
                                    class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <img class="w-10 h-10 rounded-full"
                                        src="https://e7.pngegg.com/pngimages/287/555/png-clipart-manchester-city-f-c-manchester-city-w-f-c-premier-league-2011-fa-cup-final-premier-league-text-trademark.png"
                                        alt="Jese image">
                                    <div class="ps-3">
                                        <div class="text-base font-semibold">Manchester City</div>
                                    </div>
                                </th>
                                <td class="px-6 py-4">
                                    Engleska
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center">
                                        <div class="h-2.5 w-2.5 rounded-full bg-secondary me-2"></div> Engleska premier
                                        liga
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <a href="#"
                                        class="font-medium text-secondary dark:text-blue-500 hover:underline">Etihad
                                        stadion</a>
                                </td>
                            </tr>
                            <tr
                                class="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row"
                                    class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <img class="w-10 h-10 rounded-full"
                                        src="https://i.pinimg.com/736x/ec/35/f8/ec35f8366779e0f2918bd5f61e04964f.jpg"
                                        alt="Jese image">
                                    <div class="ps-3">
                                        <div class="text-base font-semibold">Liverpool</div>
                                    </div>
                                </th>
                                <td class="px-6 py-4">
                                    Engleska
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center">
                                        <div class="h-2.5 w-2.5 rounded-full bg-secondary me-2"></div> Engleska premier
                                        liga
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <a href="#"
                                        class="font-medium text-secondary dark:text-blue-500 hover:underline">Anfield
                                        stadion</a>
                                </td>
                            </tr>
                            <tr
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row"
                                    class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <img class="w-10 h-10  rounded-xl"
                                        src="https://w7.pngwing.com/pngs/997/289/png-transparent-manchester-united-logo-food-text-sport.png"
                                        alt="Jese image">
                                    <div class="ps-3">
                                        <div class="text-base font-semibold">Manchester United</div>
                                    </div>
                                </th>
                                <td class="px-6 py-4">
                                    Engleska
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center">
                                        <div class="h-2.5 w-2.5 rounded-full bg-secondary me-2"></div> Engleska premier
                                        liga
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <a href="#"
                                        class="font-medium text-secondary dark:text-blue-500 hover:underline">Old
                                        Trafford</a>
                                </td>
                            </tr>
                            <tr
                                class="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row"
                                    class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <img class="w-10 h-10 rounded-full"
                                        src="https://e7.pngegg.com/pngimages/893/423/png-clipart-emirates-stadium-arsenal-f-c-arsenal-l-f-c-fa-community-shield-reading-f-c-women-arsenal-f-c-cdr-emblem.png"
                                        alt="Jese image">
                                    <div class="ps-3">
                                        <div class="text-base font-semibold">Arsenal</div>
                                    </div>
                                </th>
                                <td class="px-6 py-4">
                                    Engleska
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center">
                                        <div class="h-2.5 w-2.5 rounded-full bg-secondary me-2"></div> Engleska premier
                                        liga
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <a href="#"
                                        class="font-medium text-secondary dark:text-blue-500 hover:underline">Emirates
                                        stadion</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <img src="/img/logo.png" alt="" class="mx-auto mt-10 mb-10 md:mb-0">
            </div>
        </div>
    </div>
</template>