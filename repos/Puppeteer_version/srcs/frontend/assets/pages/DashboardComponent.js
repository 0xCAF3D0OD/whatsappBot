import { notificationsComponent } from "./notificationsComponent.js";
import { profilIconeComponent } from "./profilIconeComponent.js";
import { searchComponent } from "./searchComponent.js";
import { sidebarComponent } from "./sidebarComponent.js";

export const DashboardComponent = () => ({

    notification: notificationsComponent(),
    profile: profilIconeComponent(),
    search: searchComponent(),
    sidebar: sidebarComponent(),

    template() {
        return `
            <div class="flex h-screen">
               <div class="flex flex-col flex-1 overflow-hidden">
                   <header class="flex items-center justify-between px-6 py-4 bg-white border-b border-indigo-600">
                       <div x-data="search" x-html="template()"></div>
                       <div class="flex items-center">
                           <div x-data="notification" x-html="template()"></div>
                           <div x-data="profile" x-html="template()"></div>
                       </div>
                   </header>
               </div>
            </div>
        `;
    }
});