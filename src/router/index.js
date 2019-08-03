import Vue from 'vue'
import VueRouter from "vue-router";

import Start from '@/components/Start'
import About from '@/components/About'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        { path: '/', name: 'Start', component: Start },
        { path: '/about', name: 'About', component: About }
    ]
})