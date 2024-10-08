import { notifications } from '../annexe/chatBotInterface.js'

export const Chat = () => ({
    setup() {
        return {
            ...notifications(),
            hasNotification: false,
            init() {
            }
        };
    },
    template() {
        return `
        <div x-data="Chat.setup()" x-init="init">
            <div x-data="dashboardComponent()" x-html="$data.template()">
            </div>
        </div>    
    `}
})
