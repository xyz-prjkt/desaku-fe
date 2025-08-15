# Desaku Digital Administration - AI Coding Agent Instructions

This is a React + TypeScript + Vite application for village administration with document processing (SK - Surat Keterangan) workflows.

## Architecture Overview

### Core Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **UI Framework**: Ant Design 5 (antd) with custom theming
- **State Management**: TanStack React Query v5 for server state
- **Forms**: React Hook Form + Yup validation
- **Routing**: React Router v7 with role-based route protection
- **Styling**: Tailwind CSS + Ant Design tokens

### Key Application Structure

**Service Layer Pattern**: All API interactions use React Query hooks in `/src/services/`:

```typescript
// Example pattern from sk-tidak-mampu.service.ts
const useGetUserSkTidakMampu = (paginateRequest: IPaginateRequest) =>
  useQuery({
    queryKey: [QUERY_KEYS.SK.TIDAK_MAMPU, paginateRequest],
    queryFn: async (): Promise<IApiResponse<ISuratKeterangan[]>> =>
      api
        .get("/sk/tidak-mampu", { params: paginateRequest })
        .then((res) => res.data),
  });
```

**Component Hierarchy**:

- `atoms/` - Basic form inputs, buttons, papers
- `molecules/` - Complex components like tables, layouts
- `general/` - Reusable business components (forms, selects)
- `pages/` - Feature-specific page components

**Route Architecture**: Three-tier routing with middleware:

- Public routes (`/auth`, `/landing`)
- Protected routes with role-based access control
- Admin-specific routes with permission validation

## Critical Development Patterns

### SK (Document) Module Pattern

When creating new SK types, follow this exact structure (see existing `sk-tidak-mampu`, `sk-dispensasi` modules):

1. **Interface** (`/src/interfaces/services/sk-[type].d.ts`):

```typescript
interface ISkTypeCreate {
  name: string;
  born_birth: string;
  // ... standard fields from SKGeneralForm
  work: string;
  // ... specific fields for this SK type
}
```

2. **Service** (`/src/services/sk-[type].service.ts`): Use exact pattern from `sk-kematian.service.ts`

3. **Form Components**: Use `SKGeneralForm` + specific form component pattern:

```tsx
<SKGeneralForm />
<SKSpecificForm /> // Only module-specific fields
```

4. **Validation Schema**: Use typed MaritalStatus in schemas:

```typescript
marital_status: yup
  .mixed<MaritalStatus>()
  .oneOf(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED", "SEPARATED", "SIRI"])
  .required("Status pernikahan wajib diisi"),
```

### Authentication & Authorization

- Cookie-based auth with `dsk-mddlwr` token
- Automatic token refresh in axios interceptor (`/src/utils/axios-instance.ts`)
- Role-based route protection via `routeMiddleware` utility
- User permissions checked against route definitions

### Query Key Management

All React Query keys centralized in `/src/constants/query-keys.ts`. Use nested structure:

```typescript
QUERY_KEYS.SK.TIDAK_MAMPU; // for lists
QUERY_KEYS.SK.TIDAK_MAMPU_DETAIL; // for detail views
```

### Form Handling Pattern

1. Use `FormProvider` wrapper with React Hook Form
2. Yup schemas in `/src/components/general/forms/schemas/`
3. Pre-populate forms with user profile data via `useGetAuthMeProfile()`
4. Include `ProfileCompletionView` for data validation

## Development Workflows

### Build & Development

```bash
pnpm dev          # Development server
pnpm build        # TypeScript check + Vite build
pnpm lint         # ESLint checking
```

### Environment Setup

- Set `VITE_API_BASE_URL` for backend API endpoint
- Default fallback: `http://localhost:4056`

## Component Conventions

### Naming & Organization

- PascalCase for components (`SKTidakMampuPages`)
- kebab-case for file paths (`sk-tidak-mampu/`)
- Feature-based directory structure in `/src/features/`

### TypeScript Interface Patterns

- Use `I` prefix for interfaces (`IApiResponse<T>`)
- Separate Create/Detail interfaces for entities
- Import shared types from `/src/interfaces/services/`

### Error Handling

- Standardized API responses via `IApiResponse<T>`
- Ant Design message notifications via `useAnt()` hook
- Axios interceptors handle 401/403 automatically

## Integration Points

### External Dependencies

- Ant Design Pro Components for advanced tables/layouts
- Lucide React for icons (supplementing Ant Design icons)
- Day.js for date handling (Ant Design default)
- CryptoJS for client-side encryption needs

### Backend Integration

- RESTful API with standardized response format
- File download handling via `downloadBlobFromResponse` utility
- Automatic credential handling in axios instance

## Common Gotchas

1. **React Query Cache**: Always invalidate related queries in mutation `onSuccess`
2. **Form Validation**: Include `work` field in all SK schemas (required by SKGeneralForm)
3. **Route Protection**: Check user permissions match route requirements
4. **TypeScript**: Use exact interface field names (e.g., `bussiness` not `business` in sk-usaha)
5. **Import Paths**: Use `@/` alias for src directory imports consistently

When adding new features, reference existing implementations in the same domain (e.g., copy `sk-tidak-mampu` pattern for new SK types) rather than creating new patterns.
