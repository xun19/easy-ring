const{ MusicBox, musicTexts }  = require('./piano')

let vue3h
try {
  const vue = require('vue')
  vue3h = vue.h
}
catch(e) {
  console.log('🌟【EASY-RING LOG】:require h() fail.（If you are not using Vue3, please ignore this message.）')
}

const createAudioId = () => {
  const id = parseInt(Math.random() * 1000000)
  return `easyRing${id}`
}

const EasyRingVueComponent = {
  // template: '<div><audio></audio><input/></div>', // template没用？
  props: {
    ring: {
        type: Boolean,
        default: false
    },
    src: {
        type: String,
        default: ''
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
    },
    musicText: {
        type: String,
        default: ''
    },
    defaultMusic: {
        type: String,
        default: 'EZIOS_FAMILY'
    }
  },
  data: () => ({
    id: createAudioId(),
    active: false,
    audioObject: null,
    musicbox: null
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
          // TODO: 还可以优化
          this._log(`open the ring(id=${this.id})`)
          this.active = true
          this.audioObject.loop = false
          this.audioObject.pause() // 用于开启用户主动播放
          this.musicbox = new MusicBox({
            loop: this.$props.loop,
            endedCallback: this.$props.loop ? () => {} : () => { this.endHandle() }
          })
      },
      stopRing() {
          // TODO: 还可以优化
          this._log(`close the ring(id=${this.id})`)
          this.active = false
          this.audioObject.pause()
          this.audioObject.currentTime = 0
      },
      play() {
          this._log(`play the ring(id=${this.id})`) // this.props 要写成 this.$props
          if (!this.audioObject.loop && this.$props.loop) this.audioObject.loop = true
          if (this.active) {
              if (this.$props.src) {
                this.audioObject.currentTime = 0
                this.audioObject.play()
              } else {
                if (this.$props.musicText) {
                  this.musicbox.playMusic(this.$props.musicText)
                } else if(musicTexts[this.$props.defaultMusic]) {
                  this.musicbox.playMusic(musicTexts[this.$props.defaultMusic])
                } else {
                  this._log(`💔invalid type of defaultMusicText in ths ring(id=${this.state.id}).`)
                }
              }
          }
      },
      pause() {
          if (this.$props.src) {
            this._log(`pause the ring(id=${this.id})`)
            this.audioObject.pause()
          } else {
            this.musicbox.stopMusic()
          }
      },
      _log(info) {
          if (info && this.$props.log)
          console.log(`🌟【EASY-RING LOG】:${info}`)
      },
      endHandle() {
        this._log('end')
        if (!this.$props.loop) {
          this.$emit('update:ring', false)
          this.$emit('ended')
        }
      }
  },
  mounted() {
      this._log('EasyRingVueComponent mounted')
      this.audioObject = document.getElementById(this.id)
      this.audioObject.addEventListener('ended', () => {
        this.endHandle()
      })
  },
  render(_h) { // 用箭头就没法用this了
    const h = vue3h || _h
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
          id: this.id,
          src: this.src,
          class: 'easy-ring'
          // onEnded() { // 事件监听器应以 onXxx 的形式书写
          //   this.endHandle()
          // }
          // prop 的可选参数都是啥啊？只有class和src？
        })
    ])
  }
}

module.exports = EasyRingVueComponent