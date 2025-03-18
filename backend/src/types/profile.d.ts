export type UserInfo = {
    email: string;
    username: string;
    timeCreated: number;
    failedAttempts: number;
    lastLogin: number;
    role: string;
    country: string | null;
    institution: string | null;
    language: string | null;
    classroom: string | null;
    pictureUrl: string | null;
}