import { lazy } from "react";

// Páginas base
const Calendar = lazy(() => import("../pages/Calendar"));
const Chart = lazy(() => import("../pages/Chart"));
const FormElements = lazy(() => import("../pages/Form/FormElements"));
const FormLayout = lazy(() => import("../pages/Form/FormLayout"));
const Profile = lazy(() => import("../pages/Profile"));
const Settings = lazy(() => import("../pages/Settings"));
const Tables = lazy(() => import("../pages/Tables"));
const Alerts = lazy(() => import("../pages/UiElements/Alerts"));
const Buttons = lazy(() => import("../pages/UiElements/Buttons"));

// Roles
const Roles = lazy(() => import("../pages/Roles/ListRoles"));
import CreateRole from "../pages/Roles/CreateRole";
import UpdateRole from "../pages/Roles/UpdateRole";

// Permisos
import ListPermissions from "../pages/Permissions/ListPermission";
import CreatePermission from "../pages/Permissions/CreatePermission";
import UpdatePermission from "../pages/Permissions/UpdatePermission";

// Usuarios
import ListUsers from "../pages/Users/ListUser";
import CreateUser from "../pages/Users/CreateUser";
import UpdateUser from "../pages/Users/UpdateUser";

// Direcciones (
import ListAddress from "../pages/Address/ListAddress";
import CreateAddress from "../pages/Address/CreateAddress";

// Contraseñas
import ListPassword from "../pages/Passwords/ListPassword";
import CreatePassword from "../pages/Passwords/CreatePassword";

const coreRoutes = [
  // ==== USERS ====
  {
    path: "/users/list",
    title: "List Users",
    component: ListUsers,
  },
  {
    path: "/users/create",
    title: "Create Users",
    component: CreateUser,
  },
  {
    path: "/users/update/:id",
    title: "Update Users",
    component: UpdateUser,
  },

  // ==== ADDRESSES ====
  {
    path: "/addresses/list/:userId",
    title: "List Addresses",
    component: ListAddress,
  },
  {
    path: "/addresses/create/:userId",
    title: "Create Address",
    component: CreateAddress,
  },
  // ==== PASSWORDS ====
  {
    path: "/passwords/list/:userId",
    title: "List Passwords",
    component: ListPassword,
  },
  {
    path: "/passwords/create/:userId",
    title: "Create Password",
    component: CreatePassword,
  },
  // ==== ROLES ====
  {
    path: "/roles/list",
    title: "List Roles",
    component: Roles,
  },
  {
    path: "/roles/create",
    title: "Create Roles",
    component: CreateRole,
  },
  {
    path: "/roles/update/:id",
    title: "Update Roles",
    component: UpdateRole,
  },

  // ==== PERMISSIONS ====
  {
    path: "/permissions/list",
    title: "List Permissions",
    component: ListPermissions,
  },
  {
    path: "/permissions/create",
    title: "Create Permissions",
    component: CreatePermission,
  },
  {
    path: "/permissions/update/:id",
    title: "Update Permissions",
    component: UpdatePermission,
  },

  // ==== OTHER PAGES ====
  {
    path: "/profile",
    title: "Profile",
    component: Profile,
  },
  {
    path: "/forms/form-elements",
    title: "Forms Elements",
    component: FormElements,
  },
  {
    path: "/forms/form-layout",
    title: "Form Layouts",
    component: FormLayout,
  },
  {
    path: "/tables",
    title: "Tables",
    component: Tables,
  },
  {
    path: "/settings",
    title: "Settings",
    component: Settings,
  },
  {
    path: "/chart",
    title: "Chart",
    component: Chart,
  },
  {
    path: "/ui/alerts",
    title: "Alerts",
    component: Alerts,
  },
  {
    path: "/ui/buttons",
    title: "Buttons",
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
