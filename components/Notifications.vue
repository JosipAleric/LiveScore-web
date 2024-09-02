<script setup lang="ts">
const { $listen } = useNuxtApp()

const notifications = ref([])
const defaultNotification = {
    message: 'Uspiješna operacija',
    type: 'success',
}

$listen('notify', (data) => {
    // assing random id to the notification and merge it with default notification
    const newNotification = { ...defaultNotification, ...data as Object, id: Math.random() }
    // add notification to the array
    notifications.value.push(newNotification)

    // remove notification after 5 seconds
    setTimeout(() => {
        notifications.value = notifications.value.filter(
            (notification: any) => notification.id !== newNotification.id
        )
    }, 4000)
})


const closeNotification = (id: number) => {
    notifications.value = notifications.value.filter(
        (notification: any) => notification.id !== id
    )
}
</script>

<template>
    <div class="fixed top-20 transition-all ease-in-out right-5 flex flex-col" style="z-index: 100000">
        <Toast @close="closeNotification" class="my-2" v-for="(notification, index) in notifications"
            :options="notification" />
    </div>
</template>

<style scoped></style>
