import mitt from 'mitt'

export default defineNuxtPlugin(() => {
    const emitter = mitt()

    return {
        provide: {
            event: emitter.emit, // Will emit an event
            listen: emitter.on, // Will register a listener for an event
            destroy: emitter.off // Will remove a listener for an event
        }
    }
})
