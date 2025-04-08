import { useEffect, useState } from 'react';
import { getBlueprintById } from '../api/actionBlueprint.api';
import { ActionBlueprint } from '../models/actionBlueprint.model';
import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export default function JourneyBuilder() {
  const [actionBlueprint, setActionBlueprint] = useState<ActionBlueprint>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlueprint = async () => {
      try {
        setLoading(true);
        const data = await getBlueprintById();

        const normalizedEdges = data.edges?.map((edge) => ({
          ...edge,
          id: `${edge.source}-${edge.target}`,
        }));

        setActionBlueprint({
          ...data,
          edges: normalizedEdges ?? [],
        });

        console.log('Fetched blueprint:', data);
      } catch (error) {
        console.error('Failed to fetch journey data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlueprint();
  }, []);

  if (loading) return <>Loading blueprint...</>;

  return (
    <div style={{ height: '100%' }}>
      <ReactFlow nodes={actionBlueprint?.nodes} edges={actionBlueprint?.edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
