import { useMemo, useState } from 'react';
import { Typography, List, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { BlueprintForm, FormField } from '../models/actionBlueprint.model';
import FieldMappingDialog from './FieldMappingDialog';

interface FormFieldsListProps {
  form: BlueprintForm | null;
}

export default function FormFieldsList({ form }: FormFieldsListProps) {
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

  const [selectedField, setSelectedField] = useState<({ fieldId: string } & FormField) | null>(null);

  const onFieldClick = (fieldId: string, field: FormField) => {
    console.log('Field clicked:', fieldId, field);
    setSelectedField({ fieldId, ...field });
  };
  const handleCloseDialog = () => {
    setSelectedField(null);
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
      <Paper sx={{ p: 2, mt: 2 }}>
        {formFields.length === 0 ? (
          <Typography variant="body2">No fields found in this form</Typography>
        ) : (
          <List sx={{ width: '100%' }}>
            {formFields.map((field) => (
              <ListItem key={field.fieldId} disablePadding divider>
                <ListItemButton onClick={() => onFieldClick(field.fieldId, field)}>
                  <ListItemText primary={field.title || field.fieldId} secondary={`Type: ${field.avantos_type}`} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      {selectedField && <FieldMappingDialog field={selectedField} onClose={handleCloseDialog} />}
    </>
  );
}
