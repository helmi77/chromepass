<template>
    <form @submit.prevent="submit" class="w-full">
        <label class="label mb-1">Database</label>
        <input id="db" type="file" @change="fileSelected" class="hidden">
        <label for="db" class="block btn btn-blue">
            <font-awesome-icon icon="upload" class="icon mr-2"></font-awesome-icon>
            <span v-show="!selectedFile.name">Choose a database</span>
            <span v-show="selectedFile.name">{{ selectedFile.name }}</span>
        </label>

        <label for="password" class="label mb-1 mt-3">Password&nbsp;<em>(optional)</em></label>
        <input type="password" id="password" placeholder="Your password" class="w-full input" v-model="password">

        <label class="label mt-3 mb-1">Key file&nbsp;<em>(optional)</em></label>
        <input id="keyfile" type="file" @change="keySelected" class="hidden">
        <label for="keyfile" class="block btn btn-blue">
            <font-awesome-icon icon="upload" class="icon mr-2"></font-awesome-icon>
            <span v-show="!selectedKey.name">Choose a key file</span>
            <span v-show="selectedKey.name">{{ selectedKey.name }}</span>
        </label>

        <button type="submit" class="mt-6 mb-3 btn btn-blue">
            <font-awesome-icon icon="unlock" class="icon mr-2"></font-awesome-icon>
            Open
        </button>
    </form>
</template>

<script>
export default {
    computed: {
        selectedFile: {
            get () { return this.$store.state.keepass.file },
            set (value) { this.$store.commit('keepass/selectFile', value) }
        },
        selectedKey: {
            get () { return this.$store.state.keepass.keyFile },
            set (value) { this.$store.commit('keepass/selectKey', value) }
        },
        password: {
            get () { return this.$store.state.keepass.password },
            set (value) { this.$store.commit('keepass/setPassword', value) }
        }
    },
    methods: {
        keySelected (event) {
            if (event.target.files.length > 0) {
                this.selectedKey = event.target.files[0]
            }
        },
        fileSelected (event) {
            if (event.target.files.length > 0) {
                this.selectedFile = event.target.files[0]
            }
        },
        submit () {
            this.$store.dispatch('keepass/loadDatabase')
                .then(() => this.$router.push({ name: 'Session Key' }))
        }
    }
}
</script>
