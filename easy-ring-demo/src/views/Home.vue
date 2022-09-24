<template>
  <div class="home">
    <easy-ring 
      v-if="false"
      :open="open"
      :ring="ring"
    />
    <button @click="openRing">打开铃声</button>
    <div v-for="(msg, index) in msgs" :key="index" @click="read">
      {{msg}}
    </div>
    <EasyRingVue 
      v-if="false"
      :open="open"
      :ring.sync="ring"
      :loop="false"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import EasyRing from 'easy-ring'
// import CommonEasyRing from '../common-easy-ring'
// import EasyRingVue from '../components/easy-ring-vue'
import { CommonEasyRing, EasyRingVue } from 'easy-ring'

export default {
  name: 'Home',
  components: {
    EasyRing,
    EasyRingVue
  },
  data: () => ({
    open: false,
    ring: false,
    msgs: [],
    frequency: 0.1,
    myCommonEasyRing: null
  }),
  methods: {
    polling() {
      setInterval(() => {
        console.log('请求中...')
        if (Math.random() > (1 - this.frequency)) {
          this.msgs.push('收到一条信息（请点击我来关铃）')
          this.ring = true
          this.myCommonEasyRing.ring()
        }
      }, 1000)
    },
    read() {
      this.ring = false
      this.myCommonEasyRing.stop()
    },
    openRing() {
      this.open = true
      this.myCommonEasyRing.open()
      this.playDefaultAudio()
    },
    playOscillator() {
      // 创建音频上下文  
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      var audioCtx = new AudioContext();
      // 创建音调控制对象  
      var oscillator = audioCtx.createOscillator();
      // 创建音量控制对象  
      var gainNode = audioCtx.createGain();
      // 音调音量关联  
      oscillator.connect(gainNode);
      // 音量和设备关联  
      gainNode.connect(audioCtx.destination);
      // 音调类型指定为正弦波  
      oscillator.type = 'sine';
      // 设置音调频率  
      oscillator.frequency.value = 1046.50; // 587.33;
      // 先把当前音量设为0  
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      // 0.01秒时间内音量从刚刚的0变成1，线性变化 
      gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
      // 声音走起 
      oscillator.start(audioCtx.currentTime);
      // 1秒时间内音量从刚刚的1变成0.001，指数变化 
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
      // 1秒后停止声音 
      oscillator.stop(audioCtx.currentTime + 1);
    },
    playDefaultAudio() {
      setInterval(() => {
        this.playOscillator()
        setTimeout(() => {
          this.playOscillator()
        }, 500)
      }, 2000)
    }
  },
  mounted() {
    // console.log(CommonEasyRing, EasyRingVue)
    // this.polling()
    this.myCommonEasyRing = new CommonEasyRing()
  }
}
</script>
