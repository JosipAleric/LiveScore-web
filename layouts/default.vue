<script setup>
import { initFlowbite } from 'flowbite'

import { ref, onMounted, onUnmounted } from 'vue'


onMounted(() => {
  initFlowbite();
})

</script>

<template>
    <div class="bg-primary w-full">
        <Notifications></Notifications>
        <div class="md:max-w-[80vw] md:mx-auto px-5">
            <Navbar></Navbar>
            <slot />
        </div>
    </div>
</template>