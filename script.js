//top: cant have an high value
const paddles = document.querySelectorAll('.paddle')
const player1 = document.querySelector('.player1') //paddle1
const player2 = document.querySelector('.player2') //paddle2

const ball = document.querySelector('.ball')
const main = document.querySelector('main')

const pGameInfo = document.querySelector('.game-info')
const pcontrolsInfo = document.querySelector('.controls-info')

var globalID
var paddleVelocity = 7

//original value should change along screen width
var originalValue = parseInt(1 + (main.offsetWidth / 400 + main.offsetHeight / 300))
// var originalValue = parseInt(1 + (main.offsetWidth / 600 + main.offsetHeight / 500))
var commonValue = originalValue //* VELOCITY
var incrementValue = 0.2

// the higher the value the more vertical the angle becomes
//bad english right there
// 1 means default (45deg)
var moreHorizontal = 1

// this works only if one of the two values changes
var moreVertical = 1

pcontrolsInfo.style.color = 'white'
setTimeout(() => {
  pcontrolsInfo.style.color = 'hsl(0 100% 100% / 0.5)'
}, 6000);

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

  if (valueTop <= paddleVelocity) {
    paddle.style.top = 0
  } else {
    valueTop -= paddleVelocity
    paddle.style.top = `${valueTop}px`
  }
}

//⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
const movePaddleDown = (paddle) => {
  let valueBottom = window.getComputedStyle(paddle, null).getPropertyValue('bottom')

  //retrieve number with decimals: "450.73px" --> 450.73
  valueBottom = parseInt(Number(valueBottom.replace(/[^0-9\.]+/g, "")))

  paddle.style.top = 'auto'

  if (valueBottom <= paddleVelocity) {
    paddle.style.bottom = 0
  } else {
    valueBottom -= paddleVelocity
    paddle.style.bottom = `${valueBottom}px`
  }
}

//non-blocking code
const calculatePoints = async (side) => {
  //TODO gestire i punti in un oggetto... o array

  let pGameInfoText = pGameInfo.innerHTML

  if (side === 'right') {
    pGameInfo.style.background = 'green'
    pGameInfo.innerHTML = 'Player1 wins'
  }
  else if (side === 'left') {
    pGameInfo.style.background = 'hsl(20 100% 40%)'
    pGameInfo.innerHTML = 'Player2 wins'
  }
  else { console.log('something\'s wrong here') }

  setTimeout(() => {
    pGameInfo.style.background = 'transparent'
    pGameInfo.innerHTML = pGameInfoText
  }, 3000);
}

// const stopBall = () => {
//   cancelAnimationFrame(globalID)
// }

const isPaddleThere = (side = 'left') => {
  let paddle
  if (side === 'left') paddle = player1
  else if (side === 'right') paddle = player2

  let paddleTopCheck = parseInt(paddle.offsetTop)
  // let paddleBottomCheck = window.getComputedStyle(paddle, null).getPropertyValue('bottom')
  // paddleBottomCheck = parseInt(Number(paddleBottomCheck.replace(/[^0-9\.]+/g, "")))
  let ballTopCheck = window.getComputedStyle(ball, null).getPropertyValue('top')
  ballTopCheck = parseInt(Number(ballTopCheck.replace(/[^0-9\.]+/g, "")))

  //check if paddle are there when G0ndor was having an heart attack.. wait what
  let underTheBall = ballTopCheck + ball.offsetHeight
  let underThePaddle = paddleTopCheck + paddle.offsetHeight
  let halfBall = ballTopCheck + ball.offsetHeight / 2

  if (underTheBall >= paddleTopCheck && ballTopCheck <= underThePaddle) {
    //* console.log(`ball hitted ${side}`)

    //TODO change angle based on what part of the paddle the ball hits
    if (underTheBall >= paddleTopCheck &&
      halfBall <= paddleTopCheck + paddle.offsetHeight * (3 / 10)) {

      // ball.style.background = 'white'
      // ball.style.boxShadow = 'inset 0 0 0 3px red'
      moreVertical = 1.2
      moreHorizontal = 1

    } else if (halfBall > paddleTopCheck + paddle.offsetHeight * (3 / 10) &&
      halfBall <= paddleTopCheck + paddle.offsetHeight * (7 / 10)) {

      // ball.style.background = 'orangered'
      // ball.style.boxShadow = 'none'
      moreVertical = 1
      moreHorizontal = 1

    } else if (halfBall > paddleTopCheck + paddle.offsetHeight * (7 / 10) &&
      ballTopCheck <= paddleTopCheck + paddle.offsetHeight) {

      // ball.style.background = 'green'
      // ball.style.boxShadow = 'inset 0 0 0 3px blue'
      moreVertical = 1.2
      moreHorizontal = 1

    } else {
      console.log('collision calculations are wrong...')
    }

    return true
  } else {

    //* console.log(`ball missed ${side}`)

    // stopBall() //stopBall doesn't work

    calculatePoints(side)

    centerBall()

    centerPaddles()

    setTimeout(() => {
      window.addEventListener('keydown', () => startBall(),
        { once: true })
    }, 1000);

    return false
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

  //randomize initial direction
  //if between min>0 and max -> Math.floor(Math.random() * (max - min + 1) + min);
  let range = { min: 0, max: 1 }
  let delta = range.max - range.min //+ 1
  let rand1 = Math.round(Math.random() * delta)// + range.min
  let rand2 = Math.round(Math.random() * delta)// + range.min
  if (rand1 === 0) rand1 = -1
  if (rand2 === 0) rand2 = -1

  var directions = [rand1, rand2]

  ballTop += commonValue
  ball.style.top = directions[0] + 'px'
  ballLeft += commonValue
  ball.style.left = directions[1] + 'px'

  //let's stop this animation once and for all
  // see the MDN requestAnimationFrame example
  const animationStep = (timeStamp) => {
    // console.log(globalID)
    console.log(commonValue)

    //? It works temporarily
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
      directions = changeDirection('right', directions)
      let boolCheck = isPaddleThere('right')
      if (!boolCheck) {
        commonValue = originalValue
        return //returns undefined...
      }
      commonValue += incrementValue
    }
    else if (ballLeft <= commonValue + paddleWidth) {
      ball.style.left = paddleWidth + commonValue
      directions = changeDirection('left', directions)
      let boolCheck = isPaddleThere('left')
      if (!boolCheck) {
        commonValue = originalValue
        return  //returns undefined...
      }
      commonValue += incrementValue
    }
    else if (ballBottom <= commonValue) {
      ball.style.bottom = commonValue
      directions = changeDirection('bottom', directions)
    }

    // console.log(directions[0] * (commonValue / moreHorizontal).toFixed(2))

    try {
      ballTop += directions[0] * (commonValue / moreHorizontal).toFixed(2)
    } catch (error) {
      alert(error)
    }
    ball.style.top = ballTop + 'px'

    try {
      ballLeft += directions[1] * (commonValue / moreVertical).toFixed(2)
    } catch (error) {
      alert(error)
    }
    ball.style.left = ballLeft + 'px'

    valueBottomWithUnit = window.getComputedStyle(ball, null).getPropertyValue('bottom')
    ballBottom = parseInt(Number(valueBottomWithUnit.replace(/[^0-9\.]+/g, "")))

    valueRightWithUnit = window.getComputedStyle(ball, null).getPropertyValue('right')
    ballRight = parseInt(Number(valueRightWithUnit.replace(/[^0-9\.]+/g, "")))

    globalID = requestAnimationFrame(animationStep);
  }

  globalID = requestAnimationFrame(animationStep)
  // function startAnimationStep() {
  // }

  // function once(fn, context) {
  //   var result;
  //   return function () {
  //     if (fn) {
  //       result = fn.apply(context || this, arguments);
  //       fn = null;
  //     }
  //     return result;
  //   };
  // }

  // var one_startAnimationStep = once(startAnimationStep)

  // one_startAnimationStep()
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
  'w': { pressed: false },
  's': { pressed: false },
  'ArrowUp': { pressed: false },
  'ArrowDown': { pressed: false }
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
          //*the default cant run in the first place...
          //TODO make a div that shows on screen 
          //TODO when someone hit the wrong key
          //TODO too many times
          //TODO press w or s or arrowup or arrowdown
          console.log('wrong key')
          let divInMain = document.createElement('div')
          divInMain = main.appendChild(divInMain)
          divInMain.style.position = 'absolute'
          divInMain.style.bottom = '0'
          divInMain.style.padding = '1rem'
          divInMain.style.background = 'red'
          divInMain.innerHTML = 'Press <strong>W, S, ArrowUp, ArrowDown</strong> to move the paddles'
          break;
      }
    }

    // if (controller[key].pressed) {
    //   // controller[key].func
    // }
    // controller[key].pressed && controller[key].func()
    //Huston, we have a problem here
    //no idea how to use objects/classes in JS
  })
}

document.addEventListener("keydown", (e) => {
  let key = e.key || String.fromCharCode(e.keyCode);
  if (controller[key]) {
    controller[key].pressed = true
  }
})

document.addEventListener("keyup", (e) => {
  let key = e.key || String.fromCharCode(e.keyCode);
  if (controller[key]) {
    controller[key].pressed = false
  }
})

//* window event listeners

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