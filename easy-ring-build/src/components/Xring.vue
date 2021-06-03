<template>
    <div>
        <audio id="audio" :src="src"></audio>
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
                default: require('./1.wav')
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
                this.active = true
                audioObject.loop = false
                audioObject.play() // 用于开启用户主动播放
            },
            stopRing() {
                this.active = false
                audioObject.pause()
                audioObject.currentTime = 0
            },
            play() {
                console.log('播放')
                if (!audioObject.loop) audioObject.loop = true
                if (this.active) {
                    audioObject.currentTime = 0
                    audioObject.play()
                }
            },
            pause() {
                console.log('暂停')
                audioObject.pause()
            }
        },
        mounted() {
            console.log('mounted')
            audioObject = document.getElementById('audio')
        }
    }
</script>