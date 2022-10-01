export default class Msg {
    constructor({frequency} = {}){
        this.count = 0
        this.msgs = []
        this.frequency = frequency || 0.4
        this.intervalId = 0

        this.onReceivedCallback = () => {}
        this.onOpenMsgListCallback = () => {}
    }
    polling() {
        this.intervalId = setInterval(() => {
            console.log('waiting msg...')
            if (Math.random() > (1 - this.frequency)) {
                this.received()
            }
        }, 1000)
    }
    listening() {
        this.polling()
    }
    stopListening() {
        clearInterval(this.intervalId)
        this.count = 0
        this.msgs = []
    }
    received() {
        this.count += 1
        console.log(`received msg${this.count}!`)
        const newMsg = {
            id: this.count,
            title: `message${this.count}`,
            content: '',
            hasRead: false
        }
        this.msgs.push(newMsg)
        this.onReceivedCallback(newMsg)
    }
    // openMsgList() {
    //     this.onOpenMsgListCallback()
    // }
    readMsg(index) {
        this.msgs[index].hasRead = true
    }
    onReceived(callback) {
        if (typeof callback === 'function') this.onReceivedCallback = callback
    }
    // onOpenMsgList(callback) {
    //     this.msgs = []
    //     if (typeof callback === 'function') this.onOpenMsgListCallback = callback
    // }
    getMsgs() {
        return this.msgs
    }
}

/*
    const msg = new Msg()
    msg.listening()
    msg.onReceived(() => { this.msg = true })
    msg.onRead(() => { this.ring = false })

*/