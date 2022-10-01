import { useState, useEffect } from 'react'
import { CommonEasyRing } from 'easy-ring'
import { Modal } from 'antd'
import Msg from '../utils/msg'
import {
    MessageOutlined
  } from '@ant-design/icons'
import { Badge, Dropdown, Menu } from 'antd';

const myEasyRing = new CommonEasyRing()
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
            setMsgList([...msgList, newMsg])
            setNewMsgCount(count => count + 1)
        })
        setInterval(() => {
            setIntervalCount(count => count + 1)
        }, 1000)
        return () => {
            myEasyRing.stop() // TODO: 没法正确关闭的这个错误，还会影响easy-ring组件的loop？是因为音频元素没获取到（不是没生成）【感觉这块得弄成异步x】
            myEasyRing.close() // TODO: 关闭还会响
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
                        <span>
                            你收到了新消息！ | You receive new messages!
                        </span>
                    ) }
                </div>
            </div>
            <Modal title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>We need your consent to turn on sound.</p>
            </Modal>
        </div>
    )
}

export default FunctionDemo