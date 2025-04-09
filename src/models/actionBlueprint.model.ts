import { Node } from '@xyflow/react';

export interface ActionBlueprint {
  $schema: string;
  id: string;
  tenant_id: string;
  name: string;
  description: string;
  category: string;
  nodes: BlueprintNode[];
  edges: BlueprintEdge[];
  forms: BlueprintForm[];
  branches: [];
  triggers: [];
}

export interface BlueprintNode extends Node {
  id: string;
  data: NodeData;
  type: NodeType;
}

export type NodeType = 'form' | 'branch' | 'trigger' | 'configuration';

export interface NodeData extends Record<string, unknown> {
  name: string;
  component_id: string;
  prerequisites: string[];
  input_mapping?: PrefillMapping;
}

export interface BlueprintEdge {
  id: string;
  source: string;
  target: string;
}

export interface BlueprintForm {
  id: string;
  name: string;
  description: string;
  field_schema: FieldSchema;
  dynamic_field_config?: Record<string, DynamicFieldConfig>;
}

export interface FieldSchema {
  type: string;
  required: string[];
  properties: Record<string, FormField>;
}

export interface FormField {
  avantos_type: string;
  title: string;
  type: string;
}

export interface DynamicFieldConfig {
  selector_field: string;
  endpoint_id: string;
  payload_fields: Record<string, PayloadField>;
}

export interface PayloadField {
  type: string;
  value: string;
}

export interface PrefillMapping {
  [fieldId: string]: PrefillSource;
}

export interface PrefillSource {
  fieldId: string;
  sourceFormId: string;
  sourceNodeId: string;
}

export interface AvailableSourceField {
  sourceId: string;
  sourceLabel: string;
  fieldId: string;
  fieldLabel: string;
}
