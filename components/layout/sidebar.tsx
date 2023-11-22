"use client";

import { useState } from "react";
import { Avatar } from "antd";
import { twMerge } from "tailwind-merge";
import Logo from "./logo";
import MenuList from "./menu-list";
import Typography from "../shared/typography";
import Iconify from "../shared/iconify";
import { menus } from "@data/menu";
import { bottomMenus } from "@data/bottom_menu";

export default function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div id="menu" className={twMerge("sticky duration-500 flex flex-col items-center py-6 justify-between bg-neutral-black_white-white rounded-se-2xl rounded-ee-2xl", sidebarOpen ? "w-64" : "w-16")}>
            <div className="w-full">
                <div className="flex flex-col items-center justify-center gap-2">
                    <Logo minimized={!sidebarOpen} />
                    {sidebarOpen && <Typography variant="p" className="font-bold text-theme-xxxs">Bruno Fernandes Horn</Typography>}
                </div>
                <div id="sidebar_menu_list" className="mt-10 w-full font-nunito text-theme-xxs">
                    <MenuList onlyIcons={!sidebarOpen} menus={menus} />
                </div>
            </div>

            <div id="bottom_menu_list" className="bottom-0 w-full font-nunito text-theme-xxxs">
                <MenuList onlyIcons={!sidebarOpen} menus={bottomMenus} />
                <div className={twMerge("pl-5 pr-6 gap-1 items-center flex mt-3", !sidebarOpen && "pl-2 pr-2 justify-center")}>
                    <Avatar src={"https://github.com/brunofhorn.png"} />
                    {sidebarOpen && <Typography variant="span" className="font-bold text-theme-xxxs">Bruno Fernandes Horn</Typography>}
                </div>
            </div>
            <div
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={twMerge("w-8 h-8 cursor-pointer flex justify-center items-center absolute left-48 top-20 rounded-full border border-neutral-gray-100 bg-neutral-black_white-white duration-500", sidebarOpen ? "" : "left-11 top-[72px]")}
            >
                <Iconify icon={sidebarOpen ? "ep:arrow-left" : "ep:arrow-right"} />
            </div>
        </div>
    );
};