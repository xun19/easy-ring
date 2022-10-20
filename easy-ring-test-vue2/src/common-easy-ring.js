import { MusicBox, musicTexts } from './components/piano';
export default class CommonEasyRing {
    constructor(props = {}) {
        const { src, loop, log, musicText, defaultMusic } = props
        this.id = ''
        this.src = src
        this.loop = typeof loop === 'undefined' ? true : loop
        this.log = typeof log === 'undefined' ? true : log
        this.active = false
        this.isPlaying = false 
        this.container = null
        this.audioObject = null
        this.musicText = musicText || ''
        this.defaultMusic =  defaultMusic || 'EZIOS_FAMILY'
        this.musicbox = null
        this._createAudioId()
        this._createAudioObject()
    }
    _createAudioId() {
        const id = parseInt(Math.random() * 1000000)
        this.id = `easyRing${id}`
    }
    _createAudioObject() {
        this.container = document.createElement('div')
        this.audioObject = document.createElement('audio')
        this.audioObject.id = this.id
        this.audioObject.src = this.src
        this.container.append(this.audioObject)
    }
    _openRing() {
        this._log(`open the ring(id=${this.id})`)
        this.active = true
        this.audioObject.loop = false
        this.audioObject.pause() // 用于开启用户主动播放
        this.musicbox = new MusicBox({
            loop: this.loop,
            endedCallback: this.loop ? () => {} : () => { this.isPlaying = false  }
        })
    }
    _stopRing() {
        this._log(`close the ring(id=${this.id})`)
        this.active = false
        this.audioObject.pause()
        this.audioObject.currentTime = 0
    }
    _play() {
        this._log(`play the ring(id=${this.id})`)
        if (!this.audioObject.loop && this.loop) this.audioObject.loop = true
        if (this.active && !this.isPlaying) {
            this.isPlaying = true
            if (this.src) {
                this.audioObject.currentTime = 0
                this.audioObject.play()
            } else {
                if (this.musicText) {
                  this.musicbox.playMusic(this.musicText)
                } else if(musicTexts[this.defaultMusic]) {
                  this.musicbox.playMusic(musicTexts[this.defaultMusic])
                } else {
                  this._log(`💔invalid type of defaultMusicText in ths ring(id=${this.id}).`)
                }
            }
        }
    }
    _pause() {
        this._log(`pause the ring(id=${this.id})`)
        this.isPlaying = false
        if (this.src) {
            this.audioObject.pause()
        } else {
            this.musicbox.stopMusic()
        }
    }
    _log(info){
        if (info && this.log)
        console.log(`🌟【EASY-RING LOG】:${info}`)
    }
    open() {
        this._openRing()
    }
    close() {
        this._stopRing()
    }
    ring() {
        this._play() 
    }
    stop() {
        this._pause()
    }
}