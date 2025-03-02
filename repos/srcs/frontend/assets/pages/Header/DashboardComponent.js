import { notificationsComponent } from "./notificationsComponent.js";
import { profilIconeComponent } from "./profilIconeComponent.js";
import { searchComponent } from "./searchComponent.js";
import { sidebarComponent } from "./sidebarComponent.js";
import { AstroComponent } from "../Body/AstroComponent.js";

export const DashboardComponent = () => ({

    notification: notificationsComponent(),
    profile: profilIconeComponent(),
    search: searchComponent(),
    sidebar: sidebarComponent(),

    AstroComponent: AstroComponent(),

    template() {
        return `
            <div class="flex">
               <div class="flex flex-col flex-1 overflow-hidden">
                   <header class="flex items-center justify-between px-6 py-2 bg-white border-b">
                       <div x-data="search" x-html="template()"></div>
                       <div class="flex items-center">
                           <div x-data="notification" x-html="template()"></div>
                           <div x-data="profile" x-html="template()"></div>
                       </div>
                   </header>
                   <div x-data="AstroComponent()" x-html="template()"></div>
               </div>
            </div>
        `;
    }
});