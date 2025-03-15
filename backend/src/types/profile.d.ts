export type UserInfo = {
    email: string;
    username: string;
    timeCreated: number;
    failedAttempts: number;
    lastLogin: number;
    role: string;
    country: string | null;
    postCode: string | null;
    settlement: string | null;
    address: string | null;
    pictureUrl: string | null;
}   
// Az email, username, postCode, settlement, address RSA titkosított. (A postCode ezért string)