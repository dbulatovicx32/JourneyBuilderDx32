import { useMemo, useState } from 'react';
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
  Paper,
  IconButton,
} from '@mui/material';
import { FormField, PrefillSource } from '../models/actionBlueprint.model';
import FieldMappingDialog from './FieldMappingDialog';
import useJourneyBuilder from '../hooks/useJourneyBuilder';
import CloseIcon from '@mui/icons-material/Close';
import StorageIcon from '@mui/icons-material/Storage';

interface FormPrefillDialogProps {
  onClose: () => void;
}

export default function FormPrefillDialog({ onClose }: FormPrefillDialogProps) {
  const { actionBlueprint, selectedNode, selectedForm, prefillMappings, setPrefillMapping } = useJourneyBuilder();
  const [selectedField, setSelectedField] = useState<({ fieldId: string } & FormField) | null>(null);

  const formFields = useMemo(() => {
    if (!selectedForm?.field_schema?.properties) return [];

    const data = Object.entries(selectedForm.field_schema.properties).map(([fieldId, fieldData]) => ({
      fieldId,
      ...fieldData,
    }));

    return data;
  }, [selectedForm]);

  const currentMappings = useMemo(() => {
    if (!selectedNode) return {};
    return prefillMappings[selectedNode.id] || {};
  }, [selectedNode, prefillMappings]);

  const onFieldClick = (fieldId: string, field: FormField) => {
    setSelectedField({ fieldId, ...field });
  };

  const handleCloseFieldMappingDialog = () => {
    setSelectedField(null);
  };

  const handleSetMapping = (fieldId: string, prefillMapping: PrefillSource) => {
    if (selectedNode) {
      setPrefillMapping(selectedNode.id, fieldId, prefillMapping);
      setSelectedField(null);
    }
  };

  const handleRemoveMapping = (fieldId: string) => {
    if (selectedNode) setPrefillMapping(selectedNode.id, fieldId, null);
  };

  const getSourceNodeName = (prefillMapping: PrefillSource) => {
    if (!prefillMapping || !actionBlueprint) return '';

    const sourceNode = actionBlueprint.nodes.find((node) => node.id === prefillMapping.sourceNodeId);
    return sourceNode ? sourceNode.data.name : '';
  };

  if (!selectedForm) return null;

  const renderFieldsList = () => {
    if (!selectedForm) {
      return (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="subtitle1">No form selected</Typography>
        </Paper>
      );
    }

    if (formFields.length === 0) {
      return <Typography variant="body2">No fields found in this form</Typography>;
    }

    return (
      <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0, my: 2 }}>
        {formFields.map((field) => {
          const prefillMapping = currentMappings[field.fieldId];
          const sourceNodeName = getSourceNodeName(prefillMapping);

          return (
            <ListItem
              key={field.fieldId}
              disablePadding
              divider
              sx={{ border: prefillMapping ? '1px solid #2196f3' : 'inherit', bgcolor: prefillMapping ? 'rgba(33, 150, 243, 0.08)' : 'inherit' }}
              secondaryAction={
                prefillMapping && (
                  <IconButton edge="end" onClick={() => handleRemoveMapping(field.fieldId)}>
                    <CloseIcon />
                  </IconButton>
                )
              }
            >
              <ListItemButton onClick={() => onFieldClick(field.fieldId, field)}>
                {!prefillMapping && <StorageIcon sx={{ mr: 2, color: prefillMapping ? '#2196f3' : '#9e9e9e' }} />}
                <ListItemText
                  primary={
                    <Typography component="span" sx={{ color: prefillMapping ? 'text.primary' : 'text.secondary' }}>
                      {!prefillMapping ? field.fieldId : `${field.fieldId}: ${sourceNodeName}.${prefillMapping.fieldId}`}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <>
      <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>Prefill</DialogTitle>

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>{renderFieldsList()}</DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {selectedField && <FieldMappingDialog field={selectedField} onClose={handleCloseFieldMappingDialog} onSelectMapping={handleSetMapping} />}
    </>
  );
}
