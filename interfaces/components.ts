import { IconifyIcon } from "@iconify/react";
import { IClass } from "./common";

export interface ITypography extends React.PropsWithChildren, IClass {
    variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
}

export interface IInput extends IClass {
    placeholder?: string;
    type?: "text" | "password" | "email" | "number";
}

export interface IIcon extends IClass {
    icon: string | IconifyIcon;
    width?: string | number;
    rotate?: number;
    hFlip?: boolean;
    vFlip?: boolean;
}

export interface IButton extends IClass {
    text?: string;
}

export interface IMenus extends IClass {
    menus: IMenu[];
    onlyIcons?: boolean;
}

export interface IMenu {
    id: number;
    name: string;
    icon: string;
    active: boolean;
    color?: string;
    href?: string;
    submenu?: IMenu[];
}

export interface ILogo {
    minimized?: boolean;
}

export interface ITitlePage {
    title?: string;
}

export interface ISelect {
    label: string;
    value: string;
}