import React, { useContext, useEffect, useState } from 'react';
import { tap } from 'rxjs/operators';
import { UploadsViewStateContext } from '../contexts/viewStateContext';
import { BlobItemUpload } from '../types/azure-storage';

const ItemsUploaded: React.FC = () => {
  const context = useContext(UploadsViewStateContext);
  const [items, setItems] = useState<BlobItemUpload[]>([]);

  const getUploadsEffect = () => {
    const sub = context.uploadedItems$
      .pipe(tap(items => setItems(items)))
      .subscribe();

    return () => sub.unsubscribe();
  };
  useEffect(getUploadsEffect, []);

  return (
    <div className="items-uploaded">
      <h3>Uploads</h3>

      {items.map((item, i) => (
        <pre key={i}>{JSON.stringify(item, undefined, 2)}</pre>
      ))}
    </div>
  );
};

export default ItemsUploaded;
