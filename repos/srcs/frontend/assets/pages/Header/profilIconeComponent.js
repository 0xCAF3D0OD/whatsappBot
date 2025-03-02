import { SetUpProfileScript } from '../../scripts/setUpProfileScript.ts';


export const profilIconeComponent = () => ({
    ...SetUpProfileScript(),
    profilePic: false,
    init() {
        this.checkProfileImage();
    },
    template() {
        return `
            <div x-data="{ dropdownOpen: false }" class="relative">
                <button @click="dropdownOpen = ! dropdownOpen"
                    class="relative block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none">
                    <img x-show="imageURL" :src="imageURL" 
                         class="object-cover w-full h-full"
                         alt="Your avatar"/>
                    <img x-show="!profilePic" 
                         src="https://www.svgrepo.com/show/420337/animal-avatar-bear.svg" 
                         class="object-cover w-full h-full"/>
                </button>
    
                <div x-show="dropdownOpen" @click="dropdownOpen = false" class="fixed inset-0 z-10 w-full h-full"
                    style="display: none;"></div>
    
                <div x-show="dropdownOpen"
                    class="absolute right-0 z-10 w-48 mt-2 overflow-hidden bg-white rounded-md shadow-xl"
                    style="display: none;">
                    <a href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Profile</a>
                    <a href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Products</a>
                    <a href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Logout</a>
                </div>
            </div>
        `
    }
})