import React, { createContext, useContext, useState, useCallback } from 'react';

interface Checkpoint {
  id: string;
  timestamp: number;
  description: string;
  data: any;
}

interface CheckpointContextType {
  checkpoints: Checkpoint[];
  currentCheckpoint: number;
  createCheckpoint: (description: string, data: any) => void;
  rollback: (steps?: number) => void;
  canRollback: boolean;
}

const CheckpointContext = createContext<CheckpointContextType | undefined>(undefined);

export const CheckpointProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [currentCheckpoint, setCurrentCheckpoint] = useState(-1);

  const createCheckpoint = useCallback((description: string, data: any) => {
    const newCheckpoint: Checkpoint = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      description,
      data,
    };

    setCheckpoints(prev => [...prev.slice(0, currentCheckpoint + 1), newCheckpoint]);
    setCurrentCheckpoint(prev => prev + 1);
  }, [currentCheckpoint]);

  const rollback = useCallback((steps: number = 1) => {
    if (currentCheckpoint >= steps - 1) {
      setCurrentCheckpoint(prev => prev - steps);
    }
  }, [currentCheckpoint]);

  const value = {
    checkpoints,
    currentCheckpoint,
    createCheckpoint,
    rollback,
    canRollback: currentCheckpoint >= 0,
  };

  return (
    <CheckpointContext.Provider value={value}>
      {children}
    </CheckpointContext.Provider>
  );
};

export const useCheckpoint = () => {
  const context = useContext(CheckpointContext);
  if (context === undefined) {
    throw new Error('useCheckpoint must be used within a CheckpointProvider');
  }
  return context;
};