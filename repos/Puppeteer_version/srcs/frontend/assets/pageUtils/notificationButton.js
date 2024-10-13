import { popUpBubble } from "./popUpBubble.js";
import { notificationScript } from "../scripts/notificationScript.js";

export const notificationButton = () => ({
    popUp: popUpBubble(),
    ...notificationScript(),
    async init() {
        await this.startNotificationCheck();
    },
    template() {
        return `
        <div x-data="notificationButton()" x-init="init">   
            <button @click="notificationOpen = !notificationOpen"
                    class="flex mx-4 text-gray-600 focus:outline-none relative p-2">
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 
                        6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 
                        6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 
                        19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    </path>
                </svg>
                <div x-data="popUp" x-html="template"
                     class="relative -top-2 custom-popup"
                     style="right: 10px; top: -0.5rem;">   
                </div>
            </button>
        </div>`
    }
})