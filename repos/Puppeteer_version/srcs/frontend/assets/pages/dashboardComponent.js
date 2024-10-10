import { notificationsComponent } from "./notificationsComponent.js";
import { profilIconeComponent } from "./profilIconeComponent.js";
import { searchComponent } from "./searchComponent.js";
import { sidebarComponent } from "./sidebarComponent.js";

export const dashboardComponent = () => ({
    notifications: notificationsComponent(),
    profile: profilIconeComponent(),
    search: searchComponent(),
    sidebar: sidebarComponent(),
    template() {
        return `
            <div class="flex h-screen">
                <div class="flex flex-col flex-1 overflow-hidden">
                    <header class="flex items-center justify-between px-6 py-4 bg-white border-b border-indigo-600">
                        <div x-data="dashboardComponent().search" x-html="$data.template()"></div>
                        <div class="flex items-center">
                            <div x-data="dashboardComponent().notifications" x-ref="notificationsContainer" x-html="$data.template()"></div>
                            <div x-data="dashboardComponent().profile" x-html="$data.template()"></div>
                        </div>  
                    </header>
                </div>
            </div>
        `
    }
});