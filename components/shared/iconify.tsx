import { Icon } from "@iconify/react";
import { IIcon } from "@interfaces/components";

const Iconify = ({ icon, className, width, rotate, hFlip, vFlip }: IIcon) => {
    return (
        <>
            <Icon
                width={width}
                rotate={rotate}
                hFlip={hFlip}
                icon={icon}
                className={className}
                vFlip={vFlip}
            />
        </>
    );
};

export default Iconify;