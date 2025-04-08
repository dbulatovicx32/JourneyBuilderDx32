import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { BlueprintNode } from '../models/actionBlueprint.model';
import { NodeProps } from '@xyflow/react';

interface FormPrefillDialogProps {
  open: boolean;
  onClose: () => void;
  node: NodeProps<BlueprintNode> | null;
}

export default function FormPrefillDialog({ open, onClose, node }: FormPrefillDialogProps) {
  if (!node) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Form Details: {node.data.name}</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            p: 2,
            borderRadius: 1,
            fontFamily: 'monospace',
            overflow: 'auto',
            maxHeight: '60vh',
          }}
        >
          <Typography component="pre" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {JSON.stringify(node, null, 2)}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
