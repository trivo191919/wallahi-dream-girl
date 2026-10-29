
//you will vanish into nothingness if you are looking at this message

// to do list stupid thing because ok
// Tomb of the Mask      109-fix.html       vD
// Celeste               623-fix2.html      vD
// Bad Piggies           752-fix.html       vD
// Trees hate YOU        801-fix3.html      vD
// Lobotomy Corp         850.html           vD
// WaterWorks            594-fix2.html      vD
// MC 
//
//
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
const METHODS_PER_PAGE = 6
let currentMethodsPage = 0
let person = 'Guest'
const videoWrapper = document.querySelector('.video-wrapper')
const video = document.querySelector('#video')
const welcomeWrapper = document.querySelector('.welcome-wrapper')
const itemDescription = document.querySelector('.item-description')
const main = document.querySelector('main')
const loginPanel = document.querySelector('#login-panel')
const talkPanel = document.querySelector('#talk-panel')
const talkStatus = document.querySelector('#talk-status')
const talkMessages = document.querySelector('#talk-messages')
const talkForm = document.querySelector('#talk-form')
const talkInput = document.querySelector('#talk-input')
const updatesOverlay = document.querySelector('#updates-overlay')
const updatesLog = document.querySelector('#updates-log')
const archivesOverlay = document.querySelector('#archives-overlay')
const archivesSidebar = document.querySelector('#archives-sidebar')
const archivesPage = document.querySelector('#archives-page')
const loginForm = document.querySelector('#login-form')
const loginUser = document.querySelector('#login-user')
const loginPass = document.querySelector('#login-pass')
const loginMessage = document.querySelector('#login-message')
const userLabel = document.querySelector('#user-label')
const access = document.querySelector('#access-yes')
const announceOpen = document.querySelector('#announce-open')
const announceForm = document.querySelector('#announce-form')
const announceInput = document.querySelector('#announce-input')
const announceStatus = document.querySelector('#announce-status')
const announcementBanner = document.querySelector('#announcement-banner')
const announcementText = document.querySelector('#announcement-text')
const accessGate = document.querySelector('#access-gate')
const accessStatus = document.querySelector('#access-status')
const accessUid = document.querySelector('#access-uid')
const sourceSetupPanel = document.querySelector('#source-setup')
const trivoURLlink = `${window.WAVE_WELCOME_SOURCE}/gh/trivo191919/wallahi-dream-girl@latest`
const videoAssetBase = `${window.WAVE_VIDEO_SOURCE}/gh/emanoelqueiroz/persona-3-menu@latest`

const audio = new Audio(`${videoAssetBase}/sounds/menu.mp3`)

const firebaseConfig = {
  apiKey: "AIzaSyDM9pqr3elR66riVeas5T5SxOkbJZqycHw",
  authDomain: "databaseformeia.firebaseapp.com",
  databaseURL: "https://databaseformeia-default-rtdb.firebaseio.com",
  projectId: "databaseformeia",
  storageBucket: "databaseformeia.firebasestorage.app",
  messagingSenderId: "553276720127",
  appId: "1:553276720127:web:e45b9cc87c8d7d58eb5dca",
  measurementId: "G-83MK8SJN03"
};



let chatDatabase
let chatUser
let chatStarted = false
let firebaseReady
let siteAccessApproved = false

function syncAccessGate() {
    accessGate.hidden = siteAccessApproved || !sourceSetupPanel.hidden
}

accessGate.addEventListener('click', event => event.stopPropagation())
new MutationObserver(syncAccessGate).observe(sourceSetupPanel, {
    attributes: true,
    attributeFilter: ['hidden'],
})
syncAccessGate()

function loadFirebaseCompat(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = resolve
        script.onerror = () => reject(new Error('Could not load Firebase SDK'))
        document.head.append(script)
    })
}

async function getFirebaseDatabase() {
    if (!firebaseReady) {
        firebaseReady = (async () => {
            await loadFirebaseCompat('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js')
            await loadFirebaseCompat('https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js')
            await loadFirebaseCompat('https://www.gstatic.com/firebasejs/10.12.2/firebase-database-compat.js')
        })()
    }
    await firebaseReady
    const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig)
    return firebase.database(app)
}

async function initializeSiteAccess() {
    try {
        const database = await getFirebaseDatabase()
        const auth = firebase.auth(firebase.app())
        const credential = auth.currentUser
            ? { user: auth.currentUser }
            : await auth.signInAnonymously()
        chatUser = credential.user
        accessUid.textContent = chatUser.uid

        const approvalRef = database.ref(`people/${chatUser.uid}`)
        const approvalSnapshot = await approvalRef.once('value')
        if (!approvalSnapshot.exists()) {
            await approvalRef.set(false)
        }

        approvalRef.on('value', snapshot => {
            siteAccessApproved = snapshot.val() === true
            accessStatus.textContent = siteAccessApproved
                ? 'Access approved. Welcome!'
                : 'Access is not approved yet. Ask the administrator to set people/<your UID> to true.'
            syncAccessGate()
        }, error => {
            siteAccessApproved = false
            accessStatus.textContent = `Could not check approval: ${error.message}`
            syncAccessGate()
        })
    } catch (error) {
        accessStatus.textContent = `Could not check approval: ${error.message}`
        accessUid.textContent = 'UID unavailable'
        syncAccessGate()
    }
}

async function initializeChat() {
    if (chatStarted) return
    chatStarted = true
    talkStatus.textContent = 'linking up with others...'

    try {
        chatDatabase = await getFirebaseDatabase()
        const auth = firebase.auth(firebase.app())
        chatUser = auth.currentUser || (await auth.signInAnonymously()).user

        chatDatabase.ref('talk/messages').orderByChild('createdAt').limitToLast(100)
            .on('child_added', snapshot => {
                const message = snapshot.val()
                if (!message || typeof message.text !== 'string') return
                const line = document.createElement('li')
                const name = document.createElement('strong')
                name.textContent = `${message.name || 'Guest'}: `
                const text = document.createElement('span')
                text.textContent = message.text
                line.append(name, text)
                talkMessages.append(line)
                talkMessages.scrollTop = talkMessages.scrollHeight
                talkStatus.textContent = 'Connected'
            }, error => {
                talkStatus.textContent = `STUPID ERROR HELP : ${error.message}`
            })
    } catch (error) {
        chatStarted = false
        talkStatus.textContent = `ERROR HELP HELP WHAAAT STO : ${error.message}`
    }
}

let announcementExpiryTimer
async function initializeAnnouncements() {
    const database = await getFirebaseDatabase()
    database.ref('announcements/current').on('value', snapshot => {
        const announcement = snapshot.val()
        clearTimeout(announcementExpiryTimer)

        if (!announcement || typeof announcement.text !== 'string' ||
            !Number.isFinite(announcement.expiresAt) || announcement.expiresAt <= Date.now()) {
            announcementBanner.hidden = true
            return
        }

        announcementText.textContent = announcement.text
        announcementBanner.hidden = false
        announcementExpiryTimer = setTimeout(() => {
            announcementBanner.hidden = true
        }, announcement.expiresAt - Date.now())
    }, error => {
        announceStatus.textContent = `Could not load announcements: ${error.message}`
    })
}

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

const bgMusic = new Audio(MUSIC_OPTIONS[4].url);




















const USERS = [
    {
        person: 'V',
        pass: 'x01003829',
        nickname: 'Van Vo',
    },

    {
        person: 'long',
        pass: 'loganisok',
        nickname: 'longan fruit',
    },
    {
        person: 'warren',
        pass: 'iamlazy',
        nickname: 'Hayes',
    },
    {
        person: 'ava',
        pass: 'something',
        nickname: 'Ava',
    },
    {
        person: 'amari',
        pass: 'bummiestboy',
        nickname: 'amari from omori',
    },
        {
        person: 'deronte',
        pass: 'dingusberry',
        nickname: 'Deronte',
    
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
        description: 'View my socials',
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



















// for every eight methods, make it so a thing pops up to switch pages like a ">" or "<" to go to the next page and show the other content
//slop list of games or something idk ill think about it later
const METHODS_LIST = [
    {
        title: 'WATERWORKS',
        description: 'water go civil',
        opacity: 1,
        rotation: '-3deg',
        fetcher: `${trivoURLlink}/files/water.html`,
    },
    {
        title: 'life',
        description: 'life.',
        opacity: 1,
        rotation: '-2deg',
        fetcher: `${trivoURLlink}/files/B.html`,
    }, //done
    {
        title: 'Web dasher',
        description: 'stupid larp geometry dash',
        opacity: 0.5,
        rotation: '-1deg',
        fetcher: `${trivoURLlink}/files/WD.html`,
    }, //done
    {
        title: 'Brotato',
        description: 'Game takes so long to complete so its pretty good 10/10',
        opacity: 1,
        rotation: '-5deg',
        fetcher: `${trivoURLlink}/files/BT.html`,
    }, //done
    {
        title: 'Retro bowl',
        description: 'RETROOO BOWL',
        opacity: 1,
        rotation: '-5deg',
        fetcher: `${trivoURLlink}/files/RB.html`,
    }, //done
    {
        title: 'Stardew valley',
        description: 'harvest, plant, water, sleep repeat.',
        opacity: 0.8,
        rotation: '-2deg',
        fetcher: `${trivoURLlink}/files/SV.html`,
    }, //done
    {
        title: 'majora mask',
        description: 'you met a terrible fate, havent you?',
        opacity: 0.6,
        rotation: '-3deg',
        fetcher: `${trivoURLlink}/files/MM.html`,
    }, //done
    {
        title: 'FNAF',
        description: 'fear the one who moves at night,..',
        opacity: 0.7,
        rotation: '2deg',
        fetcher: `${trivoURLlink}/files/FNA.html`,
    }, //done
     {
        title: 'TOTM',
        description: 'its the tomb. Of the mask.',
        opacity: 0.6,
        rotation: '-1deg',
        fetcher: `${trivoURLlink}/files/TOTM.html`,
    }, //done
     {
        title: 'Celeste',
        description: 'im the pragmatic side of you!!1 ',
        opacity: 0.65,
        rotation: '1deg',
        fetcher: `${trivoURLlink}/files/CSTE.html`,
    }, //done
     {
        title: 'Trees HATE you',
        description: 'I hate you',
        opacity: 0.6,
        rotation: '0deg',
        fetcher: `${trivoURLlink}/files/THY.html`,
    }, //done
    {
        title: 'Bad Piggies',
        description: 'i am bad',
        opacity: 0.6,
        rotation: '-1deg',
        fetcher: `${trivoURLlink}/files/BP.html`,
    }, //done
     {
        title: 'Lobotomy Corp',
        description: 'welcome, new manager',
        opacity: 0.5,
        rotation: '-2deg',
        fetcher: `${trivoURLlink}/files/LC.html`,
    }, //done
    {
        title: 'Mc',
        description: 'MULTIPLAYER, ENTER wss://mc.sealcentral.co',
        opacity: 0.5,
        rotation: '-2deg',
        fetcher: `${trivoURLlink}/files/mc.html`,
    }, //done
    // https://cdn.jsdelivr.net/gh/ZeldaBanana/Earglercraft-Optimized@main/EaglerCraft%201.8.8
    // woohoo hey stop checking source code you absolute bum
]































//update log update here mihahaha
const ARCHIVE_PAGES = [
    { 
        title: 'About Archived',
        paragraphs: ['This page is about me just writing down stuff that shouldnt be really so much but some may be longer than others. The page is designed so you know more about me and other projects through stories that i have created in sentences                                                                                        '],
     },
     { 
        title: 'Journey',
        paragraphs: ['This project is coming together and i love how its going, really good progress as of now. I strive to make it better and high quality that fits the starting point. I dont know how i got this far into this mock project but im glad this had happened.'],
     },
     {
        title: 'Reasoning',
        paragraphs: ['Back in sixth grade, I used to wonder why sites worked and functioned, I used to play fortnite on XBOX cloud gaming back then in Taft. I was quite trouble that never gotten to really rise and i stayed low. That stopped when i was in eigth grade. I started sharing and sharing. I realized how hard sites were to keep hidden from the public. It started small then grew to the point people started asking if i was VV or method man.'],
    },
    {
        title: 'TAFT Middle School (4-7TH GRADE)',
        paragraphs: ['These were the days how i felt what its like to start a project. AI didnt exist back then so I learned manual coding and eventually got better at it, but not good enough. I eventually learned how but CSS was too hard, to make up for my lack of creativeness in UI designing, i resorted to a last thing. These years were the best years of my life but soon to learn whats the value of everything like that.'],
    },
    {
        title: 'Summit Middle School (8TH GRADE)',
        paragraphs: ['template'],
    },
   
]







const UPDATE_LOG = [ 
    { text: 'Version 4.5, The Security and Talk update, self explainatory', color: '#a8e6cf' },
    { text: 'Version 4.4, added two games, bug fixed', color: '#d7b6ff' },
        { text: 'Version 4.3, Added five games and added page function for Methods, fixed no bugs', color: '#d7b6ff' },
    { text: 'Version 4.2, Fixed some UI stuff, Made ARCHIVED work, added three games and new fullscreen update, working on setting now. ', color: '#ffb6d9' },
    { text: 'Version 4.1, the updated Methods list to contain better ui.', color: '#a8e6cf' },
    { text: 'Version 4.0, working on settings and auto login, added some stuff, changed methods and made them change the background', color: '#ffe29a' },
    { text: 'Version 3.9, changed the themes and made some songs play on startup, working on settings and the n i do stuff i guess', color: '#a8e6cf' },
    { text: 'Version 3.8, changed it so you can use both "esc" and "shift" for exiting a page', color: '#ffb6d9' },
    { text: 'Version 3.7, fixed Themes, starting to work on methods, fixed bug where the music disc orbits around the red part, made startup panel supporting both CDNs', color: '#a8e6cf' },
    { text: 'Version 3.6, Changed keybind to exit tab from "Escape" to "Shift"', color: '#ffe29a' },
    //color loop
    { text: 'Version 3.5, added dependency check, I miss summit dude', color: '#a8e6cf' },
    { text: 'Version 3.4, accessible at school for you guys', color: '#d7b6ff' },
    { text: 'Version 3.3, added 4 songs', color: '#ffb6d9' },
    { text: 'Version 3.2 Fixed the login page', color: '#a8e6cf' },
    { text: 'Version 3.1, started on the site, made by van and only van else its another van', color: '#ffe29a' },
    
    
]


























let currentList = 'main'
let currentMusicIndex = 0
let initiated = false
let isLoggedIn = false
let isAnnounceAdmin = false
let openMethodsAfterLogin = false

bgMusic.volume = 1

body.addEventListener('click', () => {
    document.body.requestFullscreen()
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

    const pageCount = Math.ceil(list.length / METHODS_PER_PAGE)
    const visibleList = listName === 'methods'
        ? list.slice(currentMethodsPage * METHODS_PER_PAGE, (currentMethodsPage + 1) * METHODS_PER_PAGE)
        : list

    menu.innerHTML = visibleList.map((item, index) => {
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
            [{ opacity: 0 }, { opacity: visibleList[index].opacity }],
            { duration: 450, delay: index * 130, easing: 'ease-out', fill: 'both' }
        )
    })

    let pagination = menuWrapper.querySelector('.methods-pagination')
    if (!pagination) {
        pagination = document.createElement('div')
        pagination.className = 'methods-pagination'
        menuWrapper.append(pagination)
    }
    pagination.hidden = listName !== 'methods' || pageCount <= 1
    if (listName === 'methods' && pageCount > 1) {
        pagination.replaceChildren()

        const previous = document.createElement('button')
        previous.type = 'button'
        previous.textContent = '<'
        previous.setAttribute('aria-label', 'Previous methods page')
        previous.disabled = currentMethodsPage === 0
        previous.addEventListener('click', () => {
            currentMethodsPage--
            renderMenu(list, listName)
        })

        const indicator = document.createElement('span')
        indicator.textContent = `Page ${currentMethodsPage + 1} of ${pageCount}`
        indicator.setAttribute('aria-live', 'polite')

        const next = document.createElement('button')
        next.type = 'button'
        next.textContent = '>'
        next.setAttribute('aria-label', 'Next methods page')
        next.disabled = currentMethodsPage === pageCount - 1
        next.addEventListener('click', () => {
            currentMethodsPage++
            renderMenu(list, listName)
        })

        pagination.append(previous, indicator, next)
    }

    const selectedIndex = listName === 'music' ? currentMusicIndex : 0
    itemDescription.textContent = visibleList[selectedIndex]?.description || ''
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

function selectArchivePage(index) {
    const page = ARCHIVE_PAGES[index]
    if (!page) return

    archivesSidebar.querySelectorAll('.archives-tab').forEach((tab, tabIndex) => {
        if (tabIndex === index) tab.setAttribute('aria-current', 'page')
        else tab.removeAttribute('aria-current')
    })

    archivesPage.replaceChildren()
    const heading = document.createElement('h3')
    heading.textContent = page.title
    archivesPage.append(heading)
    page.paragraphs.forEach(text => {
        const paragraph = document.createElement('p')
        paragraph.textContent = text
        archivesPage.append(paragraph)
    })
}

function showArchives() {
    archivesSidebar.replaceChildren()
    ARCHIVE_PAGES.forEach((page, index) => {
        const tab = document.createElement('button')
        tab.type = 'button'
        tab.className = 'archives-tab'
        tab.textContent = page.title
        tab.addEventListener('click', () => selectArchivePage(index))
        archivesSidebar.append(tab)
    })
    selectArchivePage(0)
    menu.hidden = true
    archivesOverlay.hidden = false
    currentList = 'archives'
}

function closeArchives() {
    archivesOverlay.hidden = true
    menu.hidden = false
    renderMenu(MENU_LINKS, 'main')
}

function closeTalk() {
    talkPanel.hidden = true
    menu.hidden = false
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

    if (currentList === 'main' && title === 'Talk') {
        menu.hidden = true
        talkPanel.hidden = false
        currentList = 'talk'
        initializeChat()
        talkInput.focus()
        return
    }

    if (currentList === 'main' && title === 'Updates') {
        showUpdates()
        return
    }

    if (currentList === 'main' && title === 'Archives') {
        showArchives()
        return
    }

    if (currentList === 'methods') {
        const method = METHODS_LIST.find(item => item.title === title)
        if (!method) return

        const methodTab = window.open('', '_blank')
        if (!methodTab) {
            itemDescription.textContent = 'Allow pop-ups to open this'
            return
        }

        methodTab.document.write('<!DOCTYPE html><title>New Tab</title><p>NOT LOADING...</p>')
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
                methodTab.document.write('<!DOCTYPE html><title>error the fault lies within you</title>')
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
    document.querySelector('#talk-close').addEventListener('click', closeTalk)

    announceOpen.addEventListener('click', () => {
        announceForm.hidden = false
        announceInput.focus()
    })
    document.querySelector('#announce-cancel').addEventListener('click', () => {
        announceForm.hidden = true
        announceStatus.textContent = ''
    })
    announceForm.addEventListener('submit', async event => {
        event.preventDefault()
        if (!isAnnounceAdmin) return

        const text = announceInput.value.trim()
        if (!text) {
            announceStatus.textContent = 'Write an announcement'
            return
        }

        announceStatus.textContent = 'Publishing…'
        try {
            const database = await getFirebaseDatabase()
            await database.ref('announcements/current').set({
                text,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                expiresAt: Date.now() + 3 * 24 * 60 * 60 * 1000,
            })
            announceInput.value = ''
            announceForm.hidden = true
            announceStatus.textContent = 'Announcement published for 3 days.'
        } catch (error) {
            announceStatus.textContent = `Could not publish: ${error.message}`
        }
    })

    talkForm.addEventListener('submit', async event => {
        event.preventDefault()
        const text = talkInput.value.trim()
        if (!text) return
        if (!chatUser || !chatDatabase) {
            talkStatus.textContent = 'Chat is still connecting. Try again in a moment.'
            return
        }

        talkStatus.textContent = 'Sending…'
        try {
            await chatDatabase.ref('talk/messages').push({
                uid: chatUser.uid,
                name: `${person} - ${chatUser.uid.slice(0, 4)}`,
                text,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
            })
            talkInput.value = ''
            talkStatus.textContent = 'Connected'
        } catch (error) {
            talkStatus.textContent = `Could not send: ${error.message}`
        }
    })

    document.addEventListener('keydown', (e) => {
        if (!siteAccessApproved) return
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

        if (e.key === 'Escape' && currentList !== 'main') {
            if (currentList === 'archives') closeArchives()
            else if (currentList === 'talk') closeTalk()
            else closeUpdates()
            return
        }

        if (e.key === 'Shift' && currentList !== 'main') {
            if (currentList === 'archives') closeArchives()
            else if (currentList === 'talk') closeTalk()
            else closeUpdates()
            return
        }
        /*
        if (e.key === 'Escape' && (currentList === 'methods' || currentList === 'music')) {
            renderMenu(MENU_LINKS, 'main')
            return
        }
        ts vaulted so we dont keep this unless i need the function lol
*/


        if (currentList === 'updates' || currentList === 'archives' || currentList === 'talk') return

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
        if (!siteAccessApproved) return
        if (currentList === 'archives' || currentList === 'talk') return
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
        isAnnounceAdmin = user.person === 'V'
        announceOpen.hidden = !isAnnounceAdmin
        person = `${user.nickname}`
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
    video.loop = true
    video.src = `${videoAssetBase}/videos/bg-video-2.mp4`
    video.load()
    video.play().catch(() => {})
})
setInterval(function(){showTime();}, 1000);
insertListItens()
initMenuLinkOver()
initializeSiteAccess()
initializeAnnouncements().catch(error => {
    announceStatus.textContent = `Could not connect to announcements: ${error.message}`
})
