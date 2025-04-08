import { ActionBlueprint } from '../models/actionBlueprint.model';

export async function getBlueprintById(tenantId: string = '123', blueprintId: string = 'bp_456'): Promise<ActionBlueprint> {
  try {
    const host = import.meta.env.VITE_HOST_URL;
    const url = `${host}/api/v1/${tenantId}/actions/blueprints/${blueprintId}/graph`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to get Blueprint: ${response.status}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error getting Blueprint: ', error);
    throw error;
  }
}
