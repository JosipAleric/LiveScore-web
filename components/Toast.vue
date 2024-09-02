<script lang="ts" setup>
const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
})

const types = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-yellow-500',
  info: 'bg-blue-500',
}

const icons = {
  success: 'line-md:check-all',
  error: 'line-md:minus-circle',
  warning: 'line-md:alert',
  info: 'line-md:lightbulb',
}
</script>

<template>

  <div id="toast-default" class="flex items-center w-full max-w-xs p-4 dark:text-gray-500 dark:bg-white rounded-lg shadow text-gray-400 bg-gray-800" role="alert">
   <div  :class="types[options.type]" class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 dark:text-blue-500 rounded-lg  text-blue-200">
     <Icon :name="options.icon ? options.icon : icons[options.type]" class="w-6 h-6 text-white" />
   </div>
   <div class="ml-3 text-sm font-normal text-white">{{ options.message }}</div>
   <button @click="$emit('close', options.id)" type="button" class="ml-auto -mx-1.5 -my-1.5 dark:bg-white dark:text-gray-400 dark:hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 dark:hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700" data-dismiss-target="#toast-default" aria-label="Close">
     <span class="sr-only">Close</span>
     <Icon name="line-md:menu-to-close-alt-transition" class="w-4 text-white h-4" />
   </button>
  </div>

</template>

<style scoped></style>
