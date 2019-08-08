import CryptoJS from 'crypto-js'

export const parseDb = (db, sessionKey) => {
    const walkGroups = (groups, callback) => {
        groups.forEach(group => {
            callback(group)
            walkGroups(group.groups, callback)
        })
    }

    let entries = {}
    const getEntries = group => {
        group.entries.forEach(entry => {
            if (entry.fields.URL !== '') {
                const key = entry.fields.URL
                if (!(key in entries))
                    entries[key] = []

                const encryptedPassword = CryptoJS.AES.encrypt(entry.fields.Password.getText(), sessionKey)
                entries[key].push({
                    title: entry.fields.Title,
                    password: encryptedPassword.toString()
                })
            }
        })
    }

    walkGroups(db.groups, getEntries)
    return new Promise(resolve => chrome.storage.local.set(entries, resolve))
}