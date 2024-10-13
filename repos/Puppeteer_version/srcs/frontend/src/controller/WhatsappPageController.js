import { DashboardComponent } from "../../assets/pages/DashboardComponent.js";

export const MainPageSession = () => ({
    DashboardComponent: DashboardComponent(),
    template() {
        return `
            <div class="container mx-auto px-4 py-8 flex-grow">
                <div x-data="DashboardComponent()">
                  <div x-html="template()"></div>
                </div>
            </div>
        `;
    }
});