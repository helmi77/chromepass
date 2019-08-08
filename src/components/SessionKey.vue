<template>
    <form @submit.prevent="submit">
        <label class="label mb-1">Session key</label>
        <input id="session-key" type="password" class="w-full input" v-model="sessionKey">
        <button type="submit" class="mt-6 mb-3 btn btn-blue">
            <font-awesome-icon icon="key" class="icon mr-2"></font-awesome-icon>
            Encrypt
        </button>
    </form>
</template>

<script>
import { parseDb } from '@/utils/keepass'

export default {
    data () {
        return {
            sessionKey: '',
        }
    },
    methods: {
        submit () {
            parseDb(this.$store.state.keepass.db, this.sessionKey)
                .then(() => window.close())
        }
    }
}
</script>
