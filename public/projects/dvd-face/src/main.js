/*
  Script to make your face a dvd logo
*/

const SPEED = 0.2   // Screen widths per second (e.g. 0.5 = 2 seconds to cross the screen)
const COLOURS = [
  'blue',
  'magenta',
  'green',
  'crimson',
  'darkgreen',
  'darkviolet',
  'deeppink',
  'red',
  'yellow',
  'indigo',
  'orangered',
  'yellowgreen'
]


const mediaContainer = document.getElementById('media')

const video = document.createElement('video')
video.autoplay = true

let videoStream

function enableWebcam() {
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      videoStream = stream

      // Add video stream to page
      mediaContainer.appendChild(video)
      video.srcObject = stream
      video.style.width = '40%'

      // Make button take a photo
      document.getElementById('mainBtn').innerHTML = 'Take Photo'
      document.getElementById('mainBtn').onclick = takePhoto

    })
    .catch(err => {
      console.log('Something went wrong!')
    });
  }

}


async function takePhoto() {
  await faceapi.loadTinyFaceDetectorModel('models')

  // Save image before analysing it
  let image = getImageFromVideoStream(video)

  const results = await faceapi.tinyFaceDetector(
    image,
    { inputSize: 512, scoreThreshold: 0.01 }
  )

  // Take another photo if nothing is recognised
  if (results.length === 0) {
    alert('No face detected, take another photo.')
    return
  }

  // Stop video stream
  videoStream.getTracks().forEach(track => track.stop())


  // Get face with most certainty
  let bestFace
  results.forEach(face => {
    if (!bestFace || face.classScore > bestFace.classScore) {
      bestFace = face
    }
  })

  // Replace video with canvas
  const canvas = document.createElement('canvas')
  canvas.width = video.clientWidth
  canvas.height = video.clientHeight
  mediaContainer.removeChild(video)
  mediaContainer.appendChild(canvas)

  // Remove button
  document.body.removeChild(document.getElementById('mainBtn'))

  // Start DVD animation
  startAnimation(canvas, image, bestFace)
}


/**
 * Save the current state of webcam to an image element
 * @param {HTMLVideoElement} video video stream
 * @returns {Image} the image element
 */
function getImageFromVideoStream(video) {

  // Create a canvas and draw video stream onto canvas
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = video.clientWidth
  canvas.height = video.clientHeight
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

  // Generate image from canvas
  let image = new Image()
  image.width = video.clientWidth
  image.height = video.clientHeight
  let data = canvas.toDataURL('image/png')
  image.setAttribute('src', data)
  
  return image
}



function startAnimation(canvas, image, face) {
  const ctx = canvas.getContext('2d')

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
  faceapi.draw.drawDetections(canvas, face)

  let box = {
    x: face.box.x,
    y: face.box.y,
    w: face.box.width,
    h: face.box.height,
    vx: canvas.width * SPEED,
    vy: canvas.width * SPEED
  }

  let colour = randomColour()

  const animationFrame = () => {
    // Move box
    box.x += box.vx / 60
    box.y += box.vy / 60

    // Handle box collision with walls
    if (box.x < 0) {
      box.x = -box.x
      box.vx *= -1
      colour = randomColour()
    } else if (box.x + box.w > canvas.width) {
      box.x = canvas.width - box.w
      box.vx *= -1
      colour = randomColour()
    }

    if (box.y < 0) {
      box.y = -box.y
      box.vy *= -1
      colour = randomColour()
    } else if (box.y + box.h > canvas.height) {
      box.y = canvas.height - box.h
      box.vy *= -1
      colour = randomColour()
    }

    // Draw image
    ctx.drawImage(
      image, 
      box.x - face.box.x, 
      box.y - face.box.y, 
      canvas.width, 
      canvas.height
    )


    // Draw some nice changing colours
    ctx.fillStyle = colour
    ctx.globalAlpha = 0.05
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.globalAlpha = 0.2
    ctx.fillRect(box.x - face.box.x, box.y - face.box.y, canvas.width, canvas.height)
    ctx.globalAlpha = 1.0


    // Draw a rectangle around box
    // ctx.strokeStyle = 'rgba(0,0,255,0.5)'
    // ctx.beginPath();
    // ctx.rect(box.x, box.y, box.w, box.h);
    // ctx.stroke();

    
    window.requestAnimationFrame(animationFrame)
  }


  // Start animation in 1 second
  setTimeout(animationFrame, 3000)
  
}

/**
 * Returns a random colour which is NOT the old colour
 * @param {String} oldColour
 * @returns {String} the new colour
 */
function randomColour(oldColour=undefined) {
  colour = COLOURS[Math.floor(Math.random()*COLOURS.length)]
  if (oldColour == undefined || oldColour != colour) {
    return colour
  }
  return randomColour(oldColour)
}
