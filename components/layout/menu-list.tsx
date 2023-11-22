"use client";

import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { IMenus } from "@interfaces/components";
import Iconify from "../shared/iconify";

export default function MenuList({ menus, onlyIcons = false }: IMenus) {
    const [openSubmenu, setOpenSubmenu] = useState(false);
    const router = useRouter();

    const handleClick = (link: string) => {
        router.push(link);
    };

    return (
        <ul>
            {menus.map(menu => (
                <li
                    key={menu.id}
                    className={
                        twMerge(
                            "py-3 flex flex-col items-center justify-between cursor-pointer",
                            !menu.submenu && "hover:bg-neutral-gray-50 hover:border-l-2 hover:text-brand-secondary-600 hover:border-brand-secondary-600 hover:font-bold",
                            menu.active && "bg-neutral-gray-50 border-l-2 border-brand-secondary-600 font-bold",
                            menu.color ?? ""
                        )
                    }
                    onClick={() => menu.href ? handleClick(menu.href) : setOpenSubmenu(!openSubmenu)}

                >
                    <div className="flex flex-row gap-2 items-center w-full justify-between pl-5 pr-6">
                        <div className="flex flex-row gap-2">
                            <Iconify icon={menu.icon} width={20} />
                            {!onlyIcons && menu.name}
                        </div>
                        {menu.submenu && <Iconify icon={openSubmenu ? "ep:arrow-up" : "ep:arrow-down"} width={20} />}
                    </div>
                    {openSubmenu && menu.submenu && (
                        <ul className="flex flex-col w-full mt-3 bg-neutral-gray-50">
                            {menu.submenu?.map((submenu) => (
                                <li key={submenu.id} className="flex flex-row gap-2 w-full py-3 pl-7 hover:bg-neutral-gray-100 hover:text-brand-secondary-600 hover:font-bold">
                                    <div className="flex flex-row gap-2" onClick={() => submenu.href ? handleClick(submenu.href) : null}>
                                        <Iconify icon={submenu.icon} width={20} />
                                        {!onlyIcons && submenu.name}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
};