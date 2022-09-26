import MusicBox from './piano';

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
  static defaultProps = { // 想设置props的默认值需要在这里设置
    open: false,
    ring: false,
    src: '',
    loop: true,
    log: true
  }
  constructor(props) {
    super(props) // 必须直接把constructor的props直接传入，不能自己传入任意对象
    this.state = {
      id: this._createAudioId(),
      active: false,
      defaultAudioIntervalId: 0
    }
    this.musicbox = null
    this.audioObject = null // 与视图无关，实际上并不需要写在state里
  }
  _createAudioId() {
      const id = parseInt(Math.random() * 1000000)
      return `easyRing${id}`
  }
  _openRing() {
      this._log(`open the ring(id=${this.state.id})`)
      
      this.setState({
        active: true,
      })
      this.audioObject.loop = false
      this.audioObject.pause() // 用于开启用户主动播放
      this.musicbox = new MusicBox({
        loop: this.props.loop
      })
  }
  _stopRing() {
      this._log(`close the ring(id=${this.state.id})`)
      this.setState({
        active: false
      })
      this.audioObject.pause()
      this.audioObject.currentTime = 0
  }
  _play() {
      this._log(`play the ring(id=${this.state.id})`)
      if (!this.audioObject.loop && this.props.loop) {
        this.audioObject.loop = true
      }
      if (this.state.active) {
        if (this.props.src) {
            this.audioObject.currentTime = 0
            this.audioObject.play()
        } else if (this.state.defaultAudioIntervalId === 0) {
            // this._playDefaultAudio()
            this.musicbox.playMusic('1 2 3 1 - 1 2 3 1 - 3 4 5 - 3 4 5')
        }
      }
  }
  _pause() {
      this._log(`pause the ring(id=${this.state.id})`)
      if (this.props.src) {
          this.audioObject.pause()
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
      oscillator.frequency.value = 1546.50; // 587.33;
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
              }, 250)
          }, 1200)
          this.setState({
            defaultAudioIntervalId
          })
      } else {
          this._playOscillator()
          setTimeout(() => {
              this._playOscillator()
          }, 250)
      }
  }
  _stopDefaultAudio() {
      clearInterval(this.state.defaultAudioIntervalId)
      this.setState({
        defaultAudioIntervalId: 0
      })
  }
  // shouldComponentUpdate(nextProps) { // 等同于watch，只是没那么精细（x）
  //     // shouldComponentUpdate() 方法会返回一个布尔值，指定 React 是否应该继续渲染，默认值是 true，
  //     // 即 state 每次发生变化组件都会重新渲染(触发componentDidUpdate)
  //     // 如果确定state的更改不影响视图，那感觉是可以返回false，不让组件重新渲染的？
  //   }
  //   return false
  // }
  componentDidUpdate(prevProps) { // 触发时机是组件更新，还不是数据更新。但shouldComponentUpdate太快了
    if (this.audioObject) { // componentDidUpdate貌似会立即执行，此时audioObject还未初始化。所以需要在这里加个判断
      // 典型用法（不要忘记比较）
      if (prevProps.ring !== this.props.ring ) {
        if (this.props.ring) this._play()
        else this._pause()
      }
  
      if (prevProps.open !== this.props.open ) {
        if (this.props.open) this._openRing()
        else this._stopRing()
      }

      // “你也可以在 componentDidUpdate() 中直接调用 setState()，但请注意它必须被包裹在一个条件语句里，正如上述的例子那样进行处理，
      // 否则会导致死循环。它还会导致额外的重新渲染，虽然用户不可见，但会影响组件性能。”
    }
  }
  componentDidMount() {
    this._log('mounted')
    const audioObject = document.getElementById(this.state.id)
    // this.setState({
    //   audioObject
    // })
    this.audioObject = audioObject
    // this.audioObject.addEventListener('ended', () => {
    //   this.endHandle()
    // })
  }
  render() { // 用箭头就没法用this了
    return h('div', 
      {
        className: 'easy-ring-container' // 必须用className
      },
      [
          h('audio', {
            id: this.state.id,
            src: this.props.src,
            className: 'easy-ring',
            key: this.state.id // 必须给key
          }),
          h('div', {
            id: `${this.state.id}piano`,
            key: `${this.state.id}piano` // 必须给key
          })
      ])
  }
}

export default REasyRing