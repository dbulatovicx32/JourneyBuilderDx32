import { NodeProps } from '@xyflow/react';
import { ActionBlueprint, BlueprintNode, BlueprintForm, BlueprintEdge } from '../models/actionBlueprint.model';

export interface FormWithSource {
  form: BlueprintForm;
  sourceNode: BlueprintNode;
}

export function getUpstreamFormsWithSource(selectedNode: NodeProps<BlueprintNode>, blueprint: ActionBlueprint): FormWithSource[] {
  const nodeId = selectedNode.id;
  const upstreamNodes = getUpstreamNodesTopologicallySorted(nodeId, blueprint.nodes, blueprint.edges);
  const upstreamForms: FormWithSource[] = [];

  for (const node of upstreamNodes) {
    const formId = node.data.component_id;
    const nodeForm = blueprint.forms.find((form) => form.id === formId);

    if (nodeForm) upstreamForms.push({ form: nodeForm, sourceNode: node });
  }

  return upstreamForms;
}

export function getUpstreamNodesTopologicallySorted(nodeId: string, nodes: BlueprintNode[], edges: BlueprintEdge[]): BlueprintNode[] {
  const visitedNodeIds = new Set<string>();
  const sortedNodes: BlueprintNode[] = [];

  function getUpstreamNodes(currentNodeId: string) {
    if (visitedNodeIds.has(currentNodeId)) return;
    visitedNodeIds.add(currentNodeId);

    const parentNodes = getDirectParentNodes(currentNodeId, nodes, edges);

    for (const node of parentNodes) {
      getUpstreamNodes(node.id);
    }

    const currentNode = nodes.find((node) => node.id === currentNodeId);
    if (currentNode) sortedNodes.push(currentNode);
  }

  getUpstreamNodes(nodeId);
  sortedNodes.pop();
  return sortedNodes;
}

export function getDirectParentNodes(nodeId: string, nodes: BlueprintNode[], edges: BlueprintEdge[]): BlueprintNode[] {
  const incomingEdges = edges.filter((edge) => edge.target === nodeId);
  const parentNodeIds = incomingEdges.map((edge) => edge.source);

  return nodes.filter((node) => parentNodeIds.includes(node.id));
}
