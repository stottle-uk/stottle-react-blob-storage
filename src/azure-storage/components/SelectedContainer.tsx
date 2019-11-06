import React, { useContext, useEffect, useState } from 'react';
import { tap } from 'rxjs/operators';
import { sharedViewStateContext } from '../contexts/viewStateContext';

const SelectedContainer: React.FC<React.HTMLProps<HTMLDivElement>> = ({
  children
}) => {
  const context = useContext(sharedViewStateContext);
  const [containerName, setContainerName] = useState<string>();

  const setSelectedContainer = () => {
    const sub = context.selectedContainer$
      .pipe(tap(name => setContainerName(name)))
      .subscribe();

    return () => sub.unsubscribe();
  };
  useEffect(setSelectedContainer, []);

  return containerName ? (
    <>
      <h2>Container Files: {containerName}</h2>
      {children}
    </>
  ) : (
    <></>
  );
};

export default SelectedContainer;
