import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { App as AntApp, ConfigProvider } from 'antd';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Users from './pages/Users';
import Connections from './pages/Connections';
import License from './pages/License';
import { AuthProvider } from './context/AuthContext';
import { LocaleProvider } from './context/LocaleContext';
import { CheckpointProvider } from './context/CheckpointContext';
import { RequireAuth } from './components/RequireAuth';

// Import new modular components
import Desktops from './pages/desktops';
import Logs from './pages/logs';
import Devices from './pages/Devices';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0058aa',
        },
      }}
    >
      <LocaleProvider>
        <AuthProvider>
          <CheckpointProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <RequireAuth>
                      <MainLayout />
                    </RequireAuth>
                  }
                >
                  <Route index element={<Navigate to="/desktops" replace />} />
                  <Route path="desktops" element={<Desktops />} />
                  <Route path="devices" element={<Devices />} />
                  <Route path="connections" element={<Connections />} />
                  <Route path="users" element={<Users />} />
                  <Route path="logs/*" element={<Logs />} />
                  <Route path="license" element={<License />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </CheckpointProvider>
        </AuthProvider>
      </LocaleProvider>
    </ConfigProvider>
  );
}

export default App;
