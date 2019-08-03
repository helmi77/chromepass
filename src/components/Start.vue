<template>
    <form @submit.prevent="submit">
        <input type="file" @change="fileSelected">
    </form>
</template>

<script>
import kdbxweb from 'kdbxweb'

export default {
    data() {
        return {
            file: {},
        }
    },
    methods: {
        fileSelected (event) {
            event.target.files[0].arrayBuffer()
                .then(buffer => {
                    let credentials = new kdbxweb.Credentials(kdbxweb.ProtectedValue.fromString('ein haus bauen'))
                    kdbxweb.Kdbx.load(buffer, credentials)
                        .then(db => console.log(db))
                })
        },
        submit () {
            console.log(this.file)
        }
    }
}
</script>
