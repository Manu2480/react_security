// src/components/sidebar/SidebarItems.ts
// Define los items del sidebar una sola vez.
// Cada variante (Tailwind, Bootstrap, UI) decide cómo mostrarlos.

export interface SidebarItem {
  label: string;
  path: string;
}

export const sidebarItems: SidebarItem[] = [
  { label: 'Usuarios', path: '/users/list' },  
  { label: 'Roles', path: '/roles/list' },
  { label: 'Permisos', path: '/permissions/list' },
  // Aquí puedes agregar más rutas
  // { label: 'Configuración', path: '/settings' },
];
