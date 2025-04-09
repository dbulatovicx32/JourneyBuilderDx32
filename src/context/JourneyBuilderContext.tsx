import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import { ActionBlueprint, BlueprintNode, BlueprintForm, PrefillMapping } from "../models/actionBlueprint.model";
import { NodeProps } from "@xyflow/react";

type NodeMappings = {
  [nodeId: string]: PrefillMapping;
};

type JourneyBuilderContextType = {
  actionBlueprint: ActionBlueprint | null;

  selectedNode: NodeProps<BlueprintNode> | null;
  setSelectedNode: Dispatch<SetStateAction<NodeProps<BlueprintNode> | null>>;
  
  selectedForm: BlueprintForm | null;
  setSelectedForm: Dispatch<SetStateAction<BlueprintForm | null>>;
  
  prefillMappings: NodeMappings;
  setPrefillMapping: (nodeId: string, fieldId: string, mapping: PrefillMapping[string] | null) => void;
  getPrefillMapping: (nodeId: string) => PrefillMapping | undefined;
};

const JourneyBuilderContext = createContext<JourneyBuilderContextType | undefined>(undefined);

export default JourneyBuilderContext;