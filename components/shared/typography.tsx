import { ITypography } from "@interfaces/components";
import { twMerge } from "tailwind-merge";

const headline = "font-inter font-normal text-neutral-black_white-black ";
const commonFonts = "font-nunito font-normal ";

const defaultStyles = {
    h1: headline + "text-theme-huge",
    h2: headline + "text-theme-display",
    h3: headline + "text-theme-xxxl",
    h4: headline + "text-theme-xxl",
    h5: headline + "text-theme-xl",
    h6: headline + "text-theme-lg",
    h7: headline + "text-theme-md",
    p: commonFonts + "text-theme-xxs",
    span: commonFonts + "text-theme-xxs",
};

export default function Typography({ className = "", variant = "span", children }: ITypography) {
    const Component = variant;

    return <Component className={twMerge(defaultStyles[variant], className)}>{children}</Component>;
};
