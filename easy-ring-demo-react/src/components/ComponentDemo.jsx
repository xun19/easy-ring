import { useState, useEffect } from 'react'
import { EasyRingReactComponent as EasyRing } from 'easy-ring'
import { Modal } from 'antd'
import Msg from '../utils/msg'
import {
    MessageOutlined
  } from '@ant-design/icons'
import { Badge, Dropdown, Menu } from 'antd';

const msg = new Msg({
    frequency: 0.1
})



const ComponentDemo = () => {
    const [open, setOpen] = useState(false)
    const [ring, setRing] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(true)
    const [intervalCount, setIntervalCount] = useState(0)
    const [newMsgCount, setNewMsgCount] = useState(0)
    const [msgList, setMsgList] = useState([])

    const handleOk= () => {
        setIsModalOpen(false)
        setOpen(true)
    }
    const handleCancel= () => {
        setIsModalOpen(false)
    }

    const dropdownChange = (val) => {
        if (!val) {
            setNewMsgCount(0)
            setMsgList([])
        }
        setRing(false)
    }

    const endedHandle = () => { // 你的ended回调处理函数 | Your ended callback handler
        // setRing(false)
        console.log('ended')
    }

    useEffect(() => {
        msg.listening()
        msg.onReceived((newMsg) => {
            setRing(true)
            setMsgList(list => [...list, newMsg])
            setNewMsgCount(count => count + 1)
        })
        setInterval(() => {
            setIntervalCount(count => count + 1)
        }, 1000)
        return () => {
            // TODO: 为什么组件被注销了也没关上？在生命周期钩子里更新了值，也没关掉？
            // TODO: 没法正确关闭的这个错误，还会影响easy-ring组件的loop？是因为音频元素没获取到（不是没生成）【感觉这块得弄成异步x】
            // 因为此时组件即将销毁，所以状态更改不会起作用
            setRing(false)
            setOpen(false)
            msg.stopListening()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <EasyRing 
                ring={ring} 
                open={open} 
                loop={false}
                setRing={setRing}
                ended={endedHandle}
            />

            <div style={{display: 'flex', justifyContent: 'center',alignItems: 'center', flexWrap: 'wrap', height: '200px'}}>
                <div style={{ flexBasis: '100%', display: 'flex', justifyContent: 'center'}}>
                    <Dropdown overlay={
                        <Menu
                            items={
                            msgList.map((m, i) => ({
                                label: `收到一条新信息！| Receive a new message!（ id = ${m.id}）`,
                                key: i
                            }))
                            }
                        />
                    } trigger={['click']} onOpenChange={dropdownChange}>
                        <Badge count={newMsgCount}>
                            <MessageOutlined style={{fontSize: '36px', cursor: 'pointer'}}/>
                        </Badge>
                    </Dropdown>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', color: 'black'}}>
                    { newMsgCount === 0 ? (
                        <span>
                            正在接收消息... | Waiting message...{intervalCount}s
                        </span>
                    ) : (
                        <div style={{display: 'flex',justifyContent:'center',flexWrap: 'wrap'}}>
                            <div style={{flexBasis: '100%', textAlign: 'center'}}>你收到了新消息！ | You receive new messages!</div>
                            <div style={{marginTop: 30}}>(点击图标查看消息、并停止声音 | Click the icon to view the message and stop the sound.)</div>
                        </div>
                    ) }
                </div>
            </div>
            <Modal title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>我们需要您同意开启声音 ｜ We need your consent to turn on sound.</p>
            </Modal>
        </div>
    )
}

export default ComponentDemo