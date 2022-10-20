import { useState, useEffect } from 'react'
import { CommonEasyRing } from 'easy-ring'
// import testAudio from '../assets/test.wav'
import { Modal } from 'antd'
import Msg from '../utils/msg'
import {
    MessageOutlined
  } from '@ant-design/icons'
import { Badge, Dropdown, Menu } from 'antd';

const myEasyRing = new CommonEasyRing({
    // src: testAudio
})
const msg = new Msg({
    frequency: 0.1
})


const FunctionDemo = () => {
    // const [myEasyRing, setMyEasyRing] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(true)
    const [intervalCount, setIntervalCount] = useState(0)
    const [newMsgCount, setNewMsgCount] = useState(0)
    const [msgList, setMsgList] = useState([])
    // const [msg, setMsg] = useState(null)

    const handleOk= () => {
        setIsModalOpen(false)
        myEasyRing.open()
    }
    const handleCancel= () => {
        setIsModalOpen(false)
    }

    const dropdownChange = (val) => {
        if (!val) {
            setNewMsgCount(0)
            setMsgList([])
        }
        myEasyRing.stop()
      }

    useEffect(() => {
        msg.listening()
        msg.onReceived((newMsg) => {
            myEasyRing.ring()
            setMsgList(list => [...list, newMsg])
            setNewMsgCount(count => count + 1)
        })
        setInterval(() => {
            setIntervalCount(count => count + 1)
        }, 1000)
        return () => {
            myEasyRing.close()
            msg.stopListening()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div>
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

export default FunctionDemo