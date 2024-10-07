import { notifications } from '../annexe/chatBotInterface.js'

export const chatBotInterface = () => ({
    setup() {
        return {
            ...notifications(),
            init() {
                this.checkNotifications()
            }
        }
    },
    template(){`
        <div x-data="chatBotInterface.setup()"
             x-init="init"
             className="container">
            <div x-show="" id="notification-container">
                <span id="notification-status">Aucune nouvelle notification</span>
                <span id="notification-badge" className="notification-badge"></span>
            </div>
        </div>        
    `}
})
