<template>
    <div>
        <audio id="ringAudio" :src="src"></audio>
    </div>
</template>

<script>
    let audioObject
    export default {
        name: 'easy-ring',
        props: {
            ring: {
                type: Boolean,
                default: false
            },
            src: {
                type: String,
                default: require('./easy-ring-default.wav')
            },
            open: {
                type: Boolean,
                default: false
            }
            // 音量
            // 静音
            // 播放速度
        },
        data: () => ({
            active: false
        }),
        watch: {
            ring(val) {
                if (val) this.play() 
                else this.pause()
            },
            open(val) {
                if (val) this.openRing()
                else this.stopRing() 
            }
        },
        methods: {
            openRing() {
                console.log('easy-ring:open')
                this.active = true
                audioObject.loop = false
                audioObject.pause() // 用于开启用户主动播放
            },
            stopRing() {
                this.active = false
                audioObject.pause()
                audioObject.currentTime = 0
            },
            play() {
                console.log('easy-ring:play')
                if (!audioObject.loop) audioObject.loop = true
                if (this.active) {
                    audioObject.currentTime = 0
                    audioObject.play()
                }
            },
            pause() {
                console.log('easy-ring:pause')
                audioObject.pause()
            }
        },
        mounted() {
            console.log('easy-ring:mounted')
            audioObject = document.getElementById('ringAudio')
        }
    }
</script>