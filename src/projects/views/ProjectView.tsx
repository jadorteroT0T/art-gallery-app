import { useMemo, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import SaveOutlined from '@mui/icons-material/SaveOutlined';
import UploadOutlined from '@mui/icons-material/UploadOutlined';

import type { Project } from '../types/project';

import { useAppDispatch, useAppSelector } from '../../store/reduxHooks';
import {
  setActiveProject,
  startDeletingProject,
  startSavingProject,
  startUploadingFiles,
} from '../../store/gallery';

import { ImageGallery } from '../../ui';

type ProjectForm = Omit<Project, 'id' | 'imagesUrls' | 'date'>;

export const ProjectView = () => {
  const { active: project, isSaving } = useAppSelector(
    (state) => state.projects
  );

  const navigate = useNavigate();

  const { body, date, title } = project!;

  const { control, watch } = useForm<ProjectForm>({
    values: {
      title,
      body,
    },
  });

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const onSaveProject = () => {
    const { title, body } = watch();

    const updatedProject = { ...project!, title, body };

    dispatch(setActiveProject(updatedProject));
    dispatch(startSavingProject());
  };

  const onFileInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = target;

    if (!files || files.length === 0) return;

    dispatch(startUploadingFiles(files));
  };

  // TODO: remove navigate if posible
  const onDelete = () => {
    dispatch(startDeletingProject());
    navigate('/projects');
  };

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      sx={{
        mb: 1,
        px: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Grid>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>

      <Grid>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={onFileInputChange}
          style={{ display: 'none' }}
        />
        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current!.click()}
        >
          <UploadOutlined />
        </IconButton>

        <Button
          disabled={isSaving}
          onClick={onSaveProject}
          color="primary"
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container size={12}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="filled"
              fullWidth
              placeholder="Ingrese el titulo del proyecto"
              label="Proyecto"
              sx={{ border: 'none', mb: 1 }}
              // {...register('title')}
            />
          )}
        />

        <Controller
          name="body"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="filled"
              fullWidth
              multiline
              placeholder="Ingrese detalles acerca del proyecto"
              minRows={5}
              // {...register('body')}
            />
          )}
        />
      </Grid>

      <Grid container sx={{ justifyContent: 'end' }}>
        <Button onClick={onDelete} sx={{ mt: 2 }} color="error">
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      {/* Image gallery */}
      <ImageGallery images={project!.imagesUrls} />
    </Grid>
  );
};
