/* eslint-disable */
class MusicBox {

  constructor(options){

    let defaults = {

      loop: false, // 循环播放
      musicText: '',  // 乐谱
      autoplay: false, // 自动弹奏速度
      type: 'sine',  // 音色类型  sine|square|triangle|sawtooth
      duration: 2,  // 键音延长时间
      endedCallback: function() {} // 结束回调
    };

    // this.selector = selector;
    this.opts = Object.assign(defaults, options);

    // 播放音乐的intervalId
    this.timer = 0

    // 创建新的音频上下文接口
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // 音阶频率
    this.arrFrequency = [262, 294, 330, 349, 392, 440, 494, 523, 587, 659, 698, 784, 880, 988, 1047, 1175, 1319, 1397, 1568, 1760, 1967];
    // 音符
    this.arrNotes = ['.1', '.2', '.3', '.4', '.5', '.6', '.7', '1', '2', '3', '4', '5', '6', '7', '1.', '2.', '3.', '4.', '5.', '6.', '7.'];

    // 绘制钢琴
    // this.draw();

    // 播放乐谱
    // this.opts.autoplay && this.playMusic(this.opts.musicText, this.opts.autoplay);

  }

  // 创建乐音
  createMusic(note){

    let index = this.arrNotes.indexOf(note);

    if(index !== -1){
      this.createSound(this.arrFrequency[index]);
    }

  }

  // 创建声音
  createSound(freq) {

    // 创建一个OscillatorNode, 它表示一个周期性波形（振荡），基本上来说创造了一个音调
    let oscillator = this.audioCtx.createOscillator();
    // 创建一个GainNode,它可以控制音频的总音量
    let gainNode = this.audioCtx.createGain();
    // 把音量，音调和终节点进行关联
    oscillator.connect(gainNode);
    // this.audioCtx.destination返回AudioDestinationNode对象，表示当前audio context中所有节点的最终节点，一般表示音频渲染设备
    gainNode.connect(this.audioCtx.destination);
    // 指定音调的类型  sine|square|triangle|sawtooth
    oscillator.type = this.opts.type;
    // 设置当前播放声音的频率，也就是最终播放声音的调调
    oscillator.frequency.value = freq;
    // 当前时间设置音量为0
    gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
    // 0.01秒后音量为1
    gainNode.gain.linearRampToValueAtTime(1, this.audioCtx.currentTime + 0.01);
    // 音调从当前时间开始播放
    oscillator.start(this.audioCtx.currentTime);
    // this.opts.duration秒内声音慢慢降低，是个不错的停止声音的方法
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + this.opts.duration);
    // this.opts.duration秒后完全停止声音
    oscillator.stop(this.audioCtx.currentTime + this.opts.duration);

  }

  // 绘制钢琴
  // draw(){

  //   this.musicBtn = null;

  //   let musicBtns = document.querySelector(this.selector),
  //       li = '',
  //       noteClass = '';

  //   for(let i = 0; i < this.arrFrequency.length; i++){
  //     noteClass = this.arrNotes[i][0] === '·' ? 'low' : (this.arrNotes[i][1] === '·' ? 'high' : '');
  //     li += '<li><span></span><i class="'+ noteClass +'">'+ this.arrNotes[i].replace(/\\·/,'') +'</i></li>'
  //   }

  //   musicBtns.innerHTML = '<ul>'+ li +'</ul>';

  //   let oLi = musicBtns.querySelectorAll('li');
  //   for(let i = 0; i < this.arrFrequency.length; i++){
  //     oLi[i].addEventListener('mousedown',(e)=>{
  //       this.pressBtn(e.target,i);
  //     })
  //   }

  //   this.musicBtn = musicBtns.querySelectorAll('li span');

  //   // 鼠标起来时样式消失
  //   document.onmouseup = () => {
  //     for(let i = 0; i < this.arrFrequency.length; i++){
  //       this.musicBtn[i].className = '';
  //     }
  //   };

  // }

  // 按下钢琴键
  pressBtn(i) {

    // obj.className = 'cur';
    this.createSound(this.arrFrequency[i]);
    // setTimeout(() => {
    //   this.musicBtn[i].className = '';
    // },200);

  }

  // 播放乐谱
  playMusic(musicText, speed = 2) {

    let i = 0, musicArr = musicText.split(' ');

    let timer = setInterval(() => {

      try{
        let n = this.arrNotes.indexOf(musicArr[i]);  // 钢琴键位置

        if(musicArr[i] !== '-' && musicArr[i] !== '0'){
          this.pressBtn(n);
        }
        i++;

        if(i >= musicArr.length){
          if (this.opts.loop) i = 0
          else {
            this.opts.endedCallback()
            clearInterval(timer);
          }
        }
      }
      catch (e) {
        // alert('请输入正确的乐谱！');
        console.error(e)
        clearInterval(timer);
      }

    }, 1000 / speed);

    this.timer = timer

    return timer;
  }

  // 停止乐谱
  stopMusic() {
    clearInterval(this.timer)
  }

}

const musicTexts = {
  TWO_TIGERS: '1 2 3 1 - 1 2 3 1 - 3 4 5 - 3 4 5 - - 5 6 5 4 3 - 1 - 5 6 5 4 3 - 1 - 2 - .5 - 1 - - 2 - .5 - 1 - - - -',
  LITTLE_STAR: '1 1 5 5 6 6 5 - 4 4 3 3 2 2 1 - 5 5 4 4 3 3 2 - 5 5 4 4 3 3 2 - 1 1 5 5 6 6 5 - 4 4 3 3 2 2 1 - - - -',
  EZIOS_FAMILY: '.6 - 1 - 2 - 3 - .6 - 1 - 2 - 1 - .6 - 1 - 2 - 3 - .6 - 1 - 2 - 1 - .6 - 1 - 2 - 3 - 6 - 7 - 1. - 2. - 3. - - - - - -',
  CASTLE_IN_THE_SKY: '.6 .7 1 - - .7 1 - 3 - .7 - - - - .3 .3 .6 - - .5 .6 - 1 - .5 - - - - .3 .3 .4 - - .3 .4 - 1 - .3 - - - - 1 1 1 .7 - - .4 .4 - .7 - .7 - - - - -',
  // this.musicbox.playMusic('3. 2. 6 - - 3. 2. 5. - - - -')
  // this.musicbox.playMusic('3. 2. 6 - - 3. 2. 5. - 4. - - 1 .7 1 .7 1 .7 1 .7 1 .7 1 .7 1 .7 1 .7 1 .7')
  // this.musicbox.playMusic('3. 2. 6 - - 3. 2. 5. - 4. - - 4 4 - 4 4 - 4 4 4 - 4 4 - 5 5 - 5 5 5 - 5 5 5 - - -')
}

// window.MusicBox = MusicBox;

module.exports = {
  MusicBox,
  musicTexts
}