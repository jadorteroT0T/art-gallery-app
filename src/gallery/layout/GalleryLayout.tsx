import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Box, Toolbar } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store/reduxHooks';
import { setActiveProject } from '../../store/gallery';

import { NavBar, SideBar } from '../../ui';

const drawerWidth = 240;

export const GalleryLayout = ({ children }: React.PropsWithChildren) => {
  const { fullName } = useAppSelector((state) => state.auth);
  const { projects } = useAppSelector((state) => state.gallery);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const sideBarItems = useMemo(() => {
    // Items estáticos (siempre visibles)
    const staticItems = [
      {
        id: 'gallery',
        title: 'Galería',
        subtitle: 'Ver todos los proyectos',
        onClick: () => navigate('/')
      },
      {
        id: 'portfolio-health',
        title: 'Salud de Portfolio',
        subtitle: 'Estado de proyectos',
        onClick: () => navigate('/portfolio/health')
      },
      {
        id: 'distribution',
        title: 'Distribución',
        subtitle: 'Gestión de personal',
        onClick: () => {
          // Solo navegar si no estamos ya en distribución
          if (location.pathname !== '/distribution') {
            navigate('/distribution');
          }
        }
      }
    ];

    // Items dinámicos (proyectos)
    const projectItems = projects.map((project) => ({
      id: project.id,
      title: project.title ?? 'Nueva entrada',
      subtitle: project.body,
      onClick: () => dispatch(setActiveProject(project)),
    }));

    return [...staticItems, ...projectItems];
  }, [projects, navigate, dispatch, location.pathname]);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <NavBar drawerWidth={drawerWidth} />
        <SideBar
          title={fullName!}
          drawerWidth={drawerWidth}
          items={sideBarItems}
        />

        <Box
          className="animate__animated animate__fadeIn animate__faster"
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
};