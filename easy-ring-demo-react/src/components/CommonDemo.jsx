import React from "react"
import { CommonEasyRing } from 'easy-ring'
// const { CommonEasyRing } = require('easy-ring')
import testAudio from '../assets/test.wav'


export default class Demo extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            msgs: [],
            frequency: 0.1,
            myCommonEasyRing: null
        }
        // 为了在回调中使用 `this`，这个绑定是必不可少的 。。。。
        this.openRing = this.openRing.bind(this)
        this.read = this.read.bind(this)
    }
    polling() {
      setInterval(() => {
        console.log('请求中...')
        if (Math.random() > (1 - this.state.frequency)) {
          this.setState({
            msgs: [...this.state.msgs, '收到一条信息（请点击我来关铃）'],
            ring: true
          })
          this.myCommonEasyRing.ring()
        }
      }, 1000)
    }
    read() {
      this.myCommonEasyRing.stop()
    }
    openRing() {
      this.myCommonEasyRing.open()
    }
    componentDidMount() {
        // 会调两次。解决：删掉/index.js的<StrictMode>(原因不明)
        this.polling()
        this.myCommonEasyRing = new CommonEasyRing({
            loop: false,
            log: true,
            defaultMusic: 'LITTLE_STAR',
            musicText: '1 2 3 4 5 6 7'
        })
    }
    render() {
        return (<div className="home">
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
