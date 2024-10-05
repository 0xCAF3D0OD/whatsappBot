import {Login} from "../routes.js";

export function setupQRCodeDownload() {
    return {
        QRCodeURL: null,
        isLoading: true,
        downloadQRCode() {
            this.isLoading = true;
            fetch(`http://localhost:3000${Login}`)
                .then(response => {
                    if (!response.ok)
                        throw new Error('Network response was not ok');
                    return response.blob();
                })
                .then(data => {
                    if (data.type === 'image/png')
                        this.QRCodeURL = URL.createObjectURL(data as Blob);
                    this.isLoading = false;
                })
                .catch(error => {
                    this.message = 'Error connecting to backend';
                    this.isLoading = false;
                    console.error('Error:', error);
                });
        }
    };
}