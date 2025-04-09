// src/components/JourneyBuilder.tsx
import { useEffect, useMemo, useState } from 'react';
import { getBlueprintById } from '../api/actionBlueprint.api';
import { ActionBlueprint, BlueprintNode } from '../models/actionBlueprint.model';
import { ReactFlow, Background, NodeProps } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import FormNode from './FormNode';
import FormPrefillDialog from './FormPrefillDialog';
import JourneyBuilderContext from '../context/JourneyBuilderContext';

export default function JourneyBuilder() {
  const [actionBlueprint, setActionBlueprint] = useState<ActionBlueprint | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeProps<BlueprintNode> | null>(null);
  const [loading, setLoading] = useState(true);

  const nodeTypes = useMemo(() => ({ form: FormNode }), []);

  useEffect(() => {
    const fetchAndNormalizeBlueprint = async () => {
      setLoading(true);
      try {
        const data = await getBlueprintById();
        const edges = data.edges?.map((edge) => ({ ...edge, id: `${edge.source}-${edge.target}` })) ?? [];

        setActionBlueprint({ ...data, edges });
        console.log('data', data)
      } catch (error) {
        console.error('Failed to fetch blueprint data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndNormalizeBlueprint();
  }, []);

  if (loading) return <p>Loading blueprint...</p>;
  if (!actionBlueprint) return <p>No blueprint data available.</p>;

  return (
    <div style={{ height: '100%' }}>
      <JourneyBuilderContext.Provider value={{ actionBlueprint, selectedNode, setSelectedNode }}>

        <ReactFlow nodes={actionBlueprint.nodes} edges={actionBlueprint.edges} nodeTypes={nodeTypes}>
          <Background />
        </ReactFlow>

        {selectedNode && <FormPrefillDialog onClose={() => setSelectedNode(null)}  />}
      </JourneyBuilderContext.Provider>
    </div>
  );
}
