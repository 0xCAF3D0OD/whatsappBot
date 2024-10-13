export const notificationOpen = () => ({
    template () {
        return `
        <div class="notificationOpen">
            <a href="#"
                class="flex items-center px-4 py-3 -mx-2 text-gray-600 hover:text-white hover:bg-indigo-600">
                <img class="object-cover w-8 h-8 mx-1 rounded-full"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=334&amp;q=80"
                    alt="avatar">
                <p class="mx-2 text-sm">
                    <span class="font-bold" href="#">Sara Salah</span> replied on the <span
                        class="font-bold text-indigo-400" href="#">Upload Image</span> artical . 2m
                </p>
            </a>
            <a href="#"
                class="flex items-center px-4 py-3 -mx-2 text-gray-600 hover:text-white hover:bg-indigo-600">
                <img class="object-cover w-8 h-8 mx-1 rounded-full"
                    src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80"
                    alt="avatar">
                <p class="mx-2 text-sm">
                    <span class="font-bold" href="#">Slick Net</span> start following you . 45m
                </p>
            </a>
            <a href="#"
                class="flex items-center px-4 py-3 -mx-2 text-gray-600 hover:text-white hover:bg-indigo-600">
                <img class="object-cover w-8 h-8 mx-1 rounded-full"
                    src="https://images.unsplash.com/photo-1450297350677-623de575f31c?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=334&amp;q=80"
                    alt="avatar">
                <p class="mx-2 text-sm">
                    <span class="font-bold" href="#">Jane Doe</span> Like Your reply on <span
                        class="font-bold text-indigo-400" href="#">Test with TDD</span> artical . 1h
                </p>
            </a>
            <a href="#"
                class="flex items-center px-4 py-3 -mx-2 text-gray-600 hover:text-white hover:bg-indigo-600">
                <img class="object-cover w-8 h-8 mx-1 rounded-full"
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=398&amp;q=80"
                    alt="avatar">
                <p class="mx-2 text-sm">
                    <span class="font-bold" href="#">Abigail Bennett</span> start following you . 3h
                </p>
            </a>    
        </div>`
    }
})