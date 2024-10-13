import {Backend, Login} from '../routes.js';

interface setupConnectionTestInterface {
  testBackend: () => Promise<void>,
}

export const setupConnectionTest = (): setupConnectionTestInterface => ({
  // @ts-ignore
  async testBackend(): Promise<void> {
      this.loading = true;
      try {
        const response = await fetch(`${Backend}${Login}`);
        const data = await response.blob();

        if (data.type === 'image/png') {
          this.message = 'QR code successfully received';
          setTimeout(() => {
            window.location.href = Login;
          }, 1000);
        } else {
          throw new Error('Received data is not a PNG image');
        }
      } catch (error) {
        this.message = 'Error connecting to backend';
        console.error('Error:', error);
      } finally {
        this.loading = false;
      }
    }
});
