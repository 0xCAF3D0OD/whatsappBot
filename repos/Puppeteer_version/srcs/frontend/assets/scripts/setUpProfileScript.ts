import {Backend, Session} from "../../src/routes.js";

interface SetUpProfileScript {
    profilPic: boolean | false;
    imageURL: string | null;
    checkProfileImage: () => Promise<void>;
}

export const SetUpProfileScript = (): SetUpProfileScript => ({
    imageURL: null,
    profilPic: false,
    // @ts-ignore
    async checkProfileImage(): Promise<void> {
        try {
            const response: Response = await fetch(`${Backend}${Session}/check-profile-image`);
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
            const data: Blob = await response.blob();
            if (data.type === 'image/png') {
                this.imageURL = URL.createObjectURL(data);
                console.log(this.imageURL);
                this.profilPic = true;
            }
        } catch (error) {
            console.error("Erreur lors de la vérification des notifications:", error);
        }
}});