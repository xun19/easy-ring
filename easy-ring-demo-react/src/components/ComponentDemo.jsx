import React from "react"
// import REasyRing from './easy-ring-react'
import { EasyRingReactComponent as REasyRing } from 'easy-ring'

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
          <REasyRing 
            ring={this.state.ring} 
            open={this.state.open} 
            loop={false}
            ended={this.endedHandle}
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
