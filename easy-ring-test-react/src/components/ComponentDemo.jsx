import React from "react"
// import REasyRing from './easy-ring-react'
import { EasyRingReactComponent as REasyRing } from 'easy-ring'
import testAudio from '../assets/test.wav'

// react本地服务器的问题好多（改一下组件入参，组件直接就哑了。还得重开一个页面标签）
export default class Demo extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            ring: false,
            msgs: [],
            frequency: 0.1,
            myCommonEasyRing: null
        }
        // !! 为了在回调中使用 `this`，这个绑定是必不可少的 。。。。
        this.openRing = this.openRing.bind(this)
        this.read = this.read.bind(this)
        this.endedHandle = this.endedHandle.bind(this)
    }
    polling() {
      setInterval(() => {
        console.log('请求中...')
        if (Math.random() > (1 - this.state.frequency)) {
          this.setState({
            msgs: [...this.state.msgs, '收到一条信息（请点击我来关铃）'],
            ring: true
          })
        }
      }, 1000)
    }
    read() {
      this.setState({
        ring: false
      })
    }
    openRing() {
      this.setState({
        open: true
      })
    }
    componentDidMount() {
        // 会调两次。解决：删掉/index.js的<StrictMode>(原因不明)
        this.polling()
    }
    endedHandle() {
      this.setState({
        ring: false
      })
    }
    render() {
        return (<div className="home">
          {/* <REasyRing 
            ring={this.state.ring} 
            open={this.state.open} 
            loop={false}
            ended={this.endedHandle}
            defaultMusic='LITTLE_STAR'
            musicText='1 2 3 4 5 6 7'
            src={testAudio}
          ></REasyRing> */}
          <REasyRing 
            ring={this.state.ring} 
            open={this.state.open} 
            loop={true}
            ended={this.endedHandle}
            defaultMusic='LITTLE_STAR'
            musicText='1 .7 1 3 .7 - - .3 .6 .5 .6 1 .5 - - .3 .3 .4 .3 .4 1 3 - - - 3 - - 1 - - 1 - - -'
          ></REasyRing>
          <button onClick={this.openRing}>打开铃声</button>
              {
                  this.state.msgs.map((item, index) => (
                      <div onClick={this.read} key={index}>
                          {item}
                      </div>))
              }
           </div>)
    }
}
