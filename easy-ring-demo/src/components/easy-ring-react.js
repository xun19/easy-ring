let React
let h
try {
  React = require('react')
  h = React.createElement
}
catch(e) {
  console.log('require React fail.')
}

class REasyRing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      active: false,
      audioObject: null,
      defaultAudioIntervalId: 0
    }
    this._createAudioId()
  }
  _createAudioId() {
      const id = parseInt(Math.random() * 1000000)
      this.setState({
        id: `easyRing${id}`
      })
  }
  _openRing() {
      this._log(`open the ring(id=${this.state.id})`)
      this.state.active = true
      this.state.audioObject.loop = false
      this.state.audioObject.pause() // 用于开启用户主动播放
  }
  _stopRing() {
      this._log(`close the ring(id=${this.state.id})`)
      this.state.active = false
      this.state.audioObject.pause()
      this.state.audioObject.currentTime = 0
  }
  _play() {
      this._log(`play the ring(id=${this.id})`)
      if (!this.state.audioObject.loop && this.props.loop) {
        this.state.audioObject.loop = true
      }
      if (this.state.active) {
        if (this.props.src) {
            this.state.audioObject.currentTime = 0
            this.state.audioObject.play()
        } else if (this.state.defaultAudioIntervalId === 0) {
            this._playDefaultAudio()
        }
      }
  }
  _pause() {
      this._log(`pause the ring(id=${this.id})`)
      if (this.props.src) {
          this.state.audioObject.pause()
      } else {
          this._stopDefaultAudio()
      }
  }
  _log(info){
      if (info && this.props.log)
      console.log(`🌟【EASY-RING LOG】:${info}`)
  }
  _playOscillator() {
      // 参考：https://www.zhangxinxu.com/wordpress/2017/06/html5-web-audio-api-js-ux-voice/
      // 创建音频上下文  
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      var audioCtx = new AudioContext();
      // 创建音调控制对象  
      var oscillator = audioCtx.createOscillator();
      // 创建音量控制对象  
      var gainNode = audioCtx.createGain();
      // 音调音量关联  
      oscillator.connect(gainNode);
      // 音量和设备关联  
      gainNode.connect(audioCtx.destination);
      // 音调类型指定为正弦波  
      oscillator.type = 'sine';
      // 设置音调频率  
      oscillator.frequency.value = 1046.50; // 587.33;
      // 先把当前音量设为0  
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      // 0.01秒时间内音量从刚刚的0变成1，线性变化 
      gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
      // 声音走起 
      oscillator.start(audioCtx.currentTime);
      // 1秒时间内音量从刚刚的1变成0.001，指数变化 【音量由小到大，又由大到小，这是创造了一种回音效果吧？模仿了现实的音效】
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
      // 1秒后停止声音 
      oscillator.stop(audioCtx.currentTime + 1);
      // console.log('_playOscillator')

      // 创建上下存在限制：The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page）
      // 但是意思好像是在用户交互“之后”（只要用户在页面进行了一个交互以后，就能创建），而不需要一定是在用户交互的回调里创建。这个规则有点奇怪
  }
  _playDefaultAudio() {
      if (this.props.loop) {
          const defaultAudioIntervalId = setInterval(() => {
              this._playOscillator()
              setTimeout(() => {
                this._playOscillator()
              }, 500)
          }, 2000)
          this.setState({
            defaultAudioIntervalId
          })
      } else {
          this._playOscillator()
          setTimeout(() => {
              this._playOscillator()
          }, 500)
      }
  }
  _stopDefaultAudio() {
      clearInterval(this.state.defaultAudioIntervalId)
      this.setState({
        defaultAudioIntervalId: 0
      })
  }
  shouldComponentUpdate(nextProps) { // 等同于watch，只是没那么精细
    const { open, ring } = nextProps
    if (open) {
      this._play()
    } 
    else {
      this._pause()
    }

    if (ring) {
      this._openRing()
    }
    else {
      this._stopRing()
    }
  }
  componentDidMount() {
    this._log('mounted')
    const audioObject = document.getElementById(this.state.id)
    this.setState({
      audioObject
    })
    // this.audioObject.addEventListener('ended', () => {
    //   this.endHandle()
    // })
  }
  render() { // 用箭头就没法用this了
    return h('div', 
      {
        class: 'easy-ring-container'
      },
      [
        h('audio', {
          id: this.state.id,
          src: this.props.src,
          class: 'easy-ring'
          // onEnded() { // 事件监听器应以 onXxx 的形式书写(x)
          //   this.endHandle()
          // }
          // prop 的可选参数都是啥啊？只有class和src？
        })
    ])
  }
}

export default REasyRing