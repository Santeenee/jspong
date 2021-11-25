//top: cant have an high value
const paddles = document.querySelectorAll('.paddle')
const player1 = document.querySelector('.player1') //paddle1
const player2 = document.querySelector('.player2') //paddle2

const ball = document.querySelector('.ball')
const main = document.querySelector('main')

var globalID

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
const movePaddleUp = (paddle) => {

  //works only if there is no translate in the css
  let valueTop = paddle.offsetTop

  //reset bottom property to auto otherwise getcomputedstyle bottom
  //doesn't work if I press arrowDown next time
  paddle.style.bottom = 'auto'

  if (valueTop <= 10) {
    paddle.style.top = 0
  } else {
    valueTop -= 10
    paddle.style.top = `${valueTop}px`
  }
}

//⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
const movePaddleDown = (paddle) => {
  let valueBottom = window.getComputedStyle(paddle, null).getPropertyValue('bottom')

  //retrieve number with decimals: "450.73px" --> 450.73
  valueBottom = parseInt(Number(valueBottom.replace(/[^0-9\.]+/g, "")))

  paddle.style.top = 'auto'

  if (valueBottom <= 10) {
    paddle.style.bottom = 0
  } else {
    valueBottom -= 10
    paddle.style.bottom = `${valueBottom}px`
  }
}

//🤔
// const playerMove = e => {
//   const player2 = document.querySelector('.player2')
//   switch (e.key) {
//     case 'ArrowDown':
//       arrowDownPressed(player2)
//       break

//     case 'ArrowUp':
//       arrowUpPressed(player2)
//       break

//     default:
//       if (!'w' && !'s')
//         console.log(`wrong key pressed => "${e.key}"`)
//       break
//   }
// }

const stopBall = () => {
  // console.log(globalID)
  cancelAnimationFrame(globalID)
  console.log('ball should stop now :(')
  // console.log('animation frame canceled')
}

const isPaddleThere = (side = 'left') => {
  let paddle
  if (side === 'left') paddle = player1
  else if (side === 'right') paddle = player2

  let paddleTopCheck = parseInt(paddle.offsetTop)
  let paddleBottomCheck = window.getComputedStyle(paddle, null).getPropertyValue('bottom')
  paddleBottomCheck = parseInt(Number(paddleBottomCheck.replace(/[^0-9\.]+/g, "")))
  let ballTopCheck = window.getComputedStyle(ball, null).getPropertyValue('top')
  ballTopCheck = parseInt(Number(ballTopCheck.replace(/[^0-9\.]+/g, "")))

  //check if paddle are there when G0ndor was having an heart attack.. wait what
  if (ballTopCheck + ball.offsetHeight >= paddleTopCheck &&
    ballTopCheck <= paddleTopCheck + paddle.offsetHeight) {
    // console.log(`ball hitted ${side}`)
  } else {
    // console.log(`ball missed ${side}`)
    //stopBall please work
    stopBall()
    //* calculatePoints()
    //* centerBall()
    //* centerPaddles()
    //* setTimeout(() => {      
    //*   startBall()
    //* }, 3000);
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

const startBall = () => {
  let paddleWidth = player1.offsetWidth //both paddles have equal width

  let ballTop = parseInt(ball.offsetTop)

  let valueBottomWithUnit = window.getComputedStyle(ball, null).getPropertyValue('bottom')
  let ballBottom = parseInt(Number(valueBottomWithUnit.replace(/[^0-9\.]+/g, "")))

  let valueLeftWithUnit = window.getComputedStyle(ball, null).getPropertyValue('left')
  let ballLeft = parseInt(Number(valueLeftWithUnit.replace(/[^0-9\.]+/g, "")))

  let valueRightWithUnit = window.getComputedStyle(ball, null).getPropertyValue('right')
  let ballRight = parseInt(Number(valueRightWithUnit.replace(/[^0-9\.]+/g, "")))

  var directions = [-1, -1]

  //it's everywhere... it's more or less the velocity of the ball?
  var commonValue = 5

  // the higher the value the more vertical the angle becomes
  //bad english right there
  // 1 means default (45deg)
  var moreHorizontal = 1

  // this works only if one of the two values changes
  var moreVertical = 1

  ballTop += commonValue
  ball.style.top = directions[0] + 'px'
  ballLeft += commonValue
  ball.style.left = directions[1] + 'px'

  //let's stop this animation once and for all
  // see the MDN requestAnimationFrame example
  const animationStep = (timeStamp) => {
    // console.log(globalID)

    //? doesn't work ಠ_ಠ ಠ﹏ಠ ಠ╭╮ಠ 눈_눈 (;´༎ຶД༎ຶ`) ㄒoㄒ 〒▽〒
    movePaddles()

    //* it works
    const changeDirection = (side = 'right', directions = [-1, 1]) => {
      //
      if (directions[0] > 0 && directions[1] > 0) {
        if (side === 'bottom') {
          return [-1, 1]
        }
        else if (side === 'right' /* && paddle.isThere */) {
          return [1, -1]
        } else {
          console.log(directions[0], directions[1], side)
        }
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
        console.log('catastrofical error MWAHAHAHAA\nnah, it\'nothing')
        return [-1, 1]
      }
    }

    //ball must not go outside boundaries of <main>
    if (ballTop <= commonValue) {
      ball.style.top = commonValue
      directions = changeDirection('top', directions)
    }
    else if (ballRight <= commonValue + paddleWidth) {
      ball.style.right = paddleWidth + commonValue
      isPaddleThere('right')
      directions = changeDirection('right', directions)
    }
    else if (ballLeft <= commonValue + paddleWidth) {
      ball.style.left = paddleWidth + commonValue
      isPaddleThere('left')
      directions = changeDirection('left', directions)
    }
    else if (ballBottom <= commonValue) {
      ball.style.bottom = commonValue
      directions = changeDirection('bottom', directions)
    }

    ballTop += directions[0] * (commonValue / moreHorizontal)
    ball.style.top = ballTop + 'px'

    ballLeft += directions[1] * (commonValue / moreVertical)
    ball.style.left = ballLeft + 'px'

    valueBottomWithUnit = window.getComputedStyle(ball, null).getPropertyValue('bottom')
    ballBottom = parseInt(Number(valueBottomWithUnit.replace(/[^0-9\.]+/g, "")))

    valueRightWithUnit = window.getComputedStyle(ball, null).getPropertyValue('right')
    ballRight = parseInt(Number(valueRightWithUnit.replace(/[^0-9\.]+/g, "")))

    globalID = requestAnimationFrame(animationStep);
  }

  function startAnimationStep() {
    console.log('once')
    globalID = requestAnimationFrame(animationStep)
  }

  function once(fn, context) {
    var result;
    return function () {
      if (fn) {
        result = fn.apply(context || this, arguments);
        fn = null;
      }
      return result;
    };
  }


  var one_startAnimationStep = once(startAnimationStep)

  one_startAnimationStep()
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


//*
//* HANDLING SIMULTANEOUS KEY PRESSING
//*
const controller = {
  // 'w': { pressed: false, func: movePaddleUp(player1) },
  // 's': { pressed: false, func: movePaddleDown(player1) },
  // 'ArrowUp': { pressed: false, func: movePaddleUp(player2) },
  // 'ArrowDown': { pressed: false, func: movePaddleDown(player2) }
  'w': { pressed: false, func: movePaddleUp(player1) },
  's': { pressed: false, func: movePaddleDown(player1) },
  'ArrowUp': { pressed: false, func: movePaddleUp(player2) },
  'ArrowDown': { pressed: false, func: movePaddleDown(player2) }
}

const movePaddles = () => {
  Object.keys(controller).forEach(key => {
    if (controller[key].pressed) {
      switch (key) {
        case 'w':
          movePaddleUp(player1)
          break;
        case 's':
          movePaddleDown(player1)
          break;
        case 'ArrowUp':
          movePaddleUp(player2)
          break;
        case 'ArrowDown':
          movePaddleDown(player2)
          break;

        default:
          console.log('we have a problem here')
          break;
      }
    }

    // if (controller[key].pressed) {
    //   // controller[key].func
    // }
    // controller[key].pressed && controller[key].func()
    //Huston, we have a problem here
    //no idea how to use objects in JS
  })
}

document.addEventListener("keydown", (e) => {
  let key = e.key || String.fromCharCode(e.keyCode);
  if (controller[key]) {
    controller[key].pressed = true
    // console.log('keydown and controller[key] true')
  }
})

document.addEventListener("keyup", (e) => {
  let key = e.key || String.fromCharCode(e.keyCode);
  if (controller[key]) {
    controller[key].pressed = false
    // console.log('keyup and controller[key] true')
  }
})

//* window event listeners

// const onLoadEvent = () => {
//   // window.addEventListener('keydown', e => {
//   //   player1Move(e)
//   // })


// }

addEventListener('load', () => {
  addEventListener('keydown', e => {
    startBall()
  }, { once: true })
})

addEventListener('load', () => {
  centerBall()
  centerPaddles()
}, { once: true })

addEventListener('resize', () => {
  centerBall()
  centerPaddles()
})