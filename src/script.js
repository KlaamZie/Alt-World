import Experience from './Experience/Experience.js'

const experience = new Experience(document.querySelector('canvas.webgl'))
const blocker = document.querySelector( '#blocker' );
const instructions = document.querySelector( '#instructions' );

blocker.addEventListener( 'click',  () => {
    start()
});

blocker.addEventListener( 'touchstart',  () => {
    start()
});

const sound = new Audio('./sounds/ambient.mp3')
sound.loop = true

const soundOnButton = document.querySelector('#sound-on')
const soundOffButton = document.querySelector('#sound-off')

soundOnButton.addEventListener('click', () => {
    cutSound()
})

soundOnButton.addEventListener('touchstart', () => {
    cutSound()
})

soundOffButton.addEventListener('click', () => {
    uncutSound()
})

soundOffButton.addEventListener('touchstart', () => {
    uncutSound()
})

const cutSound = () => {
    sound.pause()
    soundOnButton.style.display = 'none'
    soundOffButton.style.display = 'block'
}

const uncutSound = () => {
    sound.play()
    soundOnButton.style.display = 'block'
    soundOffButton.style.display = 'none'
}

const menu = document.querySelector('#menu')

menu.addEventListener('click', () => {
    displayMenu()
})

menu.addEventListener('touchstart', () => {
    displayMenu()
})

const displayMenu = () => {
    menu.style.opacity = 0;
    blocker.style.zIndex = 99;
    blocker.style.opacity = 1;
    experience.camera.isLocked = true;
}

const start = () => {
    blocker.style.opacity = 0;
    experience.camera.isLocked = false;
    menu.style.opacity = 1;
    setTimeout(() => {
        blocker.style.zIndex = -1;
    }, 1000)
    sound.play();
}