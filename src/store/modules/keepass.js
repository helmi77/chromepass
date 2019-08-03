import kdbxweb from 'kdbxweb'

const getDefaultState = () => {
    return {
        db: {}, file: { name: '' }, keyFile: { name: '' }, password: '',
    }
}

export default {
    namespaced: true,
    state: getDefaultState(),
    mutations: {
        selectFile (state, file) {
            state.file = file
        },
        selectKey (state, keyFile) {
            state.keyFile = keyFile
        },
        setPassword (state, password) {
            state.password = password
        },
        setDatabase (state, database) {
            state.db = database
        }
    },
    actions: {
        loadDatabase ({ commit, state }) {
            if (state.file instanceof File === false)
                return Promise.reject("No file was selected")

            var keyFilePromise = Promise.resolve(null);
            if (state.keyFile instanceof File) {
                keyFilePromise = state.keyFile.arrayBuffer()
            }

            return Promise.all([state.file.arrayBuffer(), keyFilePromise])
                .then(([dbBuffer, keyBuffer]) => {
                    let credentials = new kdbxweb.Credentials(kdbxweb.ProtectedValue.fromString(state.password), keyBuffer)
                    return kdbxweb.Kdbx.load(dbBuffer, credentials)
                })
                .then(db => {
                    commit('setDatabase', db)
                    return Promise.resolve(db)
                })
        }
    }
}