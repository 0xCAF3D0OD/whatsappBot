import { notificationOpen } from "../pageUtils/notificationOpen.js";
import { notificationButton } from "../pageUtils/notificationButton.js";

// a raccourcire pour plus de clarter
export const notificationsComponent = () => ({
        open: notificationOpen(),
        button: notificationButton(),
        template() {
            return `
                <div x-data="{ notificationOpen: false }" class="relative">
                <div x-data="button" x-html="template()"></div>
                <div x-show="notificationOpen" @click="notificationOpen = false"
                    class="fixed inset-0 z-10 w-full h-full" style="display: none;"></div>
                <div x-show="notificationOpen"
                    class="absolute right-0 z-10 mt-2 overflow-hidden bg-white rounded-lg shadow-xl w-80"
                    style="width: 20rem; display: none;">
                    <div x-data="open" x-html="template()"></div> 
                </div>
            </div>
        `;
}})