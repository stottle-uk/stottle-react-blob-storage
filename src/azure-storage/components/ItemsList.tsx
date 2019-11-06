import { BlobItem } from '@azure/storage-blob';
import React, { useContext, useEffect, useState } from 'react';
import { tap } from 'rxjs/operators';
import {
  deletesViewStateContext,
  downloadsViewStateContext,
  sharedViewStateContext
} from '../contexts/viewStateContext';

const ItemsList: React.FC = () => {
  const sharedContext = useContext(sharedViewStateContext);
  const downloadsContext = useContext(downloadsViewStateContext);
  const deletesContext = useContext(deletesViewStateContext);
  const [items, setItems] = useState<BlobItem[]>([]);

  const getContainerItemsEffect = () => {
    const sub = sharedContext.itemsInContainer$
      .pipe(tap(items => setItems(items)))
      .subscribe();

    return () => sub.unsubscribe();
  };
  useEffect(getContainerItemsEffect, []);

  const onDownloadClick = (filename: string) =>
    downloadsContext.downloadItem(filename);

  const onDeletedClick = (filename: string) =>
    deletesContext.deleteItem(filename);

  return (
    <div className="items-list">
      {items.map((item, i) => (
        <div key={i}>
          <span>{item.name}</span>
          <span>{item.properties.contentLength}</span>
          <span>{item.properties.lastModified.toISOString()}</span>
          <div>
            <button onClick={() => onDownloadClick(item.name)}>Download</button>
            <button onClick={() => onDeletedClick(item.name)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemsList;
