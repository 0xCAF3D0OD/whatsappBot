import {Backend, Login} from "../routes.js";

export const setupQRCodeDownload = () => ({
    QRCodeURL: null,
    isLoading: true,
    downloadQRCode() {
        this.isLoading = true;
        fetch(`${Backend}${Login}`)
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
})

export const pageRedirections = () => ({
  redirectToWhatsappSession() {
      window.location.href = "/whatsappSession";
    }
})
