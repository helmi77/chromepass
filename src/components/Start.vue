<template>
    <form @submit.prevent="submit" class="w-full">
        <label class="label">Database</label>
        <input id="db" type="file" @change="fileSelected" class="hidden">
        <label for="db" class="block btn btn-blue">
            <font-awesome-icon icon="upload" class="icon mr-2"></font-awesome-icon>
            <span v-show="!selectedFile.name">Choose a database</span>
            <span v-show="selectedFile.name">{{ selectedFile.name }}</span>
        </label>

        <label for="password" class="label mt-3">Password</label>
        <input type="password" id="password" placeholder="Your password" class="w-full input" v-model="password">
        <button type="submit" class="mt-6 btn btn-blue">
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
        password: {
            get () { return this.$store.state.keepass.password },
            set (value) { this.$store.commit('keepass/setPassword', value) }
        }
    },
    methods: {
        fileSelected (event) {
            if (event.target.files.length > 0) {
                this.selectedFile = event.target.files[0]
            }
        },
        submit () {
            this.$store.dispatch('keepass/loadDatabase')
                .then(db => {
                    db.groups.forEach(group => {
                        console.log("Group", group.name)
                        group.entries.forEach(entry => {
                            console.log("Entry", entry.fields.Title)
                            console.log(entry.fields.Password.getText())
                        })
                    });
                })
        }
    }
}
</script>
