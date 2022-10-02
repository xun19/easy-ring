import { Component } from 'react'
import { CommonEasyRing } from 'easy-ring'
import { Modal } from 'antd'
import Msg from '../utils/msg'
import {
    MessageOutlined
  } from '@ant-design/icons'
import { Badge, Dropdown, Menu } from 'antd';


class FunctionDemo extends Component {
    constructor(props) {
        super(props)
        this.state ={
            myEasyRing: new CommonEasyRing(),
            isModalOpen: true,
            intervalCount: 0,
            newMsgCount: 0,
            msgList: [],
            msg: new Msg({
                frequency: 0.1
            })
        }

        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.dropdownChange = this.dropdownChange.bind(this)
    }
    showModa() {
        this.setState({
            isModalOpen: true
        })
    }
    handleOk() {
        this.setState({
            isModalOpen: false
        })
        this.state.myEasyRing.open()
    }
    handleCancel() {
        this.setState({
            isModalOpen: false
        })
    }
    dropdownChange(val) {
        if (!val) {
          this.setState({
            newMsgCount: 0,
            msgList: []
          })
        }
        this.state.myEasyRing.stop()
      }
      
    componentDidMount() {
        this.state.msg.listening()
        this.state.msg.onReceived((newMsg) => {
            this.state.myEasyRing.ring()
            this.setState({
                msgList: [...this.state.msgList, newMsg],
                newMsgCount: this.state.newMsgCount + 1
            })
        })
        setInterval(() => {
            this.setState({
                intervalCount: this.state.intervalCount + 1
            })
        }, 1000)
    }
    componentWillUnmount() {
        this.state.myEasyRing.stop() // TODO: 没法正确关闭的这个错误，还会影响easy-ring组件的loop？是因为音频元素没获取到（不是没生成）【感觉这块得弄成异步x】
        this.state.myEasyRing.close() // TODO: 关闭还会响
    }
    render(h) {
        const menu = (
            <Menu
              items={
                this.state.msgList.map((m, i) => ({
                    label: `收到一条新信息！| Receive a new message!（ id = ${m.id}）`,
                    key: i
                }))
              }
            />
          )

        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'center',alignItems: 'center', flexWrap: 'wrap', height: '200px'}}>
                    <div style={{ flexBasis: '100%', display: 'flex', justifyContent: 'center'}}>
                        <Dropdown overlay={menu} trigger={['click']} onOpenChange={this.dropdownChange}>
                            <Badge count={this.state.newMsgCount}>
                                <MessageOutlined style={{fontSize: '36px', cursor: 'pointer'}}/>
                            </Badge>
                        </Dropdown>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', color: 'black'}}>
                        { this.state.newMsgCount === 0 ? (
                            <span>
                                正在接收消息... | Waiting message...{this.state.intervalCount}s
                            </span>
                        ) : (
                            <span>
                                你收到了新消息！ | You receive new messages!
                            </span>
                        ) }
                    </div>
                </div>
                <Modal title="" open={this.state.isModalOpen} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <p>We need your consent to turn on sound.</p>
                </Modal>
            </div>
        )
    }
}

export default FunctionDemo