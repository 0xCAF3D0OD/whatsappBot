import {Backend, Session} from "../../src/routes.js";

export const notificationScript = () => ({
    notificationCount: 0,
    hasNotification: false,
    checkInterval: null,

    async startNotificationCheck() {
        await this.checkNotifications();
        this.checkInterval = setInterval(() => this.checkNotifications(), 30000);
    },

    async checkNotifications() {
        try {
            const response = await fetch(`${Backend}${Session}/check-notifications`);
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            if (data.notificationCount) {
                console.log('has notification count!');
                this.notificationCount = data.notificationCount;
                this.hasNotification = this.notificationCount > 0;
            }
        } catch (error) {
            console.error("Erreur lors de la vérification des notifications:", error);
            this.notificationCount = 0;
            this.hasNotification = false;
            setTimeout(() => this.checkNotifications(), 5000);
        }
    }
});