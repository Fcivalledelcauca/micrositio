export interface NavigationMenu{
    menu: string;
    link: string;
    icon: string
    child?:submenu[],
    order: number
}

interface submenu{
    submenu:string;
    link:string;
    order:number;
}