import { Session } from "../routes.js";


export const notifications = () => ({
    notificationCount: 0,
    hasNotification: false,
    async checkNotifications() {
        // Simulez une vérification des notifications
        const response = await fetch(`${Session}/check-notifications`); // Remplacez par votre vrai appel API
        const data = await response.json();
        this.notificationCount = data.count;
        this.hasNotification = this.notificationCount > 0;
    }
    //     let hasNewNotifications = false;
    //     const statusElement = document.getElementById('notification-status');
    //     const badgeElement = document.getElementById('notification-badge');
    //
    //     if (!statusElement || !badgeElement) {
    //         console.error('Elements not found');
    //         return;
    //     }
    //     statusElement.textContent = 'Vérification des notifications...';
    //     const response = await fetch(`${Session}/check-notifications`);
    //     const data = await response.json();
    //     console.log("Données reçues:", data);
    //     try {
    //         if (data.notificationCount > data.lastNotificationCount)
    //             hasNewNotifications = true;
    //             this.hasNotification = true;
    //
    //             this.notificationCount = data.notificationCount;
    //         if (hasNewNotifications) {
    //             statusElement.textContent = 'Nouvelles notifications';
    //             badgeElement.textContent = data.notificationCount;
    //             badgeElement.style.opacity = '1';
    //         }
    //         else if (data.notificationCount) {
    //             statusElement.textContent = 'Notifications non lues';
    //             badgeElement.textContent = data.notificationCount;
    //             badgeElement.style.opacity = '1';
    //         } else {
    //             statusElement.textContent = 'Aucune nouvelle notification';
    //             badgeElement.style.opacity = '0';
    //         }
    //     } catch (error) {
    //         console.error('Erreur:', error);
    //         statusElement.textContent = "Erreur lors de la vérification des notifications";
    //         badgeElement.style.opacity = '0';
    //     }
    // }
})

// export function checkNotifications() {
//     const statusElement = document.getElementById('notification-status');
//     const badgeElement = document.getElementById('notification-badge');
//
//     if (!statusElement || !badgeElement) {
//         console.error('Elements not found');
//         return;
//     }
//
//     statusElement.textContent = 'Vérification des notifications...';
//
//     fetch(`${Session}/check-notifications`)
//         .then(response => response.json())
//         .then(data => {
//             console.log("Données reçues:", data);
//
//             if (data.notificationCount > data.lastNotificationCount)
//                 hasNewNotifications = true;
//
//             if (hasNewNotifications) {
//                 statusElement.textContent = 'Nouvelles notifications';
//                 badgeElement.textContent = data.notificationCount;
//                 badgeElement.style.opacity = '1';
//             }
//             else if (data.notificationCount) {
//                 statusElement.textContent = 'Notifications non lues';
//                 badgeElement.textContent = data.notificationCount;
//                 badgeElement.style.opacity = '1';
//             } else {
//                 statusElement.textContent = 'Aucune nouvelle notification';
//                 badgeElement.style.opacity = '0';
//             }
//         })
//         .catch(error => {
//             console.error('Erreur:', error);
//             statusElement.textContent = "Erreur lors de la vérification des notifications";
//             badgeElement.style.opacity = '0';
//         });
// }
//
// function periodicCheck() {
//     checkNotifications();
//     setTimeout(periodicCheck, 10000);
// }
//
// // S'assurer que la fonction est appelée une fois que le DOM est chargé
// document.addEventListener('DOMContentLoaded', (event) => {
//     console.log('DOM fully loaded and parsed');
//     periodicCheck();
// });
// document.addEventListener('click', function () {
//     hasNewNotifications = false
// });