// src/components/JourneyBuilder.tsx
import { useEffect, useMemo, useState } from 'react';
import { getBlueprintById } from '../api/actionBlueprint.api';
import { ActionBlueprint, BlueprintNode, BlueprintForm, PrefillMapping, PrefillSource } from '../models/actionBlueprint.model';
import { ReactFlow, Background, NodeProps } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import FormNode from './FormNode';
import FormPrefillDialog from './FormPrefillDialog';
import JourneyBuilderContext from '../context/JourneyBuilderContext';

type NodeMappings = {
  [nodeId: string]: PrefillMapping;
};

export default function JourneyBuilder() {
  const [actionBlueprint, setActionBlueprint] = useState<ActionBlueprint | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeProps<BlueprintNode> | null>(null);
  const [selectedForm, setSelectedForm] = useState<BlueprintForm | null>(null);
  const [prefillMappings, setPrefillMappings] = useState<NodeMappings>({});
  const [loading, setLoading] = useState(true);

  const nodeTypes = useMemo(() => ({ form: FormNode }), []);

  useEffect(() => {
    const fetchAndNormalizeBlueprint = async () => {
      setLoading(true);
      try {
        const data = await getBlueprintById();
        const edges = data.edges?.map((edge) => ({ ...edge, id: `${edge.source}-${edge.target}` })) ?? [];

        setActionBlueprint({ ...data, edges });
        console.log('data', data);

        // Initialize prefill mappings from node data if they exist
        const initialMappings: NodeMappings = {};
        data.nodes.forEach((node: BlueprintNode) => {
          if (node.data.input_mapping) {
            initialMappings[node.id] = node.data.input_mapping;
          }
        });
        setPrefillMappings(initialMappings);
      } catch (error) {
        console.error('Failed to fetch journey data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndNormalizeBlueprint();
  }, []);

  useEffect(() => {
    if (!selectedNode || !actionBlueprint) {
      setSelectedForm(null);
      return;
    }

    const componentId = selectedNode.data.component_id;
    const form = actionBlueprint.forms.find((form) => form.id === componentId) || null;

    setSelectedForm(form);
  }, [selectedNode, actionBlueprint]);

  const setPrefillMapping = (nodeId: string, fieldId: string, mapping: PrefillSource | null) => {
    setPrefillMappings((prevMappings) => {
      const nodeMappings = prevMappings[nodeId] || {};
      const newNodeMappings = { ...nodeMappings };

      if (mapping === null) delete newNodeMappings[fieldId];
      else newNodeMappings[fieldId] = mapping;

      return { ...prevMappings, [nodeId]: newNodeMappings };
    });
  };

  const getPrefillMapping = (nodeId: string) => {
    return prefillMappings[nodeId];
  };

  if (loading) return <p>Loading blueprint...</p>;
  if (!actionBlueprint) return <p>No blueprint data available.</p>;

  return (
    <div style={{ height: '100%' }}>
      <JourneyBuilderContext.Provider
        value={{
          actionBlueprint,
          selectedNode,
          setSelectedNode,
          selectedForm,
          setSelectedForm,
          prefillMappings,
          setPrefillMapping,
          getPrefillMapping,
        }}
      >
        <ReactFlow nodes={actionBlueprint.nodes} edges={actionBlueprint.edges} nodeTypes={nodeTypes}>
          <Background />
        </ReactFlow>

        {selectedNode && <FormPrefillDialog onClose={() => setSelectedNode(null)} />}
      </JourneyBuilderContext.Provider>
    </div>
  );
}
