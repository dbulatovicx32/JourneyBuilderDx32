import { Handle, Position, useEdges } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import { BlueprintNode } from '../models/actionBlueprint.model';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
export default function ActionBlueprintFormNode(props: NodeProps<BlueprintNode>) {
  const edges = useEdges();
  const showTargetEdge = edges.find((edge) => edge.target === props.id);
  const showSourceEdge = edges.find((edge) => edge.source === props.id);

  console.log('props', props);
  console.log('edges', edges);

  return (
    <div>
      {showTargetEdge && <Handle type="target" position={Position.Left} />}

      <Card sx={{ height: '100%' }}>
        <CardContent>{props.data.name}</CardContent>
      </Card>

      {showSourceEdge && <Handle type="source" position={Position.Right} />}
    </div>
  );
}
