export const QUERY_KEYS = {
  INFINITE: {},
  DASHBOARD: {
    STATUS_COUNT: ["dashboard", "status-count"],
    MY_SK_LIST: ["dashboard", "my-sk-list"],
  },
  AUTH: {
    ME: ["auth", "me"],
  },
  SK: {
    KEMATIAN: ["sk", "kematian"],
    KEMATIAN_DETAIL: ["sk", "kematian", "detail"],
    TIDAK_MAMPU: ["sk", "tidak-mampu"],
    TIDAK_MAMPU_DETAIL: ["sk", "tidak-mampu", "detail"],
    LIST: ["sk", "list"],
  },
  ADMIN: {
    ROLES: ["admin", "roles"],
    ROLE_DETAIL: ["admin", "role", "detail"],
    PERMISSIONS: ["admin", "permissions"],
    USERS: ["admin", "users"],
    USER_DETAIL: ["admin", "user", "detail"],
    SK_APPROVER_SETTINGS: ["admin", "sk-approver-settings"],
  },
} as const;
