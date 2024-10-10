export const popUpBubble = () => ({
    props: ['notificationCount'],
    template() {
        return `
            <span 
              x-show="notificationCount > 0"
              x-text="notificationCount"
              class="absolute bg-red-500 text-white text-xs 
              font-bold rounded-full h-5 w-5 flex items-center justify-center"
            ></span>
        `
    }
});