import { BlobItem } from '@azure/storage-blob';
import React, { useContext, useEffect, useState } from 'react';
import { tap } from 'rxjs/operators';
import { sharedViewStateContext } from '../contexts/viewStateContext';

const ItemsList: React.FC = () => {
  const context = useContext(sharedViewStateContext);
  const [items, setItems] = useState<BlobItem[]>([]);

  const getContainersEffect = () => {
    const sub = context.itemsInContainer$
      .pipe(tap(items => setItems(items)))
      .subscribe();

    return () => sub.unsubscribe();
  };
  useEffect(getContainersEffect, []);

  // const onContainerClick = (name: string) => context.getContainerItems(name);

  return (
    <div className="items-list">
      {items.map((item, i) => (
        <div key={i}>
          <span>{item.name}</span>|<span>{item.properties.contentLength}</span>|
          <span>{item.properties.lastModified.toISOString()}</span>
        </div>
      ))}
    </div>
  );
};

export default ItemsList;
