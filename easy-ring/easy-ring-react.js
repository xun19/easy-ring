/* eslint-disable */
const{ MusicBox, musicTexts }  = require('./piano')

let React
let h
try {
  React = require('react')
  h = React.createElement
}
catch(e) {
  console.log('require React fail.')
}

class EasyRingReactComponent extends React.Component {
  static defaultProps = { // 想设置props的默认值需要在这里设置
    open: false,
    ring: false,
    src: '',
    loop: true,
    log: true,
    musicText: '',
    defaultMusic: 'EZIOS_FAMILY',
    ended: () => {}
   }
  constructor(props) {
    super(props) // 必须直接把constructor的props直接传入，不能自己传入任意对象
    this.state = {
      id: this._createAudioId(),
      active: false
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
        loop: this.props.loop,
        endedCallback: this.props.loop ? () => {} : () => { this.props.ended() }
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
        } else {
            if (this.props.musicText) {
              this.musicbox.playMusic(this.props.musicText)
            } else if(musicTexts[this.props.defaultMusic]) {
              this.musicbox.playMusic(musicTexts[this.props.defaultMusic])
            } else {
              this._log(`💔invalid type of defaultMusicText in ths ring(id=${this.state.id}).`)
            }
        }
      }
  }
  _pause() {
      this._log(`pause the ring(id=${this.state.id})`)
      if (this.props.src) {
          this.audioObject.pause()
      } else {
          this.musicbox.stopMusic()
      }
      this.props.ended()
  }
  _log(info){
      if (info && this.props.log)
      console.log(`🌟【EASY-RING LOG】:${info}`)
  }
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

module.exports = EasyRingReactComponent