export type Body = {
    name: string;
    email: string;
    password: string;
    passwordre: string;
}

export type RawBody = {
    encryptedData: string;
    verifyUrl: string;
}