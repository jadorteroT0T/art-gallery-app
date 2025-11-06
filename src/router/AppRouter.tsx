import { Routes, Route, Navigate } from 'react-router';

import { useCheckAuth } from '../hooks';
import { CheckingAuth } from '../ui/components/CheckingAuth';
import { ProjectsPage } from '../projects/pages';
import { SchedulePage } from '../schedule/pages';
import { GalleryLayout } from '../ui/layouts';
import { AuthLayout, LoginPage, RegisterPage } from '../auth';
import { ProjectsView, ProjectView } from '../projects/views';

export const AppRouter = () => {
  const status = useCheckAuth();

  if (status === 'checking') {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {status === 'authenticated' ? (
        // GalleryApp
        <Route path="/" element={<GalleryLayout />}>
          <Route index element={<Navigate to="/projects" />} />
          <Route path="projects" element={<ProjectsPage />}>
            <Route index element={<ProjectsView />} />
            <Route path=":projectId" element={<ProjectView />} />
          </Route>

          <Route path="schedule" element={<SchedulePage />} />
          <Route path="/*" element={<Navigate to="/projects" />} />
        </Route>
      ) : (
        // Login y registro
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Navigate to="/auth/login" />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
