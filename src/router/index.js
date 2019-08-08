import Vue from 'vue'
import VueRouter from "vue-router";

import Start from '@/components/Start'
import SessionKey from '@/components/SessionKey'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        { path: '/', name: 'Start', component: Start },
        { path: '/key', name: 'Session Key', component: SessionKey },
    ]
})