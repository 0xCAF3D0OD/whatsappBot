export const Backend = 'http://localhost:3000';
export const Frontend = 'http://localhost:8080';
export const Root = '/';
export const Login = '/whatsappLoginPage';
export const Session = '/whatsappLoginPage/whatsappSession';


export function router() {
    return {
        currentRoute: '/',
        routes: {
            [Root]: 'HomeComponent',
            [Login]: 'QRCodeComponent',
            [Session]: 'WhatsappPageComponent',
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
