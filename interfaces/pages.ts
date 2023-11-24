import { Dispatch, SetStateAction } from "react";
import { IAuthor, IItem, IPublishingCompany, IReader } from "./common";
import { ISelect } from "./components";

export interface IFormAuthorPageProps {
    onHandleAuthorRegister: (newAuthor: IAuthor) => void;
    onHandleAuthorUpdate: (author: IAuthor) => void;
    author?: IAuthor | null;
    setAuthor?: Dispatch<SetStateAction<IAuthor | null>> | undefined;
}

export interface IFormPublishingCompanyPageProps {
    onHandlePublishingCompanyRegister: (newPublishingCompany: IPublishingCompany) => void;
    onHandlePublishingCompanyUpdate: (publishingCompany: IPublishingCompany) => void;
    publishingCompany?: IPublishingCompany | null;
    setPublishingCompany?: Dispatch<SetStateAction<IPublishingCompany | null>> | undefined;
}

export interface IFormItemPageProps {
    onHandleItemRegister: (newItem: IItem) => void;
    onHandleItemUpdate: (item: IItem) => void;
    item?: IItem | null;
    setItem?: Dispatch<SetStateAction<IItem | null>> | undefined;
}

export interface IFormReaderPageProps {
    onHandleReaderRegister: (newReader: IReader) => void;
    onHandleReaderUpdate: (reader: IReader) => void;
    reader?: IReader | null;
    setReader?: Dispatch<SetStateAction<IReader | null>> | undefined;
}

export interface ITable<T> {
    data: T[];
    onHandleDelete: (id: string) => void;
    onHandleEdit: (id: string) => void;
}

export interface IListItem {
    data: IItem[];
    readers: ISelect[];
    onHandleDelete: (id: string) => void;
}

export interface IItemView {
    item: IItem;
    onHandleDelete: (id: string) => void;
    readers: ISelect[];
}

export interface IFormBorrow {
    readers: ISelect[];
    itemId: string;
}