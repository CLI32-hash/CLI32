import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { MainLayout } from '../components/layout/MainLayout';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';

// Public Pages
import { Home } from '../pages/public/Home';
import { About } from '../pages/public/About';
import { HowItWorks } from '../pages/public/HowItWorks';
import { ServicesPage } from '../pages/public/ServicesPage';
import { ExpertsDirectory } from '../pages/public/ExpertsDirectory';
import { ExpertProfile } from '../pages/public/ExpertProfile';
import { Contact } from '../pages/public/Contact';
import { Login } from '../pages/public/Login';
import { RegisterExpert } from '../pages/public/RegisterExpert';
import { RegisterInstitution } from '../pages/public/RegisterInstitution';

// Expert Dashboard
import { ExpertDashboard } from '../pages/expert/ExpertDashboard';
import { ExpertProfileEdit } from '../pages/expert/ExpertProfileEdit';
import { ExpertServices } from '../pages/expert/ExpertServices';
import { ExpertEnquiries } from '../pages/expert/ExpertEnquiries';

// Institution Dashboard
import { InstitutionDashboard } from '../pages/institution/InstitutionDashboard';
import { InstitutionProfile } from '../pages/institution/InstitutionProfile';
import { InstitutionEnquiries } from '../pages/institution/InstitutionEnquiries';

// Admin Dashboard
import { AdminDashboard } from '../pages/admin/AdminDashboard';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Standalone Auth Pages (no header/footer) */}
      <Route path="/login" element={<Login />} />

      {/* Public Pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/experts" element={<ExpertsDirectory />} />
        <Route path="/experts/:id" element={<ExpertProfile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register/expert" element={<RegisterExpert />} />
        <Route path="/register/institution" element={<RegisterInstitution />} />
      </Route>

      {/* Expert Portal */}
      <Route element={<ProtectedRoute allowedRole="EXPERT" />}>
        <Route element={<DashboardLayout role="EXPERT" />}>
          <Route path="/expert/dashboard" element={<ExpertDashboard />} />
          <Route path="/expert/profile" element={<ExpertProfileEdit />} />
          <Route path="/expert/services" element={<ExpertServices />} />
          <Route path="/expert/enquiries" element={<ExpertEnquiries />} />
        </Route>
      </Route>

      {/* Institution Portal */}
      <Route element={<ProtectedRoute allowedRole="INSTITUTION" />}>
        <Route element={<DashboardLayout role="INSTITUTION" />}>
          <Route path="/institution/dashboard" element={<InstitutionDashboard />} />
          <Route path="/institution/experts" element={<ExpertsDirectory />} />
          <Route path="/institution/profile" element={<InstitutionProfile />} />
          <Route path="/institution/requirements" element={<Navigate to="/institution/profile" replace />} />
          <Route path="/institution/enquiries" element={<InstitutionEnquiries />} />
        </Route>
      </Route>

      {/* Admin Portal */}
      <Route element={<ProtectedRoute allowedRole="ADMIN" />}>
        <Route element={<DashboardLayout role="ADMIN" />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};