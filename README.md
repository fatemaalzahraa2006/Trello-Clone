## M1 — Frontend Foundation & Shared Components

### 1. Project Structure

The frontend is located in `client/`.

```text
client/src/
├── components/
│   ├── common/
│   │   ├── button.jsx
│   │   ├── input.jsx
│   │   ├── avatar.jsx
│   │   ├── modal.jsx
│   │   └── toast.jsx
│   └── layout/
│       ├── AppLayout.jsx
│       └── navbar.jsx
├── context/
│   ├── AuthContext.jsx
│   └── ToastContext.jsx
├── routes/
│   └── ProtectedRoute.jsx
├── services/
│   └── api.js
└── pages/
    ├── auth/
    ├── boards/
    └── profile/
```

### 2. Shared Components

All reusable UI components are located in `src/components/common/`.

| Component | Purpose |
|---|---|
| Button | Reusable button with primary, secondary and danger variants |
| Input | Form input with label, validation error and required indicator |
| Avatar | Displays a user image or initials |
| Modal | Reusable modal dialog |
| Toast | Displays success and error notifications |

#### Button

Example:

```jsx
import Button from './components/common/button'

<Button variant="primary" size="medium" onClick={handleClick}>
  Save
</Button>
```

Props: `children`, `variant`, `size`, `type`, `disabled`, `onClick`.

#### Input

Example:

```jsx
<Input
  label="Email"
  name="email"
  value={email}
  onChange={handleChange}
  error={errors.email}
  required
/>
```

Props: `label`, `type`, `name`, `value`, `onChange`, `placeholder`, `error`, `required`, `disabled`.

#### Avatar

Example:

```jsx
<Avatar name="Fatema Mohamed" size="medium" />
```

Props: `name`, `imageUrl`, `size`.

#### Modal

Example:

```jsx
<Modal isOpen={isOpen} onClose={handleClose} title="Create Board">
  {/* Modal content */}
</Modal>
```

Props: `isOpen`, `onClose`, `title`, `children`.

### 3. Context Providers

**AuthContext**

Located in `src/context/AuthContext.jsx`.

Access authentication state and functions using:

```jsx
import { useAuth } from '../../context/AuthContext'

const {
  currentUser,
  token,
  isAuthenticated,
  loading,
  login,
  register,
  logout,
  updateUser,
} = useAuth()
```

**ToastContext**

Located in `src/context/ToastContext.jsx`.

Display notifications using:

```jsx
import { useToast } from '../../context/ToastContext'

const { showToast } = useToast()

showToast('Saved successfully!', 'success')
showToast('Something went wrong.', 'error')
```

### 4. API Client

Located in `src/services/api.js`.

Use the shared Axios instance for backend requests:

```jsx
import api from '../../services/api'

const response = await api.get('/boards')
```

The client uses `http://localhost:5000/api` by default and automatically attaches a saved JWT token to requests.

The base URL can be overridden using the `VITE_API_URL` environment variable.

### 5. Protected Routes

Located in `src/routes/ProtectedRoute.jsx`.

Protected routes require an authenticated user. Logged-out users are redirected to `/login`.

### 6. Application Layout

Located in `src/components/layout/`.

- `AppLayout.jsx` provides the shared Navbar and page layout.
- `navbar.jsx` provides navigation, the profile dropdown, and a search input placeholder.

The Navbar search functionality is currently a placeholder for integration by M6.

### 7. Running the Frontend

From the `client/` directory:

```bash
npm install
npm run dev
```

### 8. Current Implementation Status

- Shared frontend components implemented.
- Authentication context and protected routing implemented.
- Login and Signup form validation implemented.
- Profile view and editing interface implemented.
- Axios client configured.
- Backend authentication and API integration are pending.

**Important:** Authentication currently uses temporary test tokens. Real registration, login, JWT issuance, password hashing, and backend profile persistence must be implemented and integrated before production use.