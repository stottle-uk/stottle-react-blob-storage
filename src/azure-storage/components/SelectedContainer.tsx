import React, { useContext, useEffect, useState } from 'react';
import { tap } from 'rxjs/operators';
import { SharedViewStateContext } from '../contexts/viewStateContext';

const SelectedContainer: React.FC<React.HTMLProps<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  const context = useContext(SharedViewStateContext);
  const [containerName, setContainerName] = useState<string>();

  const setSelectedContainer = () => {
    const sub = context.selectedContainer$
      .pipe(tap(name => setContainerName(name)))
      .subscribe();

    return () => sub.unsubscribe();
  };
  useEffect(setSelectedContainer, []);

  return containerName ? (
    <div {...rest}>
      <h2>Container Files: {containerName}</h2>
      {children}
    </div>
  ) : (
    <></>
  );
};

export default SelectedContainer;
