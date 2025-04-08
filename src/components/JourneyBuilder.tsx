import { useEffect, useState } from 'react';
import { getBlueprintById } from '../api/actionBlueprint.api';
import { ActionBlueprint } from '../models/actionBlueprint.model';

export default function JourneyBuilder() {
  const [actionBlueprint, setActionBlueprint] = useState<ActionBlueprint>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getBlueprint = async () => {
      setLoading(true);
      try {
        const data = await getBlueprintById();
        setActionBlueprint(data);
      } catch (error) {
        console.error('Failed to fetch journey data', error);
      } finally {
        setLoading(false);
      }
    };
    getBlueprint();
  }, []);

  if (loading) return <>Loading blueprint...</>;

  return (
    <>
      <div>{JSON.stringify(actionBlueprint)}</div>
    </>
  );
}
