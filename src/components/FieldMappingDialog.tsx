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
import { useMemo, useState } from 'react';
import useJourneyBuilder from '../hooks/useJourneyBuilder';
import { FormField, PrefillSource } from '../models/actionBlueprint.model';
import { getUpstreamFormsWithSource, FormWithSource } from '../utils/fieldMappingHelper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FieldMappingDialogProps {
  onClose: () => void;
  field: {
    fieldId: string;
    title?: string;
  } & FormField;
  onSelectMapping: (fieldId: string, mapping: PrefillSource) => void;
}

export default function FieldMappingDialog({ onClose, field, onSelectMapping }: FieldMappingDialogProps) {
  const { selectedNode, actionBlueprint } = useJourneyBuilder();
  const [selectedSource, setSelectedSource] = useState<{
    formId: string;
    fieldId: string;
    nodeId: string;
  } | null>(null);

  const upstreamForms = useMemo(() => {
    if (!selectedNode || !actionBlueprint) return [] as FormWithSource[];

    return getUpstreamFormsWithSource(selectedNode, actionBlueprint);
  }, [selectedNode, actionBlueprint]);

  const handleFieldSelection = (sourceId: string, fieldId: string, nodeId: string) => {
    setSelectedSource({ formId: sourceId, fieldId, nodeId });
  };

  const handleSave = () => {
    if (selectedSource && selectedNode) {
      const mapping: PrefillSource = { sourceFormId: selectedSource.formId, fieldId: selectedSource.fieldId, sourceNodeId: selectedSource.nodeId };
      onSelectMapping(field.fieldId, mapping);
    }
  };

  if (!selectedNode || !actionBlueprint) return null;

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Select data element to map</DialogTitle>

      <DialogContent>
        <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
          Search available Data
        </Typography>

        {upstreamForms.map(({ form, sourceNode }) => (
          <Accordion key={`${sourceNode.id}-${form.id}`}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`form-${sourceNode.id}-${form.id}-content`}
              id={`form-${sourceNode.id}-${form.id}-header`}
            >
              <Typography>
                {sourceNode.data.name} ({sourceNode.id})
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List component="div" disablePadding>
                {Object.keys(form.field_schema.properties).map((fieldId) => (
                  <ListItem key={fieldId} disablePadding>
                    <ListItemButton
                      selected={selectedSource?.formId === form.id && selectedSource?.fieldId === fieldId && selectedSource?.nodeId === sourceNode.id}
                      onClick={() => handleFieldSelection(form.id, fieldId, sourceNode.id)}
                    >
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
        <Button onClick={handleSave} color="primary" variant="contained" disabled={!selectedSource}>
          SELECT
        </Button>
      </DialogActions>
    </Dialog>
  );
}
