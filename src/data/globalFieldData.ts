import { GlobalDataSource } from '../models/actionBlueprint.model';

// Static global data sources that are always available
export const GLOBAL_DATA_SOURCES: Record<string, GlobalDataSource> = {
  action: {
    id: 'global_action',
    name: 'Action Properties',
    fields: {
      status: { type: 'string', title: 'Status' },
      created_at: { type: 'string', title: 'Created At' },
      updated_at: { type: 'string', title: 'Updated At' },
    }
  },
  client: {
    id: 'global_client',
    name: 'Client Organisation Properties',
    fields: {
      name: { type: 'string', title: 'Organisation Name' },
      industry: { type: 'string', title: 'Industry' },
      postalCode: { type: 'string', title: 'Postal Code' },
    }
  }
};

export default GLOBAL_DATA_SOURCES;