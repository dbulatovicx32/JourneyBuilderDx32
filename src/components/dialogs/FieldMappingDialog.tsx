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
  TextField,
} from '@mui/material';
import { useMemo, useState } from 'react';
import useJourneyBuilder from '../../hooks/useJourneyBuilder';
import { FormField, GlobalDataSource, PrefillSource } from '../../models/actionBlueprint.model';
import { getUpstreamFormsWithSource, FormWithSource } from '../../utils/fieldMappingHelper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GLOBAL_DATA_SOURCES from '../../data/globalFieldData';

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
    isGlobal?: boolean;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const upstreamForms = useMemo(() => {
    if (!selectedNode || !actionBlueprint) return [] as FormWithSource[];

    return getUpstreamFormsWithSource(selectedNode, actionBlueprint);
  }, [selectedNode, actionBlueprint]);

  const handleFieldSelection = (sourceId: string, fieldId: string, nodeId: string, isGlobal?: boolean) => {
    setSelectedSource({ formId: sourceId, fieldId, nodeId, isGlobal });
  };

  const handleSave = () => {
    if (selectedSource && selectedNode) {
      const mapping: PrefillSource = {
        sourceFormId: selectedSource.formId,
        fieldId: selectedSource.fieldId,
        sourceNodeId: selectedSource.nodeId,
      };
      onSelectMapping(field.fieldId, mapping);
    }
  };

  const renderFormFields = (form: FormWithSource) => {
    const { form: formData, sourceNode } = form;

    return Object.keys(formData.field_schema.properties)
      .filter((fieldId) => fieldId.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((fieldId) => (
        <ListItem key={fieldId} disablePadding>
          <ListItemButton
            selected={selectedSource?.formId === formData.id && selectedSource?.fieldId === fieldId && selectedSource?.nodeId === sourceNode.id}
            onClick={() => handleFieldSelection(formData.id, fieldId, sourceNode.id)}
          >
            <ListItemText primary={fieldId} />
          </ListItemButton>
        </ListItem>
      ));
  };

  const renderAccordionItem = (form: FormWithSource) => {
    const { form: formData, sourceNode } = form;

    return (
      <Accordion key={`${sourceNode.id}-${formData.id}`}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`form-${sourceNode.id}-${formData.id}-content`}
          id={`form-${sourceNode.id}-${formData.id}-header`}
        >
          <Typography>{sourceNode.data.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List component="div" disablePadding>
            {renderFormFields(form)}
          </List>
        </AccordionDetails>
      </Accordion>
    );
  };

  const renderGlobalDataSource = (dataSourceId: string, dataSource: GlobalDataSource) => {
    return (
      <Accordion key={dataSourceId}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`global-${dataSourceId}-content`} id={`global-${dataSourceId}-header`}>
          <Typography>{dataSource.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List component="div" disablePadding>
            {Object.entries(dataSource.fields)
              .filter(([fieldId]) => fieldId.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(([fieldId]) => (
                <ListItem key={fieldId} disablePadding>
                  <ListItemButton
                    selected={selectedSource?.formId === dataSource.id && selectedSource?.fieldId === fieldId}
                    onClick={() => handleFieldSelection(dataSource.id, fieldId, dataSource.id)}
                  >
                    <ListItemText primary={fieldId} />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </AccordionDetails>
      </Accordion>
    );
  };

  if (!selectedNode || !actionBlueprint) return null;

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Select data element to map</DialogTitle>

      <DialogContent>
        <TextField fullWidth label="Filter fields by ID" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ mb: 2, mt: 1 }} />

        {Object.entries(GLOBAL_DATA_SOURCES).map(([dataSourceId, dataSource]) => renderGlobalDataSource(dataSourceId, dataSource))}
        {upstreamForms.map((form) => renderAccordionItem(form))}
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
