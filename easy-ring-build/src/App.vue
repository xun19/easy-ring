<template>
  <div id="app">
    <easy-ring 
      :open="open"
      :ring="ring"
    />
    <button @click="openRing">打开铃声</button>
    <div v-for="(msg, index) in msgs" :key="index" @click="read">
      {{msg}}
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EasyRing from '../src/components/Xring.vue'

export default {
  name: 'App',
  components: {
    EasyRing
  },
  data: () => ({
    open: false,
    ring: false,
    msgs: []
  }),
  methods: {
    polling() {
      setInterval(() => {
        console.log('请求中...')
        if (Math.random() > 0.98) {
          this.msgs.push('收到一条信息')
          this.ring = true
        }
      }, 1000)
    },
    read() {
      this.ring = false
    },
    openRing() {
      this.open = true
    }
  },
  mounted() {
    this.polling()
  }
}
</script>