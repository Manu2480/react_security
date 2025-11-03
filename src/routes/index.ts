import { lazy } from 'react';


const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const Demo= lazy(() => import('../pages/Demo'));


const Roles = lazy(() => import('../pages/Roles/ListRoles'));
import CreateRole from '../pages/Roles/CreateRole';
import UpdateRole from '../pages/Roles/UpdateRole';

import ListPermissions from "../pages/Permissions/ListPermission"; 
import CreatePermission from '../pages/Permissions/CreatePermission';
import UpdatePermission from '../pages/Permissions/UpdatePermission';

import ListUsers from '../pages/Users/ListUser';
import CreateUser from '../pages/Users/CreateUser';
import UpdateUser from '../pages/Users/UpdateUser';


const coreRoutes = [
  {
    path: '/roles/list',
    title: 'List Roles',
    component: Roles,
  },
  {
    path: '/demo',
    title: 'Demo',
    component: Demo,
  },
  {
    path: '/users/list',
    title: 'List Users',
    component: ListUsers,
  },
  {
    path: '/permissions/list',
    title: 'List Permissions',
    component: ListPermissions,
  },
  { 
    path: '/permissions/create',
    title: 'Create Permissions',
    component: CreatePermission,
  },
  {
    path: '/permissions/update/:id',
    title: 'Update Permissions',
    component: UpdatePermission,
  },
  {
    path: '/roles/update/:id',
    title: 'Update Roles',
    component: UpdateRole,
  },
  {
    path: '/roles/create',
    title: 'Create Roles',
    component: CreateRole,
  },
  {
    path: '/users/create',
    title: 'Create Users',
    component: CreateUser,
  },
  {
    path: '/users/update/:id',
    title: 'Update Users',
    component: UpdateUser,
  },
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
