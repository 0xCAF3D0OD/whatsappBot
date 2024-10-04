import {Login} from '../routes.js';

export function setupConnectionTest() {
    return {
        testBackend() {
            fetch('http://localhost:3000/test/')
                .then(response => response.json())
                .then(data => {
                    this.message = data.message;
                    setTimeout(() => {
                        window.location.href = Login;
                    }, 1000);
                })
                .catch(error => {
                    this.message = 'Error connecting to backend';
                    console.error('Error:', error);
                });
        }
    };
}