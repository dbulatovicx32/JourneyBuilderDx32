import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import useJourneyBuilder from '../hooks/useJourneyBuilder';
import FormFieldsList from './FormPrefillDialogList';

interface FormPrefillDialogProps {
  onClose: () => void;
}

export default function FormPrefillDialog({ onClose }: FormPrefillDialogProps) {
  const { selectedForm } = useJourneyBuilder();

  if (!selectedForm) return null;

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>Prefill </DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormFieldsList form={selectedForm} />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
