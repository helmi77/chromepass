const parentContextId = "parent"

const chromepassMenuItem = chrome.contextMenus.create({
    id: parentContextId,
    title: "ChromePass",
    contexts: ["editable"],
    onclick: function (info, tab) {
    }
});

chrome.webNavigation.onCompleted.addListener(function (details) {
    if (details.frameId !== 0) // Navigation did not happen in tab content window
        return

    const key = details.url
    chrome.storage.local.get([key], result => {
        if (!(key in result))
            return

        result[key].forEach(entry => {
            chrome.contextMenus.create({
                title: entry.title,
                contexts: ["editable"],
                parentId: parentContextId,
                onclick: (info, tab) => {
                    chrome.tabs.sendMessage(details.tabId, {
                        type: 'fill',
                        password: entry.password
                    })
                }
            })
        })
    })

    /*
    let key = 'https://keepass.info/'
    chrome.storage.local.get([key], result => {
        console.log("Retrieved from storage")
        console.log(result[key])
        console.log("Decrypted", CryptoJS.AES.decrypt(result[key], "secret").toString(CryptoJS.enc.Utf8))
    })
    */
});