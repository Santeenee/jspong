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
  let ballY = parseInt((main.offsetHeight / 2) - ball.offsetHeight / 2)
  let ballX = parseInt((main.offsetWidth / 2) - ball.offsetWidth / 2)
  ball.style.top = ballY + 'px'
  ball.style.left = ballX + 'px'
  ball.style.transform = 'translate(0, 0)'
}

const startBall = (e) => {
  let paddleWidth = player.offsetWidth

  let ballTop = parseInt(ball.offsetTop)

  let valueBottomWithUnit = window.getComputedStyle(ball, null).getPropertyValue('bottom')
  let ballBottom = parseInt(Number(valueBottomWithUnit.replace(/[^0-9\.]+/g, "")))

  let valueLeftWithUnit = window.getComputedStyle(ball, null).getPropertyValue('left')
  let ballLeft = parseInt(Number(valueLeftWithUnit.replace(/[^0-9\.]+/g, "")))

  let valueRightWithUnit = window.getComputedStyle(ball, null).getPropertyValue('right')
  let ballRight = parseInt(Number(valueRightWithUnit.replace(/[^0-9\.]+/g, "")))

  var directions = [-1, -1]

  var commonValue = 30

  //ballBottom = 'auto'
  ballTop += commonValue
  ball.style.top = directions[0] + 'px'
  //ballRight = 'auto'
  ballLeft += commonValue
  ball.style.left = directions[1] + 'px'

  //move ball diagonally
  setInterval(() => {
    //never use 0 for directions[]
    //1,1 means top and left both positive
    // let directions = [1, -1] //top, left

    const changeDirection = (side = 'right', directions = [0, 0]) => {
      //
      //change else if(side === 'bottom')
      // to
      // else if(side === 'bottom' || side === 'top')
      // i hope it works (it probably doesn't)
      console.log('change direction')
      if (directions[0] > 0 && directions[1] > 0) {
        if (side === 'bottom') {
          return [-1, 1]
        }
        else if (side === 'right' /* && paddle.isThere */) {
          return [1, -1]
        } else {
          console.log(directions[0], directions[1], side)
        }
        //
      } else if (directions[0] > 0 && directions[1] < 0) {
        if (side === 'bottom') {
          return [-1, -1]
        }
        else if (side === 'left' /* && paddle.isThere */) {
          return [1, 1]
        } else {
          console.log(directions[0], directions[1], side)
        }
      } else if (directions[0] < 0 && directions[1] > 0) {
        if (side === 'top') {
          return [1, 1]
        }
        else if (side === 'right' /* && paddle.isThere */) {
          return [-1, -1]
        } else {
          console.log(directions[0], directions[1], side)
        }
      } else if (directions[0] < 0 && directions[1] < 0) {
        if (side === 'top') {
          return [1, -1]
        }
        else if (side === 'left' /* && paddle.isThere */) {
          return [-1, 1]
        } else {
          console.log(directions[0], directions[1], side)
        }
      } else {
        return [1, 1]
      }
    }

    //ball must not go outside boundaries of <main>
    if (ballTop <= commonValue) {
      ball.style.top = commonValue
      directions = changeDirection('top', directions)
    }
    else if (ballRight <= commonValue + paddleWidth) {
      ball.style.right = paddleWidth + commonValue
      directions = changeDirection('right', directions)
    }
    else if (ballLeft <= commonValue + paddleWidth) {
      ball.style.left = paddleWidth + commonValue
      directions = changeDirection('left', directions)
    }
    else if (ballBottom <= commonValue) {
      ball.style.bottom = commonValue
      directions = changeDirection('bottom', directions)
    }

    // console.log(ballBottom, ballRight)

    ballTop += directions[0] * commonValue
    ball.style.top = ballTop + 'px'

    ballLeft += directions[1] * commonValue
    ball.style.left = ballLeft + 'px'

    valueBottomWithUnit = window.getComputedStyle(ball, null).getPropertyValue('bottom')
    ballBottom = parseInt(Number(valueBottomWithUnit.replace(/[^0-9\.]+/g, "")))

    valueRightWithUnit = window.getComputedStyle(ball, null).getPropertyValue('right')
    ballRight = parseInt(Number(valueRightWithUnit.replace(/[^0-9\.]+/g, "")))
  }, 100);

  const stopBall = () => {
    clearInterval(moveBall)
    // ball.classList.add('animate') eccetera...
  }
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
