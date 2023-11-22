export interface IClass {
    className?: string;
}

export interface IAuthor {
    id: string;
    name: string;
    nationality: string;
    avatar: string;
}

export interface IPublishingCompany {
    id: string;
    name: string;
}

export interface IItem {
    id: string;
    title: string;
    synopsis: string;
    publicationYear: string;
    numberPages: string;
    coverImage: string;
    itemType: IItemType;
    publishingCompany: IPublishingCompany;
    authors: IAuthor[];
}

export interface IItemType {
    id: string;
    description: string;
}

export interface IReader {
    id: string;
    name: string;
    username: string;
    email: string;
    birthDate: string;
    transactions: ITransaction[];
}

export interface ITransaction {
    id: string;
    date: string;
    item: IItem;
    returnDate: string;
    transactionType: ITransactionType;
}

export interface ITransactionType {
    id: string;
    description: string;
}