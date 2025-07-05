export const QUERY_KEYS = {
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
  },
} as const;
