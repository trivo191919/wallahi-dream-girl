
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
const talkNotificationToggle = document.querySelector('#talk-notification-toggle')
const talkMessages = document.querySelector('#talk-messages')
const talkOnlineList = document.querySelector('#talk-online-list')
const talkOnlineCount = document.querySelector('#talk-online-count')
const talkForm = document.querySelector('#talk-form')
const talkInput = document.querySelector('#talk-input')
const updatesOverlay = document.querySelector('#updates-overlay')
const updatesLog = document.querySelector('#updates-log')
const archivesOverlay = document.querySelector('#archives-overlay')
const archivesSidebar = document.querySelector('#archives-sidebar')
const archivesPage = document.querySelector('#archives-page')
const settingsOverlay = document.querySelector('#settings-overlay')
const settingsSidebar = document.querySelector('#settings-sidebar')
const settingsOptions = document.querySelector('#settings-options')
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
const accessRetry = document.querySelector('#access-retry')
const accessSubmit = document.querySelector('#access-submit')
const accessUid = document.querySelector('#access-uid')
const accessFacts = document.querySelector('#access-facts')
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
let activeDM = null
const dmConversations = new Map()
let publicTalkLines = []
const knownMessageKeys = new Set()
let dmInboxListenerStarted = false
let firebaseReady
let siteAccessApproved = false
let talkNotificationsEnabled = true
try {
    talkNotificationsEnabled = localStorage.getItem('wave-talk-notifications-disabled') !== 'true'
} catch {}

function updateTalkNotificationToggle() {
    talkNotificationToggle.textContent = talkNotificationsEnabled
        ? 'Disable notifications'
        : 'Enable notifications'
    talkNotificationToggle.setAttribute('aria-pressed', String(!talkNotificationsEnabled))
}

updateTalkNotificationToggle()

function colorForUid(uid) {
    let hash = 0
    for (const character of uid || 'guest') {
        hash = (hash * 31 + character.charCodeAt(0)) >>> 0
    }
    return `hsl(${hash % 360} 85% 70%)`
}

async function requestTalkNotificationPermission() {
    if (!talkNotificationsEnabled || !('Notification' in window) || Notification.permission !== 'default') return
    try {
        await Notification.requestPermission()
    } catch (error) {
        console.warn('Could not request notification permission:', error)
    }
}

function notifyTalkMessage(message, key) {
    if (!talkNotificationsEnabled || !('Notification' in window) || Notification.permission !== 'granted') return

    const notification = new Notification('New Talk message', {
        body: `${message.name || 'Guest'}: ${message.text}`,
        tag: `wave-talk-${key}`,
    })
    notification.addEventListener('click', () => {
        window.focus()
        notification.close()
    })
}

function syncAccessGate() {
    accessGate.hidden = siteAccessApproved || !sourceSetupPanel.hidden
}

accessGate.addEventListener('click', event => event.stopPropagation())
new MutationObserver(syncAccessGate).observe(sourceSetupPanel, {
    attributes: true,
    attributeFilter: ['hidden'],
})
syncAccessGate()

const firebaseScriptLoads = new Map()
function loadFirebaseCompat(src) {
    if (firebaseScriptLoads.has(src)) return firebaseScriptLoads.get(src)

    const loading = new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve()
        script.onerror = () => {
            script.remove()
            firebaseScriptLoads.delete(src)
            reject(new Error('Could not load Firebase SDK'))
        }
        document.head.append(script)
    })
    firebaseScriptLoads.set(src, loading)
    return loading
}

async function getFirebaseDatabase() {
    if (!firebaseReady) {
        firebaseReady = (async () => {
            await loadFirebaseCompat('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js')
            await loadFirebaseCompat('https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js')
            await loadFirebaseCompat('https://www.gstatic.com/firebasejs/10.12.2/firebase-database-compat.js')
        })().catch(error => {
            firebaseReady = null
            throw error
        })
    }
    await firebaseReady
    const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig)
    return firebase.database(app)
}

let approvalListenerStarted = false
let uidRequestSubmitted = false
let uidRequestInProgress = false
let uidRequestRetryTimer

function scheduleUIDRequestRetry() {
    if (uidRequestRetryTimer) return
    uidRequestRetryTimer = setTimeout(() => {
        uidRequestRetryTimer = null
        initializeSiteAccess()
    }, 5000)
}

function isUIDApproved(value, uid) {
    if (value === true) return true
    if (!value || typeof value !== 'object') return false
    const approvalFlag = value.approved === true || value.accepted === true
    const uidMatches = typeof value.uid !== 'string' || value.uid === uid
    return approvalFlag && uidMatches
}

function showUIDVerification(uid, snapshot, error = '') {
    const record = snapshot?.val() ?? null
    const recordUid = record && typeof record === 'object' ? record.uid : undefined
    accessFacts.textContent = [
        `Current UID: ${uid || 'unavailable'}`,
        `Database lookup: people/${uid || '(UID unavailable)'}`,
        `Snapshot exists: ${snapshot ? snapshot.exists() : 'not checked'}`,
        `Stored record: ${JSON.stringify(record)}`,
        `Record UID field: ${recordUid === undefined ? '(not present)' : recordUid}`,
        `Stored UID field matches current UID: ${recordUid === undefined ? 'not stored' : recordUid === uid}`,
        `UID lookup: queried people/${uid || '(UID unavailable)'}`,
        `Approved by current rules: ${isUIDApproved(record, uid)}`,
        `Checked at: ${new Date().toLocaleString()}`,
        `Verification error: ${error || 'none'}`,
    ].join('\n')
}

let approvalCheckInProgress = false
async function verifySiteAccess() {
    if (!chatUser || siteAccessApproved || approvalCheckInProgress) return
    approvalCheckInProgress = true
    try {
        const database = await getFirebaseDatabase()
        const snapshot = await database.ref(`people/${chatUser.uid}`).once('value')
        const approval = snapshot.val()
        siteAccessApproved = isUIDApproved(approval, chatUser.uid)
        showUIDVerification(chatUser.uid, snapshot)
        accessStatus.textContent = siteAccessApproved
            ? 'Access approved'
            : 'Access is not approved yet; checking again in 5 seconds.'
        accessRetry.hidden = true
        syncAccessGate()
    } catch (error) {
        showUIDVerification(chatUser.uid, null, error.message)
        accessStatus.textContent = `Could not check approval: ${error.message}. Retrying in 5 seconds.`
        accessRetry.hidden = false
        scheduleUIDRequestRetry()
    } finally {
        approvalCheckInProgress = false
    }
}


async function submitUIDRequest() {
    if (!chatUser || uidRequestSubmitted || uidRequestInProgress) return

    uidRequestInProgress = true
    accessSubmit.disabled = true
    accessSubmit.hidden = false
    accessStatus.textContent = 'Submitting your UID for approval…'
    try {
        const database = await getFirebaseDatabase()
        await database.ref(`approvalRequests/${chatUser.uid}`).set({
            uid: chatUser.uid,
            requestedAt: firebase.database.ServerValue.TIMESTAMP,
        })
        uidRequestSubmitted = true
        clearTimeout(uidRequestRetryTimer)
        uidRequestRetryTimer = null
        accessSubmit.hidden = true
        accessStatus.textContent = 'UID submitted. Waiting for approval.'
        } catch (error) {
        let fallbackMessage = ''
        try {
            // The rules allow users to create their own people/{uid} node as false.
            // This records the UID even when approvalRequests cannot be written.
            const fallbackDatabase = await getFirebaseDatabase()
            await fallbackDatabase.ref(`people/${chatUser.uid}`).set(false)
            fallbackMessage = ' UID registered as pending, but the approval request was not saved.'
        } catch (fallbackError) {
            fallbackMessage = ` UID fallback also failed: ${fallbackError.message}.`
        }
                accessStatus.textContent = `Could not submit UID: ${error.message}.${fallbackMessage} Retrying in 5 seconds.`

        scheduleUIDRequestRetry()
    } finally {
        uidRequestInProgress = false
        accessSubmit.disabled = false
    }
}

async function initializeSiteAccess() {
    accessRetry.hidden = true
    accessSubmit.hidden = true
    if (!uidRequestSubmitted) accessStatus.textContent = 'Checking your approval…'

    try {
        const database = await getFirebaseDatabase()
        const auth = firebase.auth(firebase.app())
        const credential = auth.currentUser
            ? { user: auth.currentUser }
            : await auth.signInAnonymously()
        chatUser = credential.user
        accessUid.textContent = chatUser.uid
        if (!uidRequestSubmitted) accessSubmit.hidden = false

        const approvalRef = database.ref(`people/${chatUser.uid}`)
        if (!approvalListenerStarted) {
            approvalListenerStarted = true
                        approvalRef.on('value', snapshot => {
                const approval = snapshot.val()
                siteAccessApproved = isUIDApproved(approval, chatUser.uid)
                showUIDVerification(chatUser.uid, snapshot)
                if (siteAccessApproved) {
                    accessStatus.textContent = 'Access approved'
                } else if (!uidRequestInProgress && !uidRequestSubmitted) {
                    accessStatus.textContent = 'Access is not approved yet; checking again in 5 seconds.'
                }
                accessRetry.hidden = true
                syncAccessGate()
            }, error => {
                approvalListenerStarted = false
                siteAccessApproved = false
                showUIDVerification(chatUser.uid, null, error.message)
                accessStatus.textContent = `Could not check approval: ${error.message}`
                accessRetry.hidden = false
                scheduleUIDRequestRetry()
                syncAccessGate()
            })

        }

        await submitUIDRequest()
    } catch (error) {
                accessStatus.textContent = `Could not connect or submit UID: ${error.message}. Retrying in 5 seconds.`
        accessUid.textContent = chatUser?.uid || 'UID unavailable'
        showUIDVerification(chatUser?.uid, null, error.message)

        accessRetry.hidden = false
        scheduleUIDRequestRetry()
        syncAccessGate()
    }
}

accessRetry.addEventListener('click', initializeSiteAccess)
accessSubmit.addEventListener('click', submitUIDRequest)

function makeTalkLine(message, own = false) {
    const line = document.createElement('li')
    const name = document.createElement('strong')
    name.textContent = `${own ? 'You' : message.name || 'Guest'} `
    const uidLabel = document.createElement('span')
    uidLabel.className = 'talk-online-uid'
    uidLabel.textContent = message.uid ? `[${message.uid.slice(0, 8)}] ` : ''
    if (message.uid) uidLabel.style.color = colorForUid(message.uid)
    const text = document.createElement('span')
    text.textContent = message.text
    line.append(name, uidLabel, text)
    return line
}

function showTalkConversation(user = null) {
    activeDM = user
    const isDM = Boolean(user)
    document.querySelector('#talk-public-channel').setAttribute('aria-current', String(!isDM))
    document.querySelector('#talk-title').textContent = isDM ? `@ ${user.name}` : '# Public chat'
    talkInput.placeholder = isDM ? `Message @${user.name}` : 'Message # public-chat'
    talkMessages.replaceChildren()

    if (isDM) {
        const history = dmConversations.get(user.uid) || []
        history.forEach(message => talkMessages.append(makeTalkLine(message, message.own)))
    } else {
        talkMessages.replaceChildren(...publicTalkLines)
    }
    talkMessages.scrollTop = talkMessages.scrollHeight

    document.querySelectorAll('.talk-online-user').forEach(button => {
        button.setAttribute('aria-current', String(button.dataset.uid === user?.uid))
    })
    talkInput.focus()
}

function storeDMMessage(uid, message) {
    const conversation = dmConversations.get(uid) || []
    conversation.push(message)
    dmConversations.set(uid, conversation)
    if (activeDM?.uid === uid) {
        talkMessages.append(makeTalkLine(message, message.own))
        talkMessages.scrollTop = talkMessages.scrollHeight
    }
}

async function initializeChat() {
    if (chatStarted) return
    chatStarted = true
    talkStatus.textContent = 'Connecting to chat…'

    try {
        chatDatabase = await getFirebaseDatabase()
        const auth = firebase.auth(firebase.app())
        chatUser = auth.currentUser || (await auth.signInAnonymously()).user
        if (!dmInboxListenerStarted) {
            dmInboxListenerStarted = true
            chatDatabase.ref(`talk/dms/${chatUser.uid}`).on('child_added', snapshot => {
                const message = snapshot.val()
                const senderUid = typeof message?.uid === 'string' ? message.uid : ''
                if (senderUid && senderUid !== chatUser.uid && typeof message.text === 'string') {
                    storeDMMessage(senderUid, {
                        uid: senderUid,
                        name: message.name || 'Guest',
                        text: message.text,
                        own: false,
                    })
                }
                snapshot.ref.remove().catch(error => console.warn('Could not remove delivered DM:', error))
            }, error => {
                talkStatus.textContent = `Could not load DMs: ${error.message}`
                dmInboxListenerStarted = false
            })
        }
        const messagesRef = chatDatabase.ref('talk/messages')
        const messagesQuery = messagesRef.orderByChild('createdAt').limitToLast(100)
        knownMessageKeys.clear()
        const initialMessages = await messagesQuery.once('value')

        function createTalkMessageLine(snapshot) {
            const message = snapshot.val()
            if (!message || typeof message.text !== 'string') return null
            const uid = typeof message.uid === 'string' ? message.uid : ''
            const line = makeTalkLine({ ...message, uid })
            return { line, message, uid }
        }

        publicTalkLines = []
        initialMessages.forEach(snapshot => {
            knownMessageKeys.add(snapshot.key)
            const rendered = createTalkMessageLine(snapshot)
            if (rendered) publicTalkLines.push(rendered.line)
        })
        if (!activeDM) talkMessages.replaceChildren(...publicTalkLines)
        talkMessages.scrollTop = talkMessages.scrollHeight

        chatDatabase.ref('talk/presence').on('value', snapshot => {
            const users = []
            snapshot.forEach(userSnapshot => {
                const user = userSnapshot.val()
                if (user) users.push({ uid: userSnapshot.key, name: user.name || 'Guest' })
            })
            talkOnlineCount.textContent = users.length
            talkOnlineList.replaceChildren(...users.map(user => {
                const entry = document.createElement('li')
                const button = document.createElement('button')
                button.type = 'button'
                button.className = 'talk-online-user'
                button.dataset.uid = user.uid
                button.setAttribute('aria-current', String(activeDM?.uid === user.uid))
                button.title = 'Click to send a direct message'
                const dot = document.createElement('span')
                dot.className = 'talk-online-dot'
                const name = document.createElement('span')
                name.className = 'talk-online-name'
                name.textContent = user.name
                const uid = document.createElement('span')
                uid.className = 'talk-online-uid'
                uid.textContent = user.uid.slice(0, 8)
                uid.style.color = colorForUid(user.uid)
                button.append(dot, name, uid)
                button.addEventListener('click', () => {
                    if (user.uid === chatUser.uid) {
                        talkStatus.textContent = 'Choose another online user to start a DM.'
                        return
                    }
                    showTalkConversation(user)
                })
                entry.append(button)
                return entry
            }))
        }, error => {
            talkStatus.textContent = `Could not load online users: ${error.message}`
        })

        const connectedRef = chatDatabase.ref('.info/connected')
        connectedRef.on('value', snapshot => {
            if (snapshot.val() !== true) return
            const presenceRef = chatDatabase.ref(`talk/presence/${chatUser.uid}`)
            presenceRef.onDisconnect().remove()
            presenceRef.set({
                name: person,
                connectedAt: firebase.database.ServerValue.TIMESTAMP,
            })
        })

        messagesQuery.on('child_added', snapshot => {
                if (knownMessageKeys.has(snapshot.key)) return
                knownMessageKeys.add(snapshot.key)

                const rendered = createTalkMessageLine(snapshot)
                if (!rendered) return
                publicTalkLines.push(rendered.line)
                if (!activeDM) {
                    talkMessages.append(rendered.line)
                    talkMessages.scrollTop = talkMessages.scrollHeight
                }
                talkStatus.textContent = 'Connected'

                if (rendered.uid && rendered.uid !== chatUser.uid) {
                    notifyTalkMessage(rendered.message, snapshot.key)
                }
            }, error => {
                talkStatus.textContent = `Could not load messages: ${error.message}`
            })
    } catch (error) {
        chatStarted = false
        talkStatus.textContent = `Could not connect to chat: ${error.message}`
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
        title: 'Paper Bouquet INSTRUMENTAL',
        description: 'Every piece we made is my treasure.',
        url: `${trivoURLlink}/paperbouquet.mp3`,
    },
    {
        title: 'In ***** We live, Lament.',
        description: 'Lament, if you wanted me to live!',
        url: `${trivoURLlink}/lament.mp3`,
    },
]

const bgMusic = new Audio(MUSIC_OPTIONS[4].url)

const DEFAULT_SETTINGS = {
    rememberLogin: true,
    backgroundMusic: true,
    accentColor: '#68fcfe',
    videoOpacity: 93,
    largeMenu: false,
    highContrast: false,
    reducedMotion: false,
}

let settings = { ...DEFAULT_SETTINGS }
try {
    settings = { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem('wave-settings') || '{}') }
} catch {}

const SETTING_CATEGORIES = [
    {
        title: 'Main',
        settings: [
            { key: 'rememberLogin', label: 'Remember login', description: 'dont need to sign in again', type: 'checkbox' },
            { key: 'backgroundMusic', label: 'Background music', description: 'music!!', type: 'checkbox' },
        ],
    },
    {
        title: 'Looks',
        settings: [
            { key: 'accentColor', label: 'Menu accent', description: 'color for buttons yo', type: 'select', options: [['#68fcfe', 'Wave'], ['#ffb6d9', 'Pink'], ['#5390A6', 'Mint'], ['#F2DF33', 'Gold']] },
            { key: 'videoOpacity', label: 'Background brightness', description: 'make background transparent idk', type: 'range', min: 35, max: 100, suffix: '%' },
        ],
    },
    {
        title: 'Accessibility',
        settings: [
            { key: 'largeMenu', label: 'Larger menu text', description: 'makes main menu bigger', type: 'checkbox' },
            { key: 'highContrast', label: 'High contrast menu', description: 'dark outline text woohoo', type: 'checkbox' },
            { key: 'reducedMotion', label: 'Reduce motion', description: 'reduces animation, good for battery i guess', type: 'checkbox' },
        ],
    },
]

function saveSettings() {
    try {
        localStorage.setItem('wave-settings', JSON.stringify(settings))
        if (!settings.rememberLogin) localStorage.removeItem('wave-saved-user')
    } catch {}
}

function applySettings() {
    document.body.style.setProperty('--wave-accent', settings.accentColor)
    document.body.classList.toggle('settings-large-menu', settings.largeMenu)
    document.body.classList.toggle('settings-high-contrast', settings.highContrast)
    document.body.classList.toggle('settings-reduced-motion', settings.reducedMotion)
    video.style.opacity = String(settings.videoOpacity / 100)
    bgMusic.muted = !settings.backgroundMusic
}

applySettings()

const USERS = [
    {
        person: 'V',
        pass: 'x01003829',
        nickname: 'Green Apple🌙🗝️',
    },

    {
        person: 'long',
        pass: 'loganisok',
        nickname: 'Logan ⚘',
    },
    {
        person: 'warren',
        pass: 'boomer',
        nickname: 'OU boy',
    },
    {
        person: 'ava',
        pass: 'something',
        nickname: 'Ava ⚘',
    },
    {
        person: 'kevin',
        pass: 'klevprime',
        nickname: 'kevin prime',
    },
        {
        person: 'deronte',
        pass: 'sharkboy1',
        nickname: 'Deronte OSU',
    
    },
    {
        person: 'tavi',
        pass:   '2axles',
        nickname: 'car wizard',
    
    },
    {
        person: 'grant',
        pass:   'granted',
        nickname: 'grant the ant',
    
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
        description: 'alter ur stuff',
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
        title: 'Rules',
        description: 'rules cuz we dont know how to act bro',
        opacity: 0.8,
        rotation: '-5deg',
    },

    {
        title: 'Updates',
        description: 'View recent updates',
        opacity: 0.6,
        rotation: '-10deg',
    },
]       //almost done with all three tabs



















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
    },
    {
        title: 'Pac-Man',
        description: 'beyond evil ghosts attack yellow hungry boy',
        opacity: 0.5,
        rotation: '-2deg',
        fetcher: `${trivoURLlink}/files/Pm.html`,
    },
    {
        title: 'Super Star Car',
        description: 'ram into stuff and like win race or something',
        opacity: 0.5,
        rotation: '3deg',
        fetcher: `${trivoURLlink}/files/SSC.html`,
    },
    //done
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
    { text: 'Version 4.8, reworked Talk UI with a public UI, added dms, made local option for debugging, settings made, ', color: '#a8e6cf' },
    { text: 'Version 4.7, fixed a fatal bug ', color: '#a8e6cf' },
    { text: 'Version 4.6, Talk refined, reforemd the theme channel, added like 2 more people cuz yes.', color: '#a8e6cf' },
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
    setTimeout(() => bgMusic.currentTime=0.5,bgMusic.play(), 500)
    
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
        const angle = visibleList.length > 1 ? 135 + (90 * index / (visibleList.length - 1)) : 180
        const musicPosition = listName === 'music'
            ? `--music-x: ${76 + 39 * Math.cos(angle * Math.PI / 180)}%; --music-y: ${50 + 43 * Math.sin(angle * Math.PI / 180)}%;`
            : ''
        return `
        <li style="${rotation} ${musicPosition} opacity: ${item.opacity};"
            class="${isSelected ? 'selected' : ''}"
            data-description="${item.description}">${item.title}</li>
    `
    }).join('')
    menu.querySelectorAll('li').forEach((item, index) => {
        if (!settings.reducedMotion) {
            item.animate(
                [{ opacity: 0 }, { opacity: visibleList[index].opacity }],
                { duration: 450, delay: index * 130, easing: 'ease-out', fill: 'both' }
            )
        }
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

let currentSettingsCategory = 0
function showSettingsCategory(index) {
    currentSettingsCategory = index
    const category = SETTING_CATEGORIES[index]
    settingsSidebar.replaceChildren(...SETTING_CATEGORIES.map((item, itemIndex) => {
        const button = document.createElement('button')
        button.type = 'button'
        button.className = 'settings-category'
        button.textContent = item.title
        if (itemIndex === index) button.setAttribute('aria-current', 'page')
        button.addEventListener('click', () => showSettingsCategory(itemIndex))
        return button
    }))

    settingsOptions.replaceChildren()
    const heading = document.createElement('h3')
    heading.textContent = category.title
    settingsOptions.append(heading)

    category.settings.forEach(setting => {
        const row = document.createElement('div')
        row.className = 'settings-row'
        const copy = document.createElement('div')
        const label = document.createElement('strong')
        label.textContent = setting.label
        const description = document.createElement('p')
        description.textContent = setting.description
        copy.append(label, description)

        let control
        if (setting.type === 'checkbox') {
            control = document.createElement('input')
            control.type = 'checkbox'
            control.checked = Boolean(settings[setting.key])
        } else if (setting.type === 'select') {
            control = document.createElement('select')
            setting.options.forEach(([value, text]) => {
                const option = document.createElement('option')
                option.value = value
                option.textContent = text
                control.append(option)
            })
            control.value = settings[setting.key]
        } else {
            control = document.createElement('input')
            control.type = 'range'
            control.min = setting.min
            control.max = setting.max
            control.value = settings[setting.key]
            const valueLabel = document.createElement('span')
            valueLabel.className = 'settings-value'
            valueLabel.textContent = `${control.value}${setting.suffix || ''}`
            control.addEventListener('input', () => {
                valueLabel.textContent = `${control.value}${setting.suffix || ''}`
            })
            row.append(copy, control, valueLabel)
        }

        control.setAttribute('aria-label', setting.label)
        if (setting.type !== 'range') row.append(copy, control)
        const update = () => {
            settings[setting.key] = setting.type === 'checkbox'
                ? control.checked
                : setting.type === 'range' ? Number(control.value) : control.value
            saveSettings()
            applySettings()
        }
        control.addEventListener(setting.type === 'range' ? 'input' : 'change', update)
        settingsOptions.append(row)
    })
}

function openSettings() {
    menu.hidden = true
    settingsOverlay.hidden = false
    currentList = 'settings'
    showSettingsCategory(currentSettingsCategory)
}

function closeSettings() {
    settingsOverlay.hidden = true
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

    if (currentList === 'main' && title === 'Settings') {
        openSettings()
        return
    }

    if (currentList === 'main' && title === 'Talk') {
        requestTalkNotificationPermission()
        menu.hidden = true
        talkPanel.hidden = false
        currentList = 'talk'
        showTalkConversation()
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

function finishLogin(user, showStatus = true) {
    isLoggedIn = true
    isAnnounceAdmin = user.person === 'V'
    announceOpen.hidden = !isAnnounceAdmin
    person = user.nickname
    if (settings.rememberLogin) {
        try { localStorage.setItem('wave-saved-user', user.person) } catch {}
    } else {
        try { localStorage.removeItem('wave-saved-user') } catch {}
    }
    if (chatDatabase && chatUser) {
        chatDatabase.ref(`talk/presence/${chatUser.uid}`).update({ name: person }).catch(() => {})
    }
    access.textContent = 'Rank: 9'
    userLabel.textContent = `NAME: ${user.nickname}`
    loginMessage.textContent = showStatus ? `get, ${user.nickname}` : ''
    loginPanel.hidden = true
    if (showStatus && openMethodsAfterLogin) {
        openMethodsAfterLogin = false
        renderMenu(METHODS_LIST, 'methods')
    }
}

function restoreSavedLogin() {
    let savedPerson = ''
    try { savedPerson = localStorage.getItem('wave-saved-user') || '' } catch {}
    if (!settings.rememberLogin) {
        try { localStorage.removeItem('wave-saved-user') } catch {}
        return
    }
    if (!savedPerson) return
    const user = USERS.find(account => account.person === savedPerson)
    if (user) finishLogin(user, false)
    else {
        try { localStorage.removeItem('wave-saved-user') } catch {}
    }
}

function initMenuLinkOver() {
    document.querySelector('#settings-close').addEventListener('click', closeSettings)
    document.querySelector('#talk-close').addEventListener('click', closeTalk)
    document.querySelector('#talk-public-channel').addEventListener('click', () => showTalkConversation())
    talkNotificationToggle.addEventListener('click', () => {
        talkNotificationsEnabled = !talkNotificationsEnabled
        try {
            localStorage.setItem('wave-talk-notifications-disabled', String(!talkNotificationsEnabled))
        } catch {}
        updateTalkNotificationToggle()
        if (talkNotificationsEnabled) requestTalkNotificationPermission()
    })

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
            if (activeDM) {
                const recipient = activeDM
                await chatDatabase.ref(`talk/dms/${recipient.uid}`).push({
                    uid: chatUser.uid,
                    name: person,
                    text,
                    createdAt: firebase.database.ServerValue.TIMESTAMP,
                })
                storeDMMessage(recipient.uid, {
                    uid: chatUser.uid,
                    name: person,
                    text,
                    own: true,
                })
            } else {
                await chatDatabase.ref('talk/messages').push({
                    uid: chatUser.uid,
                    name: person,
                    text,
                    createdAt: firebase.database.ServerValue.TIMESTAMP,
                })
            }
            talkInput.value = ''
            talkMessages.scrollTop = talkMessages.scrollHeight
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
            else if (currentList === 'settings') closeSettings()
            else if (currentList === 'updates' || currentList === 'closing-updates') closeUpdates()
            else {
                renderMenu(MENU_LINKS, 'main')
                currentList = 'main'
            }
            return
        }
        /*
        if (e.key === 'Escape' && (currentList === 'methods' || currentList === 'music')) {
            renderMenu(MENU_LINKS, 'main')
            return
        }
        ts vaulted so we dont keep this unless i need the function lol
*/


        if (currentList === 'updates' || currentList === 'archives' || currentList === 'talk' || currentList === 'settings') return

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
        if (currentList === 'archives' || currentList === 'talk' || currentList === 'updates' || currentList === 'settings') return
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
        
        finishLogin(user)
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
const siteClock = document.querySelector('#site-clock')
const batteryLabel = document.querySelector('#battery-label')
const batteryBar = document.querySelector('.battery-bar')
const batteryFill = document.querySelector('#battery-fill')

function updateClock() {
    siteClock.textContent = new Date().toLocaleTimeString()
}

updateClock()
setInterval(updateClock, 1000)

if (navigator.getBattery) {
    navigator.getBattery().then(battery => {
        function updateBattery() {
            const level = Math.round(battery.level * 100)
            batteryLabel.textContent = `Battery: ${level}%${battery.charging ? ' (charging)' : ''}`
            batteryFill.style.width = `${level}%`
            batteryBar.setAttribute('aria-valuenow', level)
        }

        updateBattery()
        battery.addEventListener('levelchange', updateBattery)
        battery.addEventListener('chargingchange', updateBattery)
    }).catch(() => {
        batteryLabel.textContent = 'Battery: unavailable'
    })
} else {
    batteryLabel.textContent = 'Battery: unavailable'
}

insertListItens()
initMenuLinkOver()
restoreSavedLogin()
initializeSiteAccess()
setInterval(verifySiteAccess, 5000)
initializeAnnouncements().catch(error => {

    announceStatus.textContent = `${error.message}`
})
