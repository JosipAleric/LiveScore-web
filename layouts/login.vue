<script setup>
import { initFlowbite } from 'flowbite'

onMounted(() => {
    initFlowbite();
})
</script>

<template>
    <div>
        <Notifications></Notifications>
        <slot></slot>
    </div>
</template>