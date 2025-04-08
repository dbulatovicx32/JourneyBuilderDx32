export interface ActionBlueprint {
  $schema: string;
  id: string;
  tenant_id: string;
  name: string;
  description: string;
  category: string;
  nodes: [];
  edges: [];
  forms: [];
  branches: [];
  triggers: [];
}
