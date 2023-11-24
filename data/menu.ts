import { IMenu } from "interfaces/components";

export const menus: IMenu[] = [
    { id: 1, name: "Dashboard", icon: "clarity:home-line", active: true, color: "", href: "/dashboard" },
    { id: 2, name: "Obras", icon: "iconoir:book", active: false, color: "", href: "/dashboard/item" },
    { id: 3, name: "Autores", icon: "uiw:user-add", active: false, color: "", href: "/dashboard/author" },
    { id: 4, name: "Editoras", icon: "grommet-icons:book", active: false, color: "", href: "/dashboard/publishingCompany" },
    { id: 5, name: "Leitores", icon: "uil:book-reader", active: false, color: "", href: "/dashboard/reader" },
    { id: 6, name: "Empréstimos", icon: "carbon:global-loan-and-trial", active: false, color: "/dashboard/borrows" },
    { id: 7, name: "Relatórios", icon: "tabler:report", active: false, color: "/dashboard/reports" },
];