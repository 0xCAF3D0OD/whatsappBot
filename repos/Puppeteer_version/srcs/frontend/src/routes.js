export const Root = '/';
export const Login = '/whatsappLoginPage';


export function router() {
    return {
        currentRoute: '/',
        routes: {
            [Root]: 'HomeComponent',
            [Login]: 'QRCodeComponent',
        },
        initRouter() {
            this.currentRoute = window.location.pathname;
            window.addEventListener('popstate', () => {
                this.currentRoute = window.location.pathname;
            })
        },
        navigate(route) {
            this.currentRoute = route;
            history.pushState(null, '', route);
        }
    }
}