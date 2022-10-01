const{ MusicBox, musicTexts }  = require('./piano')

let React
let h
let useState
let useEffect
try {
  React = require('react')
  h = React.createElement
  useState = React.useState
  useEffect = React.useEffect
  useRef = React.useRef
}
catch(e) {
  console.log('🌟【EASY-RING LOG】:require React fail.（If you are not using React, please ignore this message.）')
}

const EasyRingReactComponent = (props) => {
  const _createAudioId = () => {
    return `easyRing${parseInt(Math.random() * 1000000)}`
  }

  const id = useRef(_createAudioId())
  const [active, setActive] = useState(false)
  const [audioObject, setAudioObject] = useState(null)
  const [musicbox, setMusicbox] = useState(null)
  // let audioObject = null // 与视图无关，实际上并不需要写在state里

  const _openRing = () => {
      _log(`open the ring(id=${id.current})`)
      
      setActive(true)
      audioObject.loop = false
      audioObject.pause() // 用于开启用户主动播放
  }
  const _stopRing = () => {
      _log(`close the ring(id=${id.current})`)
      setActive(false)
      audioObject.pause()
      audioObject.currentTime = 0
  }

  const _play = () => {
      if (!audioObject.loop && props.loop) {
        audioObject.loop = true
      }
      if (active) {
        _log(`play the ring(id=${id.current})`) // 这块日志移入这里来
        if (props.src) {
            audioObject.currentTime = 0
            audioObject.play()
        } else {
            if (props.musicText) {
              musicbox.playMusic(props.musicText)
            } else if(musicTexts[props.defaultMusic]) {
              musicbox.playMusic(musicTexts[props.defaultMusic])
            } else {
              _log(`💔invalid type of defaultMusicText in ths ring(id=${id.current}).`)
            }
        }
      }
  }
  const _pause = () => {
      _log(`pause the ring(id=${id.current})`)
      if (props.src) {
          audioObject.pause()
      } else {
          musicbox.stopMusic()
      }
      props.ended()
  }

  const _log = (info) => {
      if (info && props.log)
      console.log(`🌟【EASY-RING LOG】:${info}`)
  }

  useEffect(() => {
    if (!audioObject) {
      _log('EasyRingReactComponent(function) mounted')
      setAudioObject(document.getElementById(id.current))
      setMusicbox(new MusicBox({
        loop: props.loop,
        endedCallback: props.loop ? () => {} : () => { props.ended() }
      }))
    }
  }, [])

  useEffect(() => {
    if (audioObject) {
      if (!active && props.open) _openRing()
      if (!props.open) _stopRing()
    }
  }, [props.open])

  useEffect(() => {
    if (audioObject) {
      if (props.ring) _play()
      else _pause()
    }
  }, [props.ring])

  return h('div', 
    {
      className: 'easy-ring-container' // 必须用className
    },
    [
        h('audio', {
          id: id.current,
          src: props.src,
          className: 'easy-ring',
          onEnded: () => {
            props.ended()
          },
          key: id.current // 必须给key
        })
    ])
}

EasyRingReactComponent.defaultProps = {
  open: false,
  ring: false,
  src: '',
  loop: true,
  log: true,
  musicText: '',
  defaultMusic: 'EZIOS_FAMILY',
  ended: () => {}
}

module.exports = EasyRingReactComponent