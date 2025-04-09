/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Divider, Paper } from '@mui/material';
import { useMemo } from 'react';
import useJourneyBuilder from '../hooks/useJourneyBuilder';

interface FormPrefillDialogProps {
  onClose: () => void;
}

export default function FormPrefillDialog({ onClose }: FormPrefillDialogProps) {
  const { selectedNode, actionBlueprint } = useJourneyBuilder();

  const associatedForm = useMemo(() => {
    if (!selectedNode || !actionBlueprint) return null;

    const formId = selectedNode.data.component_id;
    const associatedForm = actionBlueprint.forms.find((form: any) => form.id === formId);

    console.log('actionBlueprint', actionBlueprint);
    console.log('associatedForm', associatedForm);

    return associatedForm || null;
  }, [selectedNode, actionBlueprint]);

  if (!selectedNode) return null;

  return (
    <Dialog open={true} onClose={onClose} maxWidth="lg">
      <DialogTitle sx={{ pb: 1 }}>Form Details: {selectedNode.data.name}</DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Associated Form {associatedForm ? `(${associatedForm.id})` : '(Not Found)'}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box
            sx={{
              fontFamily: 'monospace',
              overflow: 'auto',
              maxHeight: '30vh',
            }}
          >
            {associatedForm ? (
              <Typography component="pre" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {JSON.stringify(associatedForm, null, 2)}
              </Typography>
            ) : (
              <Typography color="error">No form found with ID: {selectedNode.data.component_id}</Typography>
            )}
          </Box>
        </Paper>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
