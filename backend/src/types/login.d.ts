export type Body = {
    email: string;
    password: string;
}

export type RawBody = {
    encryptedData: string;
}

export type AccountQuery = { 
    passHash: string, 
    isActive: number, 
    id: number 
}