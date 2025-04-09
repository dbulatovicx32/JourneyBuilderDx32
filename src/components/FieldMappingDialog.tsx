import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { useMemo } from 'react';
import useJourneyBuilder from '../hooks/useJourneyBuilder';
import { FormField, PrefillSource } from '../models/actionBlueprint.model';
import { getUpstreamFormsWithSource, FormWithSource } from '../utils/fieldMappingHelper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FieldMappingDialogProps {
  onClose: () => void;
  field: { fieldId: string; title?: string } & FormField;
}

export default function FieldMappingDialog({ onClose, field }: FieldMappingDialogProps) {
  const { selectedNode, actionBlueprint } = useJourneyBuilder();

  const upstreamForms = useMemo(() => {
    if (!selectedNode || !actionBlueprint) return [] as FormWithSource[];

    return getUpstreamFormsWithSource(selectedNode, actionBlueprint);
  }, [selectedNode, actionBlueprint]);

  const handleFieldSelection = (sourceFormId: string, fieldId: string, sourceNodeId: string) => {
    const selectedMapping: PrefillSource = { sourceFormId, fieldId, sourceNodeId };

    console.log(`Selected mapping for field ${field.fieldId}:`, selectedMapping);
    // onClose();
  };

  if (!selectedNode || !actionBlueprint) return null;

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Select data element to map</DialogTitle>

      <DialogContent>
        <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
          Available data
        </Typography>

        {upstreamForms.map(({ form, sourceNode }) => (
          <Accordion key={`${sourceNode.id}-${form.id}`} defaultExpanded={false}>
            <AccordionSummary
              id={`form-${sourceNode.id}-${form.id}-header`}
              aria-controls={`form-${sourceNode.id}-${form.id}-content`}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>
                Node {sourceNode.data.name} - FormID: ({form.id})
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <List component="div" disablePadding>
                {form.field_schema?.properties &&
                  Object.keys(form.field_schema.properties).map((fieldId) => (
                    <ListItem key={fieldId} disablePadding>
                      <ListItemButton onClick={() => handleFieldSelection(form.id, fieldId, sourceNode.id)}>
                        <ListItemText primary={fieldId} />
                      </ListItemButton>
                    </ListItem>
                  ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          CANCEL
        </Button>
        <Button onClick={onClose} color="primary" variant="contained">
          SELECT
        </Button>
      </DialogActions>
    </Dialog>
  );
}
