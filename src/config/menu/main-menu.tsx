import type { CustomItem } from '../../types/custom-item';
import BookIcon from '@mui/icons-material/Book';
import ScheduleIcon from '@mui/icons-material/Schedule';

export const mainMenu: CustomItem[] = [
  {
    path: '/projects',
    title: 'Proyectos',
    icon: <BookIcon />,
  },
  {
    path: '/schedule',
    title: 'Cronograma',
    icon: <ScheduleIcon />,
  },
];
