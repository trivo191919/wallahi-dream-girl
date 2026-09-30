const body = document.querySelector('body')
const menuWrapper = document.querySelector('.menu-wrapper')
const menu = menuWrapper.querySelector('.menu')
const videoWrapper = document.querySelector('.video-wrapper')
const video = document.querySelector('#video')
const welcomeWrapper = document.querySelector('.welcome-wrapper')
const itemDescription = document.querySelector('.item-description')
const main = document.querySelector('main')
const loginPanel = document.querySelector('#login-panel')
const loginForm = document.querySelector('#login-form')
const loginUser = document.querySelector('#login-user')
const loginPass = document.querySelector('#login-pass')
const loginMessage = document.querySelector('#login-message')
const userLabel = document.querySelector('#user-label')
const access = document.querySelector('#access-yes')

const audio = new Audio('https://cdn.jsdelivr.net/gh/emanoelqueiroz/persona-3-menu@5427ccb58d7a3617704e16aedaf196b942b88162/sounds/menu.mp3')

const MUSIC_OPTIONS = [
    {
        title: 'Threats Of The Ocean Sea',
        description: 'Play Threats Of The Ocean Sea, DM DOKURO',
        url: 'https://cdn.jsdelivr.net/gh/trivo191919/wallahi-dream-girl@latest/TOTOF.mp3',
    },
    {
        title: 'Children Of The City',
        description: 'Play Children Of The City, Mili',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
        title: 'Color Your Night',
        description: 'Play Color Your Night, Genius',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
]

const bgMusic = new Audio(MUSIC_OPTIONS[0].url)


const USERS = [
    {
        person: 'V',
        pass: 'x01003829',
        nickname: 'VV',
    },
        {
        person: 'GS',
        pass: 'x19191920',
        nickname: 'Gabriel Preston Vo',
        },
    {
        person: 'Local',
        pass: 'x12121290',
        nickname: 'Preston Vo Savory',
    },
        {
        person: 'Bishop',
        pass: 'x12790',
        nickname: 'Bishop da smith',
        },
    {
        person: 'Qu',
        pass: 'moron',
        nickname: 'Quinni',
    },
        {
        person: 'Max',
        pass: 'luluyam',
        nickname: 'phanuel lova',
        },
    {
        person: 'boi',
        pass: 'ihateboi',
        nickname: 'Mason boy',
    },
]

const MENU_LINKS = [
{
        title: 'Methods',
        description: 'Choose from a list',
        opacity: 1,
        rotation: '-10deg',
    },
    {
        title: 'Settings',
        description: 'Set your stuff up',
        opacity: 0.8,
        rotation: '-5deg',
    },
    {
        title: 'Themes',
        description: 'Choose your startup themes',
        opacity: 0.6,
        rotation: '-10deg',
    },
    {
        title: 'Login',
        description: 'Login to use the things',
        opacity: 1,
        rotation: '-5deg',
    },
    {
        title: 'Archives',
        description: 'My Archives',
        opacity: 0.8,
        rotation: '-10deg',
    },
    {
        title: 'Talk',
        description: 'Talk to others with a reworked UI',
        opacity: 0.6,
        rotation: '-5deg',
    },
    {
        title: 'Socials',
        description: 'View Social Links',
        opacity: 1,
        rotation: '-10deg',
    },

    /* {
        title: 'Calendar',
        description: 'View Calendar',
        opacity: 0.8,
        rotation: '-5deg',
    },
    vaulted
    */

    {
        title: 'Credits',
        description: 'View Credits',
        opacity: 0.6,
        rotation: '-10deg',
    },
]

const METHODS_LIST = [
    {
        title: 'Lucide',
        description: 'wallahi dream site',
        opacity: 1,
        rotation: '-5deg',
    },
    {
        title: 'pizza',
        description: 'idiot cross site',
        opacity: 0.8,
        rotation: '5deg',
    },
    {
        title: 'template',
        description: 'template',
        opacity: 0.6,
        rotation: '-5deg',
    },
]

let currentList = 'main'
let currentMusicIndex = 0
let initiated = false
let isLoggedIn = false
let openMethodsAfterLogin = false

bgMusic.volume = 1

body.addEventListener('click', () => {
    video.play()

    welcomeWrapper.classList.add('ok')

    setTimeout(() => bgMusic.play(), 500)
}, { once: true })

bgMusic.addEventListener('ended', () => bgMusic.play())

function renderMenu(list, listName) {
    currentList = listName
    menu.classList.toggle('methods-menu', listName === 'methods')
    menu.classList.toggle('music-menu', listName === 'music')
    menu.innerHTML = list.map((item, index) => {
        const isSelected = listName === 'music' ? index === currentMusicIndex : index === 0
        return `
        <li style="transform: rotate(${item.rotation}); opacity: ${item.opacity};"
            class="${isSelected ? 'selected' : ''}"
            data-description="${item.description}">${item.title}</li>
    `
    }).join('')
    menu.querySelectorAll('li').forEach((item, index) => {
        item.animate(
            [{ opacity: 0 }, { opacity: list[index].opacity }],
            { duration: 450, delay: index * 130, easing: 'ease-out', fill: 'both' }
        )
    })
    const selectedIndex = listName === 'music' ? currentMusicIndex : 0
    itemDescription.textContent = list[selectedIndex]?.description || ''
}

function insertListItens() {
    renderMenu(MENU_LINKS, 'main')
}

function openSelectedMenuItem() {
    const selected = menu.querySelector('li.selected')
    if (!selected) return

    const title = selected.textContent.trim()
    if (currentList === 'main' && title === 'Methods') {
        if (!isLoggedIn) {
            openMethodsAfterLogin = true
            loginForm.reset()
            loginMessage.textContent = 'dude login first'
            loginPanel.hidden = false
            loginUser.focus()
            return
        }
        renderMenu(METHODS_LIST, 'methods')
        return
    }

    if (currentList === 'main' && title === 'Themes') {
        renderMenu(MUSIC_OPTIONS, 'music')
        return
    }

    if (currentList === 'music') {
        const musicIndex = MUSIC_OPTIONS.findIndex(track => track.title === title)
        if (musicIndex !== -1) {
            currentMusicIndex = musicIndex
            bgMusic.src = MUSIC_OPTIONS[musicIndex].url
            bgMusic.load()
            bgMusic.play()
            itemDescription.textContent = `Now playing: ${MUSIC_OPTIONS[musicIndex].title}`
        }
        return
    }

    if (currentList !== 'main' || title !== 'Login') return

    openMethodsAfterLogin = false
    loginMessage.textContent = ''
    loginForm.reset()
    loginPanel.hidden = false
    loginUser.focus()
}

function initMenuLinkOver() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !loginPanel.hidden) {
            loginPanel.hidden = true
            openMethodsAfterLogin = false
            return
        }

        if (e.key === 'Escape' && (currentList === 'methods' || currentList === 'music')) {
            renderMenu(MENU_LINKS, 'main')
            return
        }

        const horizontalKey = e.key === 'ArrowLeft' || e.key === 'ArrowRight'
        const verticalKey = e.key === 'ArrowUp' || e.key === 'ArrowDown'
        if (!loginPanel.hidden || (!horizontalKey && !verticalKey)) return
        if (currentList === 'methods' ? !horizontalKey : !verticalKey) return

        e.preventDefault()

        const items = [...menu.querySelectorAll('li')]
        const selectedIndex = items.findIndex(item => item.classList.contains('selected'))
        const forward = e.key === 'ArrowDown' || e.key === 'ArrowRight'
        const direction = forward ? 1 : -1
        const nextIndex = (selectedIndex + direction + items.length) % items.length

        items.forEach(item => item.classList.remove('selected'))
        items[nextIndex].classList.add('selected')
        itemDescription.textContent = items[nextIndex].dataset.description || ''

        audio.pause()
        audio.currentTime = 0.04
        audio.play()
    })

    document.addEventListener('keydown', (e) => {
        if (loginPanel.hidden && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            openSelectedMenuItem()
        }
    })
 
     document.querySelector('#login-cancel').addEventListener('click', () => {
        loginPanel.hidden = true
        openMethodsAfterLogin = false
    })

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const username = loginUser.value.trim().toLowerCase()
        const password = loginPass.value
        const user = USERS.find(account =>
            account.person.toLowerCase() === username && account.pass === password
        )

        if (!user) {
            loginMessage.textContent = 'your a bad cackie'
            loginPass.select()
            return
        }
        
        isLoggedIn = true
        access.textContent = `RANK: 5`
        userLabel.textContent = `NAME: ${user.nickname}`
        loginMessage.textContent = `get, ${user.nickname}!`
        loginPanel.hidden = true
        if (openMethodsAfterLogin) {
            openMethodsAfterLogin = false
            renderMenu(METHODS_LIST, 'methods')
        }
    })
}


video.addEventListener('timeupdate', () => {
    if (video.currentTime < 1.60 || initiated) {
        return
    }

    initiated = true

    body.classList.add('background')
    main.classList.add('show')
})

video.addEventListener('ended', () => {
    videoWrapper.innerHTML = '<video autoplay muted loop id="video"><source src="https://cdn.jsdelivr.net/gh/emanoelqueiroz/persona-3-menu@5427ccb58d7a3617704e16aedaf196b942b88162/videos/bg-video-2.mp4" type="video/mp4"></video>';
})

insertListItens()
initMenuLinkOver()
