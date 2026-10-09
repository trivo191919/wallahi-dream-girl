
//you will vanish into nothingness if you are looking at this message

//you will vanish into nothingness if you are looking at this message
//you will vanish into nothingness if you are looking at this message
//you will vanish into nothingness if you are looking at this message
//you will vanish into nothingness if you are looking at this message
//you will vanish into nothingness if you are looking at this message
//you will vanish into nothingness if you are looking at this message
//you will vanish into nothingness if you are looking at this message
//you will vanish into nothingness if you are looking at this message
//you will vanish into nothingness if you are looking at this message
//you will vanish into nothingness if you are looking at this message
//you will vanish into nothingness if you are looking at this message
//you will vanish into nothingness if you are looking at this message
//you will vanish into nothingness if you are looking at this message
//you will vanish into nothingness if you are looking at this message
//you will vanish into nothingness if you are looking at this message
//you will vanish into nothingness if you are looking at this message
//you will vanish into nothingness if you are looking at this message
//you will vanish into nothingness if you are looking at this message
//you will vanish into nothingness if you are looking at this message
//you will vanish into nothingness if you are looking at this message

//you will vanish into nothingness if you are looking at this message












const body = document.querySelector('body')
const menuWrapper = document.querySelector('.menu-wrapper')
const menu = menuWrapper.querySelector('.menu')
const videoWrapper = document.querySelector('.video-wrapper')
const video = document.querySelector('#video')
const welcomeWrapper = document.querySelector('.welcome-wrapper')
const itemDescription = document.querySelector('.item-description')
const main = document.querySelector('main')
const loginPanel = document.querySelector('#login-panel')
const updatesOverlay = document.querySelector('#updates-overlay')
const updatesLog = document.querySelector('#updates-log')
const loginForm = document.querySelector('#login-form')
const loginUser = document.querySelector('#login-user')
const loginPass = document.querySelector('#login-pass')
const loginMessage = document.querySelector('#login-message')
const userLabel = document.querySelector('#user-label')
const access = document.querySelector('#access-yes')
const trivoURLlink = `${window.WAVE_WELCOME_SOURCE}/gh/trivo191919/wallahi-dream-girl@latest`
const videoAssetBase = `${window.WAVE_VIDEO_SOURCE}/gh/emanoelqueiroz/persona-3-menu@latest`

const audio = new Audio(`${videoAssetBase}/sounds/menu.mp3`)


        
const MUSIC_OPTIONS = [
    //it goes from 0 1 2 3 4
    {
        title: 'Threats Of The Ocean Sea',
        description: 'Primordial Wyrm as awakened!',
        url: `${trivoURLlink}/TOTOF.mp3`,
    },
    {
        title: 'Children Of The City',
        description: 'Oh, its time for another vendetta.',
        url: `${trivoURLlink}/cotc.mp3`,
    },
    {
        title: 'Color Your Night',
        description: 'Two hands meet at zenith',
        url: `${trivoURLlink}/cyn.mp3`,
    },
    {
        title: 'Crystallized',
        description: 'My heart, my words, my self, my voices, my love!',
        url: `${trivoURLlink}/crystal.mp3`,
    },
    {
        title: 'In Hell We live, Lament.',
        description: 'Lament, if you wanted me to live!',
        url: `${trivoURLlink}/lament.mp3`,
    },
]

const bgMusic = new Audio(MUSIC_OPTIONS[3].url);




















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
    {
        person: 'emili',
        pass: 'exv',
        nickname: 'emilio the _____',
    },
    {
        person: 'andersonion',
        pass: 'dingus',
        nickname: 'anderdingus',
    },
    {
        person: 'e',
        pass: 'e',
        nickname: 'template',
    },
    
]



































// buttons for main screen i guess???
const MENU_LINKS = [
    {
        title: 'Methods',
        description: 'methods of entertainments',
        opacity: 1,
        rotation: '-10deg',
    },
    {
        title: 'Settings',
        description: 'alter ur life',
        opacity: 0.8,
        rotation: '-5deg',
    },
    {
        title: 'Themes',
        description: 'Choose your startup snongs',
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
        description: 'Talk to others who uses WAVE',
        opacity: 0.6,
        rotation: '-5deg',
    },
    {
        title: 'Socials',
        description: 'View Social Links',
        opacity: 1,
        rotation: '-10deg',
    },

    {
        title: 'Calendar',
        description: 'View the update schedules',
        opacity: 0.8,
        rotation: '-5deg',
    },

    {
        title: 'Updates',
        description: 'View recent updates',
        opacity: 0.6,
        rotation: '-10deg',
    },
]




















//slop list of games or something idk ill think about it later
const METHODS_LIST = [
    {
        title: 'RED',
        description: 'pokemon red, saves, i think, yea, , ,, , ,, , ,,, ',
        opacity: 1,
        rotation: '-5deg',
        fetcher: `${trivoURLlink}/PR.html`,
    },
    {
        title: 'life',
        description: 'life.',
        opacity: 1,
        rotation: '-2deg',
        fetcher: `${trivoURLlink}/B.html`,
    }, //done
    {
        title: 'Web dasher',
        description: 'stupid larp geometry dash',
        opacity: 1,
        rotation: '-5deg',
        fetcher: `${trivoURLlink}/WD.html`,
    }, //next
    {
        title: 'Stardew valley',
        description: 'harvest, plant, water, sleep repeat.',
        opacity: 0.8,
        rotation: '-2deg',
        fetcher: `${trivoURLlink}/SV.html`,
    }, //done
    {
        title: 'majora mask',
        description: 'you met a terrible fate, havent you?',
        opacity: 0.6,
        rotation: '-3deg',
        fetcher: `${trivoURLlink}/MM.html`,
    }, //done
]































//update log update here mihahaha
const UPDATE_LOG = [
    { text: 'Vesion 4.1, the updated Methods list to contain better stuff.', color: '#ffe29a' },
    { text: 'Vesion 4.0, working on settings and auto login, added some stuff, changed methods and made them change the background', color: '#ffe29a' },
    { text: 'Vesion 3.9, changed the themes and made some songs play on startup, working on settings and the n i do stuff i guess', color: '#a8e6cf' },
    { text: 'Vesion 3.8, changed it so you can use both "esc" and "shift" for exiting a page', color: '#ffb6d9' },
    { text: 'Vesion 3.7, fixed Themes, starting to work on methods, fixed bug where the music disc orbits around the red part, made startup panel supporting both CDNs', color: '#a8e6cf' },
    { text: 'Vesion 3.6, Changed keybind to exit tab from "Escape" to "Shift"', color: '#ffe29a' },
    { text: 'Vesion 3.5, added dependency check, I miss summit dude', color: '#a8e6cf' },
    { text: 'Version 3.4, accessible at school for you guys', color: '#d7b6ff' },
    { text: 'Vesion 3.3, added 4 songs', color: '#ffb6d9' },
    { text: 'Vesion 3.2 Fixed the login page', color: '#a8e6cf' },
    { text: 'Vesion 3.1, started on the site, made by van and only van else its another van', color: '#ffe29a' },
    
    
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
//really important, sets background music and then sets the timer for a specific time
    setTimeout(() => bgMusic.currentTime=7,bgMusic.play(), 500)
    
}, { once: true })
//super duper necessary
bgMusic.addEventListener('ended', () => bgMusic.play())

function renderMenu(list, listName) {
    currentList = listName
    menu.classList.toggle('methods-menu', listName === 'methods')
    menu.classList.toggle('music-menu', listName === 'music')
    menu.innerHTML = list.map((item, index) => {
        const isSelected = listName === 'music' ? index === currentMusicIndex : index === 0
        const rotation = listName === 'music' ? '' : `transform: rotate(${item.rotation});`
        return `
        <li style="${rotation} opacity: ${item.opacity};"
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
    renderMenu(MENU_LINKS, 'main');
}

function showUpdates() {
    updatesLog.replaceChildren(...UPDATE_LOG.map(entry => {
        const line = document.createElement('p')
        line.textContent = entry.text
        line.style.color = entry.color
        return line
    }))
    menu.hidden = true
    updatesOverlay.hidden = false
    currentList = 'updates'
    requestAnimationFrame(() => updatesOverlay.classList.add('visible'))
}

function closeUpdates() {
    updatesOverlay.classList.remove('visible')
    currentList = 'closing-updates'
    setTimeout(() => {
        updatesOverlay.hidden = true
        menu.hidden = false
        renderMenu(MENU_LINKS, 'main')
    }, 250)
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

    if (currentList === 'main' && title === 'Updates') {
        showUpdates()
        return
    }

    if (currentList === 'methods') {
        const method = METHODS_LIST.find(item => item.title === title)
        if (!method) return

        const methodTab = window.open('', '_blank')
        if (!methodTab) {
            itemDescription.textContent = 'Allow pop-ups to open this method.'
            return
        }

        methodTab.document.write('<!DOCTYPE html><title>Loading method...</title><p>Loading...</p>')
        fetch(method.fetcher)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`)
                return response.text()
            })
            .then(html => {
                methodTab.document.open()
                methodTab.document.write(html)
                methodTab.document.close()
            })
            .catch(() => {
                methodTab.document.open()
                methodTab.document.write('<!DOCTYPE html><title>Unable to load method</title><p>Unable to load this page.</p>')
                methodTab.document.close()
            })
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
        if (e.key === 'Shift' && !loginPanel.hidden) {
            loginPanel.hidden = true
            openMethodsAfterLogin = false
            return
        }
        if (e.key === 'Escape' && !loginPanel.hidden) {
            loginPanel.hidden = true
            openMethodsAfterLogin = false
            return
        }

        if (e.key === 'Escape' && (currentList != 'main')) {
            closeUpdates()
            renderMenu(MENU_LINKS, 'main')
            return
        }
        
        
       if (e.key === 'Shift' && (currentList != 'main' )) {
            closeUpdates()
            renderMenu(MENU_LINKS, 'main')
            return
        }
        /*
        if (e.key === 'Escape' && (currentList === 'methods' || currentList === 'music')) {
            renderMenu(MENU_LINKS, 'main')
            return
        }
        ts vaulted so we dont keep this unless i need the function lol
*/


        if (currentList === 'updates') return

        const verticalKey = e.key === 'ArrowUp' || e.key === 'ArrowDown'
        if (!loginPanel.hidden || !verticalKey) return

        e.preventDefault()

        const items = [...menu.querySelectorAll('li')]
        const selectedIndex = items.findIndex(item => item.classList.contains('selected'))
        const forward = e.key === 'ArrowDown' || e.key === 'ArrowRight'
        const direction = forward ? 1 : -1
        const nextIndex = (selectedIndex + direction + items.length) % items.length

        items.forEach(item => item.classList.remove('selected'))
        items[nextIndex].classList.add('selected')
        itemDescription.textContent = items[nextIndex].dataset.description || ''

        audio.pause();
        audio.currentTime = 0;
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
        access.textContent = `Rank: 9`
        userLabel.textContent = `NAME: ${user.nickname}`
        loginMessage.textContent = `get, ${user.nickname}`
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
    videoWrapper.innerHTML = `<video autoplay muted loop id="video"><source src="${videoAssetBase}/videos/bg-video-2.mp4" type="video/mp4"></video>`;
})

insertListItens()
initMenuLinkOver()
