
const queryRes =  (/\?name=([^&]+)/).exec(window.location.search)
const queryName = queryRes && queryRes[1] ? decodeURIComponent(queryRes && queryRes[1]): ''

const sw = window.innerWidth
const sh = window.innerHeight
const pixelRatio = 2
const size = sw / 10
const maxSize = 50
const $info = document.getElementById('info')
const canvas = document.getElementById('canvase')
const ctx = canvas.getContext("2d")
const leon = new LeonSans({
  size: size <= maxSize ? size : maxSize,
  text: 'hey,' + (queryName || 'Shawn') +  '~',
  color: ['#000'],
  leading: -2,
  weight: 300
})

canvas.width = sw * pixelRatio
canvas.height = sh * pixelRatio
ctx.scale(pixelRatio, pixelRatio)

const x = (sw - leon.rect.w) / 2
const y = (sh - leon.rect.h) / 5
const infoTop = y + leon.rect.h + 30
$info.style.top = infoTop + 'px'

let starting = false

function start() {
  // 修改年份
  // const $box = document.getElementById('year')
  // $box.innerText = (new Date).getFullYear()

  // leon.reset()
  if (starting) {
    return
  }

  starting = true
  let i, total = leon.drawing.length;
  for (i = 0; i < total; i++) {
    TweenMax.fromTo(leon.drawing[i], 1.1, {
      value: 0
    }, {
      delay: i * 0.05,
      value: 1,
      ease: Power4.easeOut
    });
  }
  setTimeout(function () {
    starting = false
  }, 2800)
}

function animate() {
  requestAnimationFrame(animate)

  ctx.clearRect(0, 0, sw, sh)

  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, sw, sh)

  leon.position(x, y)

  leon.draw(ctx)

}

start()
requestAnimationFrame(animate)

// 年度进度
function yearProgress () {
  const dateObj = new Date()
  const thisYear = dateObj.getFullYear()
  const thisMonth = dateObj.getMonth() + 1
  const thisDay = dateObj.getDate()
  // 当月多少天
  const thisMonthDays = (new Date(thisYear, thisMonth, 0)).getDate()

  const startTimeOfThisYear = new Date(`${thisYear}-01-01T00:00:00+00:00`).getTime()
  const endTimeOfThisYear = new Date(`${thisYear}-12-31T23:59:59+00:00`).getTime()
  const progressOfThisYear = (Date.now() - startTimeOfThisYear) / (endTimeOfThisYear - startTimeOfThisYear)

  let $progress = document.querySelector('#progress')
  $progress.style.marginLeft = '-' + ((1 - progressOfThisYear) * 100) + '%'
  console.log('test >>>', '-' + ((1 - progressOfThisYear) * 100) + '%')

  // 剩余
  let $leftDays = document.querySelector('#left-days')
  $leftDays.innerHTML = 
  thisYear + '/' + thisMonth + '/' + thisDay 
   + '，今年还剩' + (12 - thisMonth) + '个月' + (thisMonthDays - thisDay) + '天'

  // 进度
  let $progressTip = document.querySelector('#progress-tip')
  $progressTip.innerHTML = 
    thisYear + '年进度：' + parseInt(progressOfThisYear * 100) + '%'
  // const progressBarOfThisYear = generateProgressBar()

  // function generateProgressBar() {
  //     const progressBarCapacity = 30
  //     const passedProgressBarIndex = parseInt(progressOfThisYear * progressBarCapacity)
  //     const progressBar =
  //       '█'.repeat(passedProgressBarIndex) +
  //       '▁'.repeat(progressBarCapacity - passedProgressBarIndex)
  //     return `{ ${progressBar} }`
  // }
}
yearProgress()
