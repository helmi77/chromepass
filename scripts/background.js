const parentContextId = "parent"
const contextMenuIds = []

const chromepassMenuItem = chrome.contextMenus.create({
    id: parentContextId,
    title: "ChromePass",
    contexts: ["editable"],
    onclick: function (info, tab) {
    }
});

const removeContextMenu = () => {
    while (contextMenuIds.length > 0) {
        chrome.contextMenus.remove(contextMenuIds.pop())
    }
}

const buildContextMenu = (tabId, url) => {
    const key = url
    chrome.storage.local.get([key], result => {
        if (!(key in result))
            return

        result[key].forEach(entry => {
            contextMenuIds.push(chrome.contextMenus.create({
                title: entry.title,
                contexts: ["editable"],
                parentId: parentContextId,
                onclick: (info, tab) => {
                    chrome.tabs.sendMessage(tabId, {
                        type: 'fill',
                        password: entry.password
                    })
                }
            }))
        })
    })
}

chrome.webNavigation.onCompleted.addListener(function (details) {
    if (details.frameId !== 0) // Navigation did not happen in tab content window
        return

    removeContextMenu()
    buildContextMenu(details.tabId, details.url)

    //console.log("Decrypted", CryptoJS.AES.decrypt("UVAWDw=", "session key").toString(CryptoJS.enc.Utf8))
});

chrome.tabs.onActivated.addListener(activeInfo => {
    removeContextMenu()
    chrome.tabs.get(activeInfo.tabId, tab => {
        if (tab.url) {
            buildContextMenu(tab.id, tab.url)
        }
    })
})