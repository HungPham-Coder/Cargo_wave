export const roles = {
  PORT_CAPTAIN: "PortCaptain",
  SHIP_CAPTAIN: "ShipCaptain",
  WAREHOUSE_MANAGER: "WarehouseManager",
  STAFF: "Staff",
  CUSTOMER: "Khách hàng",
};

export const ROLE_MAP = {
  [roles.PORT_CAPTAIN]: "Trưởng cảng",
  [roles.SHIP_CAPTAIN]: "Thuyền trưởng",
  [roles.WAREHOUSE_MANAGER]: "Quản lý kho cảng",
  [roles.STAFF]: "Nhân viên",
  [roles.CUSTOMER]: "Khách hàng",
};

export const ALL_PERMISSIONS = {
  dashboard: {
    view: "dashboard.view",
    create: "dashboard.create",
    update: "dashboard.update",
    sider: "dashboard.sider",
  },
  accounts: {
    view: "accounts.view",
    create: "accounts.create",
    update: "accounts.update",
    sider: "accounts.sider",
  },
  orders: {
    view: "orders.view",
    create: "orders.create",
    update: "orders.update",
    sider: "orders.sider",
  },
  //
  materials: {
    view: "materials.view",
    create: "materials.create",
    update: "materials.update",
    sider: "materials.sider",
  },
  materialTypes: {
    view: "materialTypes.view",
    create: "materialTypes.create",
    update: "materialTypes.update",
    sider: "materialTypes.sider",
  },
  items: {
    view: "items.view",
    create: "items.create",
    update: "items.update",
    sider: "items.sider",
  },
};

export const USER_PERMISSIONS = {
  [roles.PORT_CAPTAIN]: [
    // DASHBOARD
    ALL_PERMISSIONS.dashboard.sider,
    ALL_PERMISSIONS.dashboard.view,
    // ACCOUNTS
    ALL_PERMISSIONS.accounts.sider,
    ALL_PERMISSIONS.accounts.view,
    ALL_PERMISSIONS.accounts.create,
    ALL_PERMISSIONS.accounts.update,
    // ORDERS
    ALL_PERMISSIONS.orders.sider,
    ALL_PERMISSIONS.orders.view,
    ALL_PERMISSIONS.orders.create,
    ALL_PERMISSIONS.orders.update,
    // materials
    ALL_PERMISSIONS.materials.sider,
    ALL_PERMISSIONS.materials.view,
    ALL_PERMISSIONS.materials.create,
    ALL_PERMISSIONS.materials.update,
    // materialTypes
    ALL_PERMISSIONS.materialTypes.sider,
    ALL_PERMISSIONS.materialTypes.view,
    ALL_PERMISSIONS.materialTypes.create,
    ALL_PERMISSIONS.materialTypes.update,
    // items
    ALL_PERMISSIONS.items.sider,
    ALL_PERMISSIONS.items.view,
    ALL_PERMISSIONS.items.create,
    ALL_PERMISSIONS.items.update,
  ],
  [roles.SHIP_CAPTAIN]: [
    // DASHBOARD
    ALL_PERMISSIONS.dashboard.sider,
    ALL_PERMISSIONS.dashboard.view,
    // ACCOUNTS
    ALL_PERMISSIONS.accounts.view,
    // materials
    ALL_PERMISSIONS.materials.sider,
    ALL_PERMISSIONS.materials.view,
    ALL_PERMISSIONS.materials.create,
    ALL_PERMISSIONS.materials.update,
    // materialTypes
    ALL_PERMISSIONS.materialTypes.sider,
    ALL_PERMISSIONS.materialTypes.view,
    ALL_PERMISSIONS.materialTypes.create,
    ALL_PERMISSIONS.materialTypes.update,
    // items
    ALL_PERMISSIONS.items.sider,
    ALL_PERMISSIONS.items.view,
    ALL_PERMISSIONS.items.create,
    ALL_PERMISSIONS.items.update,
  ],
  [roles.WAREHOUSE_MANAGER]: [
    // DASHBOARD
    ALL_PERMISSIONS.dashboard.sider,
    ALL_PERMISSIONS.dashboard.view,
  ],
  [roles.STAFF]: [
    // DASHBOARD
    ALL_PERMISSIONS.dashboard.sider,
    ALL_PERMISSIONS.dashboard.view,
  ],
  [roles.CUSTOMER]: [
    // DASHBOARD
    ALL_PERMISSIONS.dashboard.sider,
    ALL_PERMISSIONS.dashboard.view,
 `` ],
};