// src/components/FormNode.tsx
import { Handle, Position, useEdges } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { BlueprintNode } from '../models/actionBlueprint.model';
import { Card, CardContent, Typography } from '@mui/material';
import { useCallback } from 'react';
import useJourneyBuilder from '../hooks/useJourneyBuilder';

export default function FormNode(props: NodeProps<BlueprintNode>) {
  const { setSelectedNode } = useJourneyBuilder();
  
  const edges = useEdges();
  const hasIncomingEdge = edges.some((edge) => edge.target === props.id);
  const hasOutgoingEdge = edges.some((edge) => edge.source === props.id);
  
  
  const handleCardClick = useCallback(() => {
    setSelectedNode(props);
  }, [props, setSelectedNode]);

  return (
    <>
      {hasIncomingEdge && <Handle type="target" position={Position.Left} />}

      <Card
        sx={{ minWidth: 200, cursor: 'pointer', '&:hover': { boxShadow: 6, borderColor: 'white', borderWidth: '1px', borderStyle: 'solid' } }}
        onClick={handleCardClick}
      >
        <CardContent>
          <Typography variant="h6" component="div" noWrap>
            {props.data.name}
          </Typography>
          <Typography variant="body2">{hasIncomingEdge ? `Inputs: ${edges.filter((edge) => edge.target === props.id).length}` : 'No inputs'}</Typography>
          <Typography variant="body2">{hasOutgoingEdge ? `Outputs: ${edges.filter((edge) => edge.source === props.id).length}` : 'No outputs'}</Typography>
        </CardContent>
      </Card>

      {hasOutgoingEdge && <Handle type="source" position={Position.Right} />}
    </>
  );
}
