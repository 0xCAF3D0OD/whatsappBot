export const popUpBubble = () => ({
    template() {
        return `
            <span
              x-show="hasNotification"
              x-text="notificationCount"
              class="absolute bg-red-500 text-white text-xs 
              font-bold rounded-full h-5 w-5 flex items-center justify-center"
            ></span>
        `
    }
});