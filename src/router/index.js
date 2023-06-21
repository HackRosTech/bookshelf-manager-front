import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import SectionView from "@/views/SectionView.vue";
import SectionShowView from "@/views/SectionShowView";
import SectionEditView from "@/views/SectionEditView";
import SectionCreate from "@/views/SectionCreate";
import AuthorView from "@/views/AuthorView";
import AuthorCreate from "@/views/AuthorCreate";
import AuthorShowView from "@/views/AuthorShowView";
import AuthorEditView from "@/views/AuthorEditView";
import BookCreate from "@/views/BookCreate";
import BookShowView from "@/views/BookShowView";
import BookEditView from "@/views/BookEditView";
import isAdmin from '@/middleware/IsAdmin';
import store from '@/store'
import {actionTypes as actionTypesAuth} from "@/store/modules/auth";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/book/create',
        name: 'bookCreate',
        component: BookCreate
    },
    {
        path: '/book/:id/show',
        name: 'bookShow',
        component: BookShowView
    },
    {
        path: '/book/edit/:id',
        name: 'bookEdit',
        component: BookEditView
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/section',
        name: 'section',
        component: SectionView,
        meta: {
            middleware: isAdmin,
        },
    },
    {
        path: '/section/show/:id',
        name: 'sectionShow',
        component: SectionShowView
    },
    {
        path: '/section/create',
        name: 'sectionCreate',
        component: SectionCreate
    },
    {
        path: '/section/edit/:id',
        name: 'sectionEdit',
        component: SectionEditView
    },
    {
        path: '/author',
        name: 'author',
        component: AuthorView
    },
    {
        path: '/author/show/:id',
        name: 'authorShow',
        component: AuthorShowView
    },
    {
        path: '/author/create',
        name: 'authorCreate',
        component: AuthorCreate
    },
    {
        path: '/author/edit/:id',
        name: 'authorEdit',
        component: AuthorEditView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    if (!subsequentMiddleware) return context.next;

    return (...parameters) => {
        context.next(...parameters);
        const nextMiddleware = nextFactory(context, middleware, index + 1);
        subsequentMiddleware({ ...context, next: nextMiddleware });
    };
}

router.beforeEach(async (to, from, next) => {
    if (!store.getters.getUserRole) {
        await store.dispatch(actionTypesAuth.getCurrentUser);
    }
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware)
            ? to.meta.middleware
            : [to.meta.middleware];

        const context = {
            from,
            next,
            router,
            to,
        };
        const nextMiddleware = nextFactory(context, middleware, 1);

        return middleware[0]({...context, next: nextMiddleware});
    }

    return next();
});


export default router
