// App.jsx
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';

import CurrencySelector from './components/Language';
import Landing from './components/Landing';
import AuthComponent from './sign/AuthComponent';
import ProtectedRoute from './protectedroutes/Protected';
import Notifications from './components/Notification';
import Home from './components/home';
import Analytics from './components/analytics';

const clerkFrontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkFrontendApi}>
    
        <Routes>
          {/* Public Routes */}
          <Route path="/sign-in" element={<AuthComponent />} />
          <Route path="/sign-up" element={<AuthComponent />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <CurrencySelector />
              </ProtectedRoute>
            }
          />

          <Route
            path="/language"
            element={
              <ProtectedRoute>
                <CurrencySelector />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reminder"
            element={
              <ProtectedRoute>
                <Notifications/>
              </ProtectedRoute>
            }
          />

<Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
            }
          />

<Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics/>
              </ProtectedRoute>
            }
          />

          {/* Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />

          {/* Optional public landing page */}
          <Route path="/landing" element={<Landing />} />
        </Routes>

    </ClerkProvider>
  );
}

export default App;