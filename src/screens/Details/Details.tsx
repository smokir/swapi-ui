import { ChangeEvent, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link as MUILink,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { useAppDispatch, useAppSelector } from 'store';
import {
  editResourceTitle,
  fetchResource,
  isResourceType,
  selectResourceForDetails,
  selectResourcesMeta,
  setResourceType,
} from 'store/modules/resources';

import { noop } from 'utils';

import { CardDetails } from 'components';

import { Wrapper, CardHeader } from './styled';

export const Details = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [opened, setOpened] = useState(false);

  const onOpen = () => {
    setNewTitle(resource?.title || '');
    setOpened(true);
  };

  const onClose = () => {
    // TODO: refactor
    // eslint-disable-next-line no-restricted-globals
    if (newTitle === resource?.title || confirm('You have unsaved changes. Close anyway?')) {
      setOpened(false);
    }
  };

  const onSave = () => {
    dispatch(editResourceTitle({ id: resourceId!, title: newTitle }));
    setOpened(false);
  };

  const { loading, error } = useAppSelector(selectResourcesMeta);

  const { resourceType, resourceId } = useParams();

  const resource = useAppSelector(state =>
    resourceId ? selectResourceForDetails(state, resourceId) : undefined,
  );

  const [newTitle, setNewTitle] = useState('');

  const onChangeNewTitle = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value);

  useEffect(() => {
    if (!resource) {
      if (resourceId && resourceType && isResourceType(resourceType)) {
        dispatch(setResourceType(resourceType));
        dispatch(fetchResource({ resourceType, resourceId })).catch(noop);
      } else {
        console.error(`Incorrect path parameters: ${resourceType} and ${resourceId}`);
        navigate('/404');
      }
    }
  }, [dispatch, navigate, resource, resourceId, resourceType]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Wrapper elevation={1}>
      {resource && (
        <>
          <Card elevation={8}>
            <CardContent>
              <CardHeader>
                <Typography variant='h5'>{resource.title}</Typography>

                <IconButton
                  color='primary'
                  aria-label='edit title'
                  component='span'
                  onClick={onOpen}
                  size='small'
                >
                  <EditIcon />
                </IconButton>
              </CardHeader>

              <CardDetails details={resource.details} />
            </CardContent>
          </Card>

          <Dialog open={opened} onClose={onClose}>
            <DialogTitle>Change title</DialogTitle>

            <DialogContent>
              <DialogContentText>
                In order to change the title please enter a new one and then press the Save button
              </DialogContentText>

              <TextField
                autoFocus
                margin='dense'
                label='New title'
                fullWidth
                value={newTitle}
                onChange={onChangeNewTitle}
                variant='standard'
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>

              <Button onClick={onSave}>Save</Button>
            </DialogActions>
          </Dialog>
        </>
      )}

      {error && (
        <Typography variant='h5' color='text.secondary'>
          Error: {error}
        </Typography>
      )}

      <MUILink component={Link} to='/'>
        Go back
      </MUILink>
    </Wrapper>
  );
};
