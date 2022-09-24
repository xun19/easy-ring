export default class CommonEasyRing {
    constructor(props = {}) {
        const { src, loop, log } = props
        this.id = ''
        this.src = src
        this.loop = typeof loop === 'undefined' ? true : loop
        this.log = typeof log === 'undefined' ? true : log
        this.active = false
        this.container = null
        this.audioObject = null
        this.defaultAudioIntervalId = 0
        this.audioCtx = null
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
            if (this.src) {
                this.audioObject.currentTime = 0
                this.audioObject.play()
            } else if (this.defaultAudioIntervalId === 0) {
                this._playDefaultAudio()
            }
        }
    }
    _pause() {
        this._log(`pause the ring(id=${this.id})`)
        if (this.src) {
            this.audioObject.pause()
        } else {
            this._stopDefaultAudio()
        }
    }
    _log(info){
        if (info && this.log)
        console.log(`🌟【EASY-RING LOG】:${info}`)
    }
    _createOscillator(){
        // 参考：https://www.zhangxinxu.com/wordpress/2017/06/html5-web-audio-api-js-ux-voice/
        // 创建音频上下文  
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
    }
    _playOscillator() {
        // 创建音调控制对象  
        var oscillator = this.audioCtx.createOscillator();
        // 创建音量控制对象  
        var gainNode = this.audioCtx.createGain();
        // 音调音量关联  
        oscillator.connect(gainNode);
        // 音量和设备关联  
        gainNode.connect(this.audioCtx.destination);
        // 音调类型指定为正弦波  
        oscillator.type = 'sine';
        // 设置音调频率  
        oscillator.frequency.value = 1546.50; // 587.33;
        // 先把当前音量设为0  
        gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
        // 0.01秒时间内音量从刚刚的0变成1，线性变化 
        gainNode.gain.linearRampToValueAtTime(1, this.audioCtx.currentTime + 0.01);
        // 声音走起 
        oscillator.start(this.audioCtx.currentTime);
        // 1秒时间内音量从刚刚的1变成0.001，指数变化 【音量由小到大，又由大到小，这是创造了一种回音效果吧？模仿了现实的音效】
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 1);
        // 1秒后停止声音 
        oscillator.stop(this.audioCtx.currentTime + 1);
        // console.log('_playOscillator')

        // 创建上下存在限制：The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page）
        // 但是意思好像是在用户交互“之后”（只要用户在页面进行了一个交互以后，就能创建），而不需要一定是在用户交互的回调里创建。这个规则有点奇怪
    }
    _playDefaultAudio() {
        if (!this.audioCtx) {
            this._createOscillator()
        }
        if (this.loop) {
            this.defaultAudioIntervalId = setInterval(() => {
                this._playOscillator()
                setTimeout(() => {
                  this._playOscillator()
                }, 200)
            }, 1000)
        } else {
            this._playOscillator()
            setTimeout(() => {
                this._playOscillator()
            }, 200)
        }
    }
    _stopDefaultAudio() {
        clearInterval(this.defaultAudioIntervalId)
        this.defaultAudioIntervalId = 0
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