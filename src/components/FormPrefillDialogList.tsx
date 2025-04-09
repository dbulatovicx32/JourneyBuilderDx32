import { useMemo, useState } from 'react';
import { Typography, List, ListItem, ListItemButton, ListItemText, Paper, IconButton } from '@mui/material';
import { BlueprintForm, FormField, PrefillSource } from '../models/actionBlueprint.model';
import FieldMappingDialog from './FieldMappingDialog';
import useJourneyBuilder from '../hooks/useJourneyBuilder';
import CloseIcon from '@mui/icons-material/Close';
import StorageIcon from '@mui/icons-material/Storage';

interface FormFieldsListProps {
  form: BlueprintForm | null;
}

export default function FormPrefillDialogList({ form }: FormFieldsListProps) {
  const { actionBlueprint, selectedNode, prefillMappings, setPrefillMapping } = useJourneyBuilder();
  const [selectedField, setSelectedField] = useState<({ fieldId: string } & FormField) | null>(null);

  const formFields = useMemo(() => {
    if (!form?.field_schema?.properties) return [];

    const data = Object.entries(form.field_schema.properties).map(([fieldId, fieldData]) => ({
      fieldId,
      ...fieldData,
    }));

    console.log('data', data);
    console.log('form?.field_schema?.properties', form?.field_schema?.properties);

    return data;
  }, [form]);

  const currentMappings = useMemo(() => {
    if (!selectedNode) return {};
    return prefillMappings[selectedNode.id] || {};
  }, [selectedNode, prefillMappings]);

  const onFieldClick = (fieldId: string, field: FormField) => {
    console.log('Field clicked:', fieldId, field);
    setSelectedField({ fieldId, ...field });
  };
  const handleCloseDialog = () => {
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

  if (!form) {
    return (
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="subtitle1">No form selected</Typography>
      </Paper>
    );
  }
  return (
    <>
      {formFields.length === 0 ? (
        <Typography variant="body2">No fields found in this form</Typography>
      ) : (
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
      )}

      {selectedField && <FieldMappingDialog field={selectedField} onClose={handleCloseDialog} onSelectMapping={handleSetMapping} />}
    </>
  );
}
