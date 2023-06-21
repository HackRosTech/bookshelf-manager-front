import store from "@/store";

export default async function myMiddleware({next, router}) {

    if (!store.getters.getUserRole.is_admin) {
        return router.push({ name: 'home' });
    }

    console.log('test',store.getters.getUserRole)

    next()
}
