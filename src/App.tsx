/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store/useAppStore';

// Pages
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { SavingsPage } from './pages/SavingsPage';
import { EmergencyCampaignsPage } from './pages/EmergencyCampaignsPage';
import { FamilyCirclePage } from './pages/FamilyCirclePage';
import { AIChatPage } from './pages/AIChatPage';
import { PredictionsPage } from './pages/PredictionsPage';
import { BitcoinPaymentPage } from './pages/BitcoinPaymentPage';
import { CommunityImpactPage } from './pages/CommunityImpactPage';
import { ProfilePage } from './pages/ProfilePage';
import { KycPage } from './pages/KycPage';
import { AdminPage } from './pages/AdminPage';

// Layout
import { DashboardLayout } from './components/DashboardLayout';

export default function App() {
  const { theme } = useAppStore();

  // Handle global dark/light theme switching on document root
  React.useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage initialMode="login" />} />
        <Route path="/signup" element={<AuthPage initialMode="signup" />} />
        <Route path="/forgot-password" element={<AuthPage initialMode="forgot" />} />

        {/* Private Dashboard Workspace (conditionally wrapped in DashboardLayout) */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/wallet"
          element={
            <DashboardLayout>
              <SavingsPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/emergency"
          element={
            <DashboardLayout>
              <EmergencyCampaignsPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/family"
          element={
            <DashboardLayout>
              <FamilyCirclePage />
            </DashboardLayout>
          }
        />
        <Route
          path="/ai-assistant"
          element={
            <DashboardLayout>
              <AIChatPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/predictions"
          element={
            <DashboardLayout>
              <PredictionsPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/bitcoin"
          element={
            <DashboardLayout>
              <BitcoinPaymentPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/community"
          element={
            <DashboardLayout>
              <CommunityImpactPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <DashboardLayout>
              <ProfilePage />
            </DashboardLayout>
          }
        />
        <Route
          path="/kyc"
          element={
            <DashboardLayout>
              <KycPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/admin"
          element={
            <DashboardLayout>
              <AdminPage />
            </DashboardLayout>
          }
        />

        {/* Fallback to Landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
