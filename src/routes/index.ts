import { lazy } from "react";

// ==== PÁGINAS BASE ====
const Calendar = lazy(() => import("../pages/Calendar"));
const Chart = lazy(() => import("../pages/Chart"));
const FormElements = lazy(() => import("../pages/Form/FormElements"));
const FormLayout = lazy(() => import("../pages/Form/FormLayout"));
const Profile = lazy(() => import("../pages/Profile"));
const Settings = lazy(() => import("../pages/Settings"));
const Tables = lazy(() => import("../pages/Tables"));
const Alerts = lazy(() => import("../pages/UiElements/Alerts"));
const Buttons = lazy(() => import("../pages/UiElements/Buttons"));

// ==== USERS ====
import ListUsers from "../pages/Users/ListUser";
import CreateUser from "../pages/Users/CreateUser";
import UpdateUser from "../pages/Users/UpdateUser";

// ==== ADDRESSES ====
import ListAddress from "../pages/Address/ListAddress";
import CreateAddress from "../pages/Address/CreateAddress";

// ==== PASSWORDS ====
import ListPassword from "../pages/Passwords/ListPassword";
import CreatePassword from "../pages/Passwords/CreatePassword";

// ==== ROLES ====
import ListRoles from "../pages/Roles/ListRoles";
import CreateRole from "../pages/Roles/CreateRole";
import UpdateRole from "../pages/Roles/UpdateRole";

// ==== USER ROLES ====
import ListUserRole from "../pages/UserRoles/ListUserRole";
import CreateUserRole from "../pages/UserRoles/CreateUserRole";
import UpdateUserRole from "../pages/UserRoles/UpdateUserRole";

// ==== PERMISSIONS ====
import ListPermissions from "../pages/Permissions/ListPermission";
import CreatePermission from "../pages/Permissions/CreatePermission";
import UpdatePermission from "../pages/Permissions/UpdatePermission";

// ==== DIGITAL SIGNATURES ====
import ListDigitalSignature from "../pages/DigitalSignature/ListDigitalSignature";
import CreateDigitalSignature from "../pages/DigitalSignature/CreateDigitalSignature";
import UpdateDigitalSignature from "../pages/DigitalSignature/UpdateDigitalSignature";

// ==== DEVICES ====
import ListDevice from "../pages/Device/ListDevice";
import CreateDevice from "../pages/Device/CreateDevice";
import UpdateDevice from "../pages/Device/UpdateDevice";

// ==== SECURITY QUESTIONS ====
import ListSecurityQuestion from "../pages/SecurityQuestion/ListSecurityQuestion";
import CreateSecurityQuestion from "../pages/SecurityQuestion/CreateSecurityQuestion";
import UpdateSecurityQuestion from "../pages/SecurityQuestion/UpdateSecurityQuestion";

// ==== ANSWERS ====
import ListAnswer from "../pages/Answer/ListAnswer";
import CreateAnswer from "../pages/Answer/CreateAnswer";
import UpdateAnswer from "../pages/Answer/UpdateAnswer";

// ==== RUTAS ====
const coreRoutes = [
  // ==== USERS ====
  { path: "/users/list", title: "List Users", component: ListUsers },
  { path: "/users/create", title: "Create Users", component: CreateUser },
  { path: "/users/update/:id", title: "Update Users", component: UpdateUser },

  // ==== ADDRESSES ====
  { path: "/addresses/list/:userId", title: "List Addresses", component: ListAddress },
  { path: "/addresses/create/:userId", title: "Create Address", component: CreateAddress },

  // ==== PASSWORDS ====
  { path: "/passwords/list/:userId", title: "List Passwords", component: ListPassword },
  { path: "/passwords/create/:userId", title: "Create Password", component: CreatePassword },

  // ==== ROLES ====
  { path: "/roles/list", title: "List Roles", component: ListRoles },
  { path: "/roles/create", title: "Create Role", component: CreateRole },
  { path: "/roles/update/:id", title: "Update Role", component: UpdateRole },

  // ==== USER ROLES ====
  { path: "/userroles/list", title: "List User Roles", component: ListUserRole },
  { path: "/userroles/create", title: "Create User Role", component: CreateUserRole },
  { path: "/userroles/update/:id", title: "Update User Role", component: UpdateUserRole },

  // ==== PERMISSIONS ====
  { path: "/permissions/list", title: "List Permissions", component: ListPermissions },
  { path: "/permissions/create", title: "Create Permissions", component: CreatePermission },
  { path: "/permissions/update/:id", title: "Update Permissions", component: UpdatePermission },

  // ==== OTRAS PÁGINAS ====
  { path: "/profile", title: "Profile", component: Profile },
  { path: "/forms/form-elements", title: "Forms Elements", component: FormElements },
  { path: "/forms/form-layout", title: "Form Layouts", component: FormLayout },
  { path: "/tables", title: "Tables", component: Tables },
  { path: "/settings", title: "Settings", component: Settings },
  { path: "/chart", title: "Chart", component: Chart },
  { path: "/ui/alerts", title: "Alerts", component: Alerts },
  { path: "/ui/buttons", title: "Buttons", component: Buttons },

  // ==== DIGITAL SIGNATURES ====
  { path: "/digitalsignatures/list", title: "List Digital Signatures", component: ListDigitalSignature },
  { path: "/digitalsignatures/create", title: "Create Digital Signature", component: CreateDigitalSignature },
  { path: "/digitalsignatures/update/:id", title: "Update Digital Signature", component: UpdateDigitalSignature },

  // ==== DEVICES ====
  { path: "/devices/list", title: "List Devices", component: ListDevice },
  { path: "/devices/create", title: "Create Device", component: CreateDevice },
  { path: "/devices/update/:id", title: "Update Device", component: UpdateDevice },

  // ==== SECURITY QUESTIONS ====
  { path: "/securityquestions/list", title: "List Security Questions", component: ListSecurityQuestion },
  { path: "/securityquestions/create", title: "Create Security Question", component: CreateSecurityQuestion },
  { path: "/securityquestions/update/:id", title: "Update Security Question", component: UpdateSecurityQuestion },

  // ==== ANSWERS ====
  { path: "/answers/list", title: "List Answers", component: ListAnswer },
  { path: "/answers/create", title: "Create Answer", component: CreateAnswer },
  { path: "/answers/update/:id", title: "Update Answer", component: UpdateAnswer },
];

const routes = [...coreRoutes];
export default routes;
