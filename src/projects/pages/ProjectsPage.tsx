import { Outlet } from 'react-router';
import Fab from '@mui/material/Fab';
import AddOutlined from '@mui/icons-material/AddOutlined';

import { useAppDispatch, useAppSelector } from '../../store/reduxHooks';
import { startNewProject } from '../../store/gallery';

export const ProjectsPage = () => {
  const { isSaving } = useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();

  // TODO: fix the error when change of view if posible
  const onClickNewProject = () => {
    dispatch(startNewProject());
  };

  return (
    <>
      <Outlet />

      <Fab
        disabled={isSaving}
        color="error"
        sx={{ position: 'fixed', right: 50, bottom: 50 }}
        onClick={onClickNewProject}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </Fab>
    </>
  );
};
