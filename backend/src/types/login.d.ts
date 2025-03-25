export type Body = {
    email: string;
    password: string;
}

export type RawBody = {
    encryptedData: string;
    verifyUrl: string;
}

export type AccountQuery = { 
    passHash: string, 
    isActive: number, 
    id: number ,
    username: string,
    mgmtToken: string | null
}