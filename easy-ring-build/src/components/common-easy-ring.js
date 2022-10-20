// 应该不存在不支持class的浏览器了吧？
// 暂不考虑低配的浏览器了

exports.default = class CommonEasyRing {
    constructor(props = {}) {
        const { src, loop, log } = props
        this.id = ''
        this.src = src || './easy-ring-default.wav'
        this.loop = typeof loop === 'undefined' || true
        this.log = typeof log === 'undefined' || true
        this.active = false
        this.container = null
        this.audioObject = null
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
        this._log(`create the ring(id=${this.id})`)
    }
    _openRing() {
        this._log(`open the ring(id=${this.id})`)
        this.active = true
        this.audioObject.loop = false
        this.audioObject.pause() // 用于开启用户主动播放
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
        if (this.active) {
            this.audioObject.currentTime = 0
            this.audioObject.play()
        }
    }
    _pause() {
        this._log(`pause the ring(id=${this.id})`)
        this.audioObject.pause()
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