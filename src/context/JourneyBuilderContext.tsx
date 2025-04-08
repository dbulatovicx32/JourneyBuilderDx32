import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import { ActionBlueprint, BlueprintNode } from "../models/actionBlueprint.model";
import { NodeProps } from "@xyflow/react";

type JourneyBuilderContextType = {
  actionBlueprint: ActionBlueprint | null;
  selectedNode: NodeProps<BlueprintNode> | null;
  setSelectedNode: Dispatch<SetStateAction<NodeProps<BlueprintNode> | null>>;
};

const JourneyBuilderContext = createContext<JourneyBuilderContextType | undefined>(undefined);

export default JourneyBuilderContext;