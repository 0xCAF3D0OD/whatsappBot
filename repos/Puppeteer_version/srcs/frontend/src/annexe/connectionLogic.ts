import {Login} from '../routes.js';

export function setupConnectionTest() {
    return {
        testBackend() {
            fetch(`http://localhost:3000${Login}`)
              .then(response => {
                  return response.blob();
              })
              .then(data => {
                  if (data.type === 'image/png')
                    this.message = 'QR code successfully received';
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
