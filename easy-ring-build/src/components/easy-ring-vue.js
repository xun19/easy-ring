// import Vue from 'vue'
// import from './1.wav'

const createAudioId = () => {
  const id = parseInt(Math.random() * 1000000)
  return `easyRing${id}`
}

const EasyRingComponent = {
  // template: '<div><audio></audio><input/></div>', // template没用？
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
    },
    loop: {
        type: Boolean,
        default: true
    },
    log: {
        type: Boolean,
        default: true
    }
  },
  data: () => ({
    id: createAudioId(),
    active: false,
    audioObject: null
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
          this._log(`open the ring(id=${this.id})`)
          this.active = true
          this.audioObject.loop = false
          this.audioObject.pause() // 用于开启用户主动播放
      },
      stopRing() {
          this._log(`close the ring(id=${this.id})`)
          this.active = false
          this.audioObject.pause()
          this.audioObject.currentTime = 0
      },
      play() {
          this._log(`play the ring(id=${this.id})`)
          if (!this.audioObject.loop && this.$props.loop) this.audioObject.loop = true
          if (this.active) {
              this.audioObject.currentTime = 0
              this.audioObject.play()
          }
      },
      pause() {
          this._log(`pause the ring(id=${this.id})`)
          this.audioObject.pause()
      },
      _log(info) {
          if (info && this.$props.log)
          console.log(`🌟【EASY-RING LOG】:${info}`)
      },
      endHandle() {
        this._log('end')
        if (!this.$props.loop) {
          this.$emit('update:ring', false)
        }
      }
  },
  mounted() {
      this._log('mounted')
      this.audioObject = document.getElementById(this.id)
      this.audioObject.addEventListener('ended', () => {
        this.endHandle()
      })
  },
  render(h) { // 用箭头就没法用this了
    return h('div', 
      {
        class: 'easy-ring-container'
      },
      [
        h('audio', {
          attrs: {
            id: this.id,
            src: this.src
          },
          class: 'easy-ring'
          // onEnded() { // 事件监听器应以 onXxx 的形式书写
          //   this.endHandle()
          // }
          // prop 的可选参数都是啥啊？只有class和src？
        })
    ])
  }
}

exports.default = EasyRingComponent