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
const bgMusic = new Audio('https://cdn.jsdelivr.net/gh/trivo191919/wallahi-dream-girl@4efef5bcae3171a949a1c46f58a8f8c07dfece1a/TOTOF.mp3')


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

let initiated = false

bgMusic.volume = 1

body.addEventListener('click', () => {
    video.play()

    welcomeWrapper.classList.add('ok')

    setTimeout(() => bgMusic.play(), 500)
}, { once: true })

bgMusic.addEventListener('ended', () => bgMusic.play())

function insertListItens() {
    const html = MENU_LINKS.reduce((acc, item, currentIndex) => {
        let className = ''

        if (currentIndex == 0) {
            className = 'class="selected"'
        } 

        acc += `<li style="transform: rotate(${item.rotation}); opacity: ${item.opacity};" ${className} data-description="${item.description}">${item.title}</li>`

        return acc
    }, '')

    menu.innerHTML = html
}


function openSelectedMenuItem() {
    const selected = menu.querySelector('li.selected')
    if (!selected || selected.textContent.trim() !== 'Login') return

    loginMessage.textContent = ''
    loginForm.reset()
    loginPanel.hidden = false
    loginUser.focus()
}

function initMenuLinkOver() {
    const items = menu.querySelectorAll('li')

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !loginPanel.hidden) {
            loginPanel.hidden = true
            return
        }

        if (!loginPanel.hidden || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return

        e.preventDefault()

        const selectedIndex = [...items].findIndex(item =>
            item.classList.contains('selected')
        )
        const direction = e.key === 'ArrowDown' ? 1 : -1
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
 
    menu.addEventListener('click', (e) => {
        const item = e.target.closest('li')
        if (!item) return

        items.forEach(menuItem => menuItem.classList.remove('selected'))
        item.classList.add('selected')
        itemDescription.textContent = item.dataset.description || ''
        if (item.textContent.trim() === 'Login') openSelectedMenuItem()
    }) 

    document.querySelector('#login-cancel').addEventListener('click', () => {
        loginPanel.hidden = true
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
        
        access.textContent = `RANK: 5`
        userLabel.textContent = `NAME: ${user.nickname}`
        loginMessage.textContent = `get, ${user.nickname}!`
        loginPanel.hidden = true
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
