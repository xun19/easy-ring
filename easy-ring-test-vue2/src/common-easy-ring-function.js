// 应该不存在不支持class的浏览器了吧？
// 暂不考虑低配的浏览器了

export default function(props) {
    this.init = function(props) {
        const { src, loop, log } = props || {}
        this.id = ''
        this.src = src || '/easy-ring-default.wav'
        this.loop = typeof loop === 'undefined' || true
        this.log = typeof log === 'undefined' || true
        this.active = false
        this.container = null
        this.audioObject = null
        this._createAudioId()
        this._createAudioObject()
    }
    this._createAudioId = function() {
        const id = parseInt(Math.random() * 1000000)
        this.id = `easyRing${id}`
    }
    this._createAudioObject = function() {
        this.container = document.createElement('div')
        this.audioObject = document.createElement('audio')
        this.audioObject.id = this.id
        this.audioObject.src = this.src
        this.container.append(this.audioObject)
    }
    this._openRing = function() {
        this._log(`open the ring(id=${this.id})`)
        this.active = true
        this.audioObject.loop = false
        this.audioObject.pause() // 用于开启用户主动播放
    }
    this._stopRing = function() {
        this._log(`close the ring(id=${this.id})`)
        this.active = false
        this.audioObject.pause()
        this.audioObject.currentTime = 0
    }
    this._play = function() {
        this._log(`play the ring(id=${this.id})`)
        if (!this.audioObject.loop) this.audioObject.loop = true
        if (this.active) {
            this.audioObject.currentTime = 0
            this.audioObject.play()
        }
    }
    this._pause = function() {
        this._log(`pause the ring(id=${this.id})`)
        this.audioObject.pause()
    }
    this._log = function(info) {
        if (this.log)
        console.log(`🌟【EASY-RING LOG】:${info}`)
    }
    this.open = function() {
        this._openRing()
    }
    this.close = function() {
        this._stopRing()
    }
    this.ring = function() {
        this._play() 
    }
    this.stop = function() {
        this._pause()
    }

    this.init(props)
}