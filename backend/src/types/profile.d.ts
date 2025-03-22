export type UserInfo = {
    email: string;
    username: string;
    timeCreated: number;
    failedAttempts: number;
    lastLogin: number;
    role: string;
    country: string | null;
    institution: string | null;
    lang: string | null;
    class: string | null;
    pictureBase64Url: string | null;
}