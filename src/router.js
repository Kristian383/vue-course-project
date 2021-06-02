import { createRouter, createWebHistory } from "vue-router";

import CoachDetail from "./pages/coaches/CoachesDetails.vue"
import CoachesList from "./pages/coaches/CoachesList.vue"
import CoachRegistration from "./pages/coaches/CoachRegistration.vue"
import ContactCoach from "./pages/requests/ContactCoach.vue"
import RequestReceived from "./pages/requests/RequestReceived.vue"
import NotFound from "./pages/NotFound.vue"
import UserAuth from "./pages/auth/UserAuth.vue"
import store from "./store/index";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", redirect: "/coaches" },
        { path: "/coaches", component: CoachesList },
        {
            path: "/coaches/:id", props: true,
            component: CoachDetail, children: [
                { path: "contact", component: ContactCoach },
            ]
        },
        { path: "/register", component: CoachRegistration, meta: { requiresAuth: true } },
        { path: "/requests", component: RequestReceived, meta: { requiresAuth: true } },
        { path: "/auth", component: UserAuth, meta: { requiresUnauth: true } },
        { path: "/:notFound(.*)", component: NotFound },

    ]
});

router.beforeEach(function (to, _, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next("/auth");
    }else if(to.meta.requiresUnauth && store.getters.isAuthenticated)
    {
        next("/coaches")
    }else{
        next()
    }
})

export default router