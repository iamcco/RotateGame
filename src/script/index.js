import '../css/index.css'

const querySelector = (selector) => document.querySelector(selector)

const circle = querySelector('#circle')

const TO_MAP = {
  1: 'to-one',
  2: 'to-two',
  3: 'to-three',
  4: 'to-four'
}

let isRotating = 'stop'

const updateState = (state) => {
  isRotating = state
  console.log(isRotating)
}

const start = () => {
  document.body.removeEventListener('click', start)
  if (isRotating === 'stop') {
    updateState('pending')
    // 开始转动
    circle.style.animation = 'rotate-start 2s ease-in'
    // 两秒后快速持续转动
    setTimeout(
      () => {
        updateState('waiting')
        circle.style.animation = 'rotate-hold 0.1s linear infinite'
        setTimeout(
          () => {
            // 三秒后转动满满停止
            updateState('stoping')
            const stopFrame = TO_MAP[Math.ceil(Math.random() * 4)]
            circle.style.animation = `${stopFrame} 3.5s ease-out forwards`
            // 停止的时候提示
            setTimeout(
              () => {
                updateState('stop')
                const itemFour = querySelector(`#${stopFrame}`)
                itemFour.style.backgroundColor = '#d8e8c5'
              },
              3600
            )
          },
          3000
        )
      },
      2000
    )
  }
}

console.log(isRotating)

document.body.addEventListener('click', start)
