import { useEffect, useMemo, useState } from 'react';
import { getBlueprintById } from '../api/actionBlueprint.api';
import { ActionBlueprint } from '../models/actionBlueprint.model';
import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import FormNode from './FormNode';

export default function JourneyBuilder() {
  const [actionBlueprint, setActionBlueprint] = useState<ActionBlueprint | null>(null);
  const [loading, setLoading] = useState(true);

  const nodeTypes = useMemo(() => ({ form: FormNode }), []);

  useEffect(() => {
    const fetchAndNormalizeBlueprint = async () => {
      setLoading(true);
      try {
        const data = await getBlueprintById();
        const edges = data.edges?.map((edge) => ({ ...edge, id: `${edge.source}-${edge.target}` })) ?? [];

        setActionBlueprint({ ...data, edges });
      } catch (error) {
        console.error('Failed to fetch journey data:', error);
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
      <ReactFlow nodes={actionBlueprint.nodes} edges={actionBlueprint.edges} nodeTypes={nodeTypes}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
