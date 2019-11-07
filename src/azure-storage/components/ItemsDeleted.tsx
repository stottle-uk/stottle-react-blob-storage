import React, { useContext, useEffect, useState } from 'react';
import { tap } from 'rxjs/operators';
import { DeletesViewStateContext } from '../contexts/viewStateContext';
import { BlobItem } from '../types/azure-storage';

const ItemsDeleted: React.FC = () => {
  const context = useContext(DeletesViewStateContext);
  const [items, setItems] = useState<BlobItem[]>([]);

  const getDownloadedItems = () => {
    const sub = context.deletedItems$
      .pipe(tap(items => setItems(items)))
      .subscribe();

    return () => sub.unsubscribe();
  };
  useEffect(getDownloadedItems, []);

  return (
    <div className="items-deleted">
      <h3>Deletes</h3>

      {items.map((item, i) => (
        <pre key={i}>{JSON.stringify(item, undefined, 2)}</pre>
      ))}
    </div>
  );
};

export default ItemsDeleted;
