import {createRouter, createWebHistory} from "vue-router";

import homeComponent from "../2.dashboard-management/pages/home.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/home", component: homeComponent},
        { path: "/", redirect: "/home"},

    ]
})

export default router;