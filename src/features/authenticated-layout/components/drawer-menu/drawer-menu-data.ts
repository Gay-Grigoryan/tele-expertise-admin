export interface DrawerMenuPage {
  title: string;
  icon: string;
  activeIcon: string;
  path: string;
  subPages?: DrawerMenuSubPage[];
}
export interface DrawerMenuSubPage {
  title: string;
  path: string;
}

export const drawerMenuPages: DrawerMenuPage[] = [
  { title: "Chats", icon: "service", path: "/doctor-chats", activeIcon: "service-active" },
  { title: "Doctors", icon: "admin", path: "/doctors", activeIcon: "admin-active" }
];
export const superAdminDrawerMenuPages: DrawerMenuPage[] = [
  { title: "Doctors", icon: "admin", path: "/doctors", activeIcon: "admin-active" }
];
