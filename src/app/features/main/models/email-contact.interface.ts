export interface IEmailContact {
    id?: string;
    email: string;
    name?: string;
    contactListId: string;
    description: string;
    facebook: string;
    instagram: string;
    linkedin: string;
    phoneNumber: string;
    telegram: string;
    whatsup: string;
    createdAt?: string;
    updatedAt?: string;
    mailContactListId?: string;
}

export interface IEmailContactList {
    id?: string;
    name?: string;
    description?: string;
    mails: any[];
    createdAt?: string;
    updatedAt?: string;
    userId?: string;
}