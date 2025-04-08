import { useContext } from 'react';
import JourneyBuilderContext from '../context/JourneyBuilderContext';

export default function useJourneyBuilder() {
  const context = useContext(JourneyBuilderContext);

  if (context === undefined) throw new Error('!ERROR!: useJourneyBuilder must be used within a JourneyBuilderProvider');

  return context;
}
