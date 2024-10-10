import { notifications } from '../annexe/chatBotInterface.js'
import { popUpBubble } from "../../assets/pages/popUpBubble.js";

export const Chat = () => ({
    setup() {
        const notificationsData = notifications();
        return {
            ...notificationsData,
            init() {
                this.checkNotifications();
                setInterval(() => this.checkNotifications(), 60000);
            }
        };
    },
    popUp: popUpBubble(),
    template() {
        return `
        <div x-data="Chat.setup()" x-init="init">
            <div x-data="dashboardComponent()"
                 x-init="$nextTick(() => {
                    $refs.notificationsContainer.innerHTML = document.getElementById('notifications').innerHTML;
                 })" 
                 x-html="$data.template()"></div>
            <template id="notifications">
                <div x-data="Chat.popUp" 
                     x-html="$data.template()"
                     x-bind:notification-count="notificationCount">
                </div>
            </template>
        </div>    
    `}
});
