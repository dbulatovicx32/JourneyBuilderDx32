import { Edge, Node } from '@xyflow/react';

export interface ActionBlueprint {
  $schema: string;
  id: string;
  tenant_id: string;
  name: string;
  description: string;
  category: string;
  nodes: BlueprintNode[];
  edges: Edge[];
  forms: [];
  branches: [];
  triggers: [];
}

export interface BlueprintNode extends Node {
  id: string;
  data: NodeData;
  type: NodeType
}

export type NodeType = 'form' | 'branch' | 'trigger' | 'configuration';

export interface NodeData extends Record<string, unknown> {
  name: string;
  component_id: string;
  prerequisites: string[];
}