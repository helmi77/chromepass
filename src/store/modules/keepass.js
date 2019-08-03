import kdbxweb from 'kdbxweb'

const getDefaultState = () => {
    return {
        db: {},
        file: { name: '' }, password: '',
    }
}

export default {
    namespaced: true,
    state: getDefaultState(),
    mutations: {
        selectFile (state, file) {
            state.file = file
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

            return state.file.arrayBuffer()
                .then(buffer => {
                    let credentials = new kdbxweb.Credentials(kdbxweb.ProtectedValue.fromString(state.password))
                    return kdbxweb.Kdbx.load(buffer, credentials)
                })
                .then(db => {
                    commit('setDatabase', db)
                    return Promise.resolve(db)
                })
        }
    }
}