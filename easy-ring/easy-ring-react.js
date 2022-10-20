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
  const musicbox = useRef(null)

  const _openRing = () => {
      _log(`open the ring(id=${id.current})`)
      
      setActive(true)
      audioObject.loop = false
      audioObject.pause() // 用于开启用户主动播放
      props.setRing(false)
  }
  const _stopRing = () => {
      _log(`close the ring(id=${id.current})`)
      setActive(false)
      if (props.src && audioObject) {
        audioObject.pause()
        audioObject.currentTime = 0
        props.setRing(false)
      } else if (musicbox.current) {
          musicbox.current.stopMusic()
      }
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
              musicbox.current.playMusic(props.musicText)
            } else if(musicTexts[props.defaultMusic]) {
              musicbox.current.playMusic(musicTexts[props.defaultMusic])
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
          musicbox.current.stopMusic()
      }
      props.setRing(false)
  }

  const _log = (info) => {
      if (info && props.log)
      console.log(`🌟【EASY-RING LOG】:${info}`)
  }

  const endedHandle = () => {
    props.ended()
    if (!props.loop) {
      props.setRing(false)
    }
  }

  useEffect(() => {
    if (!audioObject) {
      _log('EasyRingReactComponent(function) mounted')
      setAudioObject(document.getElementById(id.current))
      musicbox.current = new MusicBox({
        loop: props.loop,
        endedCallback: props.loop ? () => {} : () => { endedHandle() }
      })
    }
    return _stopRing
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
            endedHandle()
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
  setRing: () => {},
  ended: () => {}
}

module.exports = EasyRingReactComponent