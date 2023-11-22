import { IMenu } from "interfaces/components";

export const menus: IMenu[] = [
    { id: 1, name: "Dashboard", icon: "clarity:home-line", active: true, color: "", href: "/dashboard" },
    {
        id: 2, name: "Catálogo", icon: "mingcute:book-5-line", active: false, color: "", submenu: [
            { id: 1, name: "Obras", icon: "iconoir:book", active: false, color: "", href: "/dashboard/item" },
            { id: 2, name: "Autores", icon: "uiw:user-add", active: false, color: "", href: "/dashboard/author" },
            { id: 3, name: "Editoras", icon: "grommet-icons:book", active: false, color: "", href: "/dashboard/publishingCompany" },
        ]
    },
    { id: 4, name: "Leitores", icon: "uil:book-reader", active: false, color: "", href: "/dashboard/reader" },
    { id: 5, name: "Empréstimos", icon: "carbon:global-loan-and-trial", active: false, color: "" },
    { id: 6, name: "Relatórios", icon: "tabler:report", active: false, color: "" },
];