//top: cant have an high value
const paddles = document.querySelectorAll('.paddle')
const player = document.querySelector('.player') //paddle1
const pc = document.querySelector('.pc') //paddle2

const ball = document.querySelector('.ball')
const main = document.querySelector('main')
/*
########     ###    ########  ########  ##       ######## 
##     ##   ## ##   ##     ## ##     ## ##       ##       
##     ##  ##   ##  ##     ## ##     ## ##       ##       
########  ##     ## ##     ## ##     ## ##       ######   
##        ######### ##     ## ##     ## ##       ##       
##        ##     ## ##     ## ##     ## ##       ##       
##        ##     ## ########  ########  ######## ######## 
*/

const centerPaddles = () => {
  paddles.forEach(paddle => {
    paddle.style.position = 'absolute'
    let paddleTop = parseInt((main.offsetHeight / 2) - paddle.offsetHeight / 2)
    paddle.style.top = paddleTop + 'px'
    paddle.style.transform = 'translateY(0)'
  });
}

//⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆⬆
const arrowUpPressed = () => {
  //works only if there is no translate in the css
  let valueTop = player.offsetTop

  //reset bottom property to auto otherwise getcomputedstyle bottom
  //doesn't work if I press arrowDown next time
  player.style.bottom = 'auto'

  if (valueTop <= 10) {
    player.style.top = 0
  } else {
    valueTop -= 10
    player.style.top = `${valueTop}px`
  }
}

//⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
const arrowDownPressed = () => {
  let valueBottom = window.getComputedStyle(player, null).getPropertyValue('bottom')

  //retrieve number with decimals: "450.73px" --> 450.73
  valueBottom = parseInt(Number(valueBottom.replace(/[^0-9\.]+/g, "")))

  player.style.top = 'auto'

  if (valueBottom <= 10) {
    player.style.bottom = 0
  } else {
    valueBottom -= 10
    player.style.bottom = `${valueBottom}px`
  }
}

//🤔
const chooseFunc = e => {
  switch (e.key) {
    case 'ArrowDown':
      arrowDownPressed()
      break

    case 'ArrowUp':
      arrowUpPressed()
      break

    case 's':
      arrowDownPressed()
      break

    case 'w':
      arrowUpPressed()
      break

    default:
      console.log(`wrong key pressed => "${e.key}"`)
      break
  }
}

/*
 
 ########     ###    ##       ##       
 ##     ##   ## ##   ##       ##       
 ##     ##  ##   ##  ##       ##       
 ########  ##     ## ##       ##       
 ##     ## ######### ##       ##       
 ##     ## ##     ## ##       ##       
 ########  ##     ## ######## ######## 
 
*/

const centerBall = () => {
  ball.style.position = 'absolute'
  //centering the ball
  let ballTop = parseInt((main.offsetHeight / 2) - ball.offsetHeight / 2)
  let ballLeft = parseInt((main.offsetWidth / 2) - ball.offsetWidth / 2)
  ball.style.top = ballTop + 'px'
  ball.style.left = ballLeft + 'px'
  ball.style.transform = 'translate(0, 0)'
}

const startBall = (e) => {
  //code...
}


/*
 
    ###    ##       ##       
   ## ##   ##       ##       
  ##   ##  ##       ##       
 ##     ## ##       ##       
 ######### ##       ##       
 ##     ## ##       ##       
 ##     ## ######## ######## 
 
*/

//key👂🏻
const onLoadEvent = () => {
  window.addEventListener('keydown', e => {
    chooseFunc(e)
  }, false)

  window.addEventListener('keydown', e => {
    startBall(e)
  }, { once: true })
}

window.addEventListener('load', onLoadEvent())
window.addEventListener('load', () => {
  centerBall()
  centerPaddles()
}, { once: true })

window.addEventListener('resize', () => {
  centerBall()
  centerPaddles()
})
