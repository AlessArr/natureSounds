/* eslint-disable no-unused-expressions */
const startBut = document.getElementById('start');
const startButState = document.getElementsByTagName('audio');

// in theory it's an unnecessary cycle, but property in html ???doesn't work and volume = 1
for (let i = 0; i < startButState.length; i += 1) {
  startButState[i].volume = 0;
}

// swap forEach
const arrId = ['birds', 'crickets', 'rain', 'thunder', 'wave', 'wind', 'fire', 'snow', 'cat', 'ball', 'birdSong', 'lynx', 'train', 'koto', 'taiko'];

function playBut(startStyle) {
  startStyle.classList.remove('play');
  startStyle.classList.add('pause');
  for (let i = 0; i < startButState.length; i += 1) {
    startButState[i].play();
  }
}

function pauseBut(startStyle) {
  startStyle.classList.remove('pause');
  startStyle.classList.add('play');
  for (let i = 0; i < startButState.length; i += 1) {
    startButState[i].pause();
  }
}

function pausePlay(startStyle) {
  if (startStyle.classList.contains('play')) playBut(startStyle);
  else pauseBut(startStyle);
}

// игра/пауза
startBut.addEventListener('click', () => {
  const startStyle = document.getElementById('start');
  pausePlay(startStyle);
});

// вначале аудио не успевает подгружаться, сделать асинхронность
function changeVolume(audioState, inputState) {
  console.log(`audio = ${audioState.volume }; input = ${inputState.value}`);
  if (audioState.volume <= 0.8) {
    audioState.volume += 0.2;
    inputState.stepUp(10);
  } else {
    audioState.volume = 0;
    inputState.value = 0;
  }
}

function currentVolume(curButton) {
  const audioState = curButton.querySelector('audio');
  const inputState = document.getElementById(curButton.id).nextElementSibling; // надо бы через квери
  changeVolume(audioState, inputState);
}

document.querySelector('#searchId').addEventListener('click', (e) => {
  const button = e.target;
  currentVolume(button);
});

document.querySelector('#searchId').addEventListener('input', (e) => {
  const inputId = e.target.id;
  const button = document.getElementById(inputId).previousElementSibling; // квери
  const audioState = button.querySelector('audio');
  audioState.volume = e.target.value;
});


document.getElementById('reset').addEventListener('click', () => {
  const startStyle = document.querySelector('#start');
  pauseBut(startStyle);

  const inputs = document.querySelectorAll('input');
  for (let i = 0; i < startButState.length; i += 1) {
    inputs[i].value = 0;
    startButState[i].volume = 0;
    startButState[i].pause();
  }
});

function getElFromArray(arrIndex) {
  const name = arrId[arrIndex[0]];
  console.log(arrIndex[1]);
  const el = document.getElementById(name);
  console.log(`el = ${el}`);
  const volume = arrIndex[1];
  const randInputState = el.nextElementSibling;
  console.log(`randInput=${randInputState}`);
  const randAudioState = el.getElementsByTagName('audio');
  randAudioState[0].volume = volume;
  randInputState.value = volume;
}

document.getElementById('rand').addEventListener('click', () => {
  const startStyle = document.getElementById('start'); // reset in another function

  pauseBut(startStyle);
  const inputState = document.getElementsByTagName('input');
  for (let i = 0; i < startButState.length; i += 1) {
    inputState[i].value = 0;
    startButState[i].volume = 0;
    startButState[i].pause();
  }
  let count = Math.floor(Math.random() * Math.floor(5)); // number from 0 to 4
  let arr = [];
  if (count === 0) count = 2;
  for (let i = 0; i < count; i += 1) {
    arr.push(Math.floor(Math.random() * Math.floor(15)));
    arr.push(Math.random());
    getElFromArray(arr);
    arr = [];
  }
});

const btnShare = document.querySelector('.btnShare');
btnShare.addEventListener('click', () => {
  const message = document.createElement('DIV');
  message.innerHTML = 'Element in development';
  btnShare.insertAdjacentElement('beforeend', message);
  setTimeout(() => message.remove(), 3000);
});

/*
// TIMER
const startTimer = (timeValue) => {
  const time = timeValue;

  class Timer {
    constructor(obj) {
      this.time = obj.time;
      this.onEnd = obj.onEnd || null;
      this.onStart = obj.onStart || null;
      this.onTick = obj.onTick || null;
      this.intervalId = null;

      this.start = () => {
        this.interval = setInterval(this.update, 1000);
      };
      this.stop = () => {
        const startStyle = document.getElementById('start');
        pausePlay(startStyle);
        clearInterval(this.interval);
      };
      this.update = () => {
      // eslint-disable-next-line no-unused-expressions
        this.time > 0 ? this.time -= 1 : this.stop();
        // eslint-disable-next-line no-void
        this.onTick ? this.onTick() : void 0; // если функции onTock нет, то (void 0) ничего не будет выполнятся
        return this.get();
      };
      this.get = () => this.time;
    }
  }

  const timer1 = new Timer({
  // eslint-disable-next-line object-shorthand
    time: time,   //здесь изменяется время
    onTick: tick
  });

  timer1.start();
  // eslint-disable-next-line no-use-before-define
  requestAnimationFrame(tick);

  function tick() {
  // eslint-disable-next-line no-use-before-define
    id('timeID').innerHTML = timer1.get(); // поменять ID таймера!!!!!!
  }

  // eslint-disable-next-line no-shadow
  function id(id) {
    return document.getElementById(id);
  }
};

// клик по кнопке из SHARE
const stateShare = {
  on: true,
  timerOn: true,
};

const btnShare = document.querySelector('.btnShare');
const timerBtn = document.querySelector('#btnTimer');
const mixBtn = document.querySelector('#btnMix');
const shareBtn = document.querySelector('#btnShare');
const unvisibleProp = document.querySelector('.unvisible');
const btns = document.querySelector('.btns');


function drawingShereForm(cancleEl, inputTime, startTimerBut) {
  if (stateShare.on === true) {
    btns.style.gridTemplateRows = '1fr 4fr';
    unvisibleProp.classList.remove('unvisible');
    stateShare.on = false;
  } else {
    btns.style.gridTemplateRows = '1fr 1fr';
    unvisibleProp.classList.add('unvisible');
    stateShare.on = true;
    //deleteElements(cancleEl, inputTime, startTimerBut);
  }
}

timerBtn.addEventListener('click', () => {
  const cancleEl = document.createElement('BUTTON');
  cancleEl.classList.add('cancleField');
  cancleEl.innerHTML = 'Cancle';
  cancleEl.classList.add('timerJsGen');
  document.querySelector('.field').insertAdjacentElement('beforebegin', cancleEl);

  const startTimerBut = document.createElement('BUTTON');
  startTimerBut.innerHTML = 'Start timer';
  startTimerBut.classList.add('timerJsGen');
  cancleEl.insertAdjacentElement('beforebegin', startTimerBut);

  const inputTime = document.createElement('INPUT');
  startTimerBut.insertAdjacentElement('beforebegin', inputTime);

  drawingShereForm(cancleEl, inputTime, startTimerBut);


  startTimerBut.addEventListener('click', () => {
    const timeEl = document.createElement('DIV');
    timeEl.id = 'timeID';
    inputTime.insertAdjacentElement('beforebegin', timeEl);
    startTimer(inputTime.value);
    const startStyle = document.getElementById('start');
    pausePlay(startStyle);
  });
});

mixBtn.addEventListener('click', () => {
  drawingShereForm();
});
shareBtn.addEventListener('click', () => {
  drawingShereForm();
});*/
