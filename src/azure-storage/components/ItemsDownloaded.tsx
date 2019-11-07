import React, { useContext, useEffect, useState } from 'react';
import { tap } from 'rxjs/operators';
import { DownloadsViewStateContext } from '../contexts/viewStateContext';
import { BlobItemDownload } from '../types/azure-storage';

const ItemsDownloaded: React.FC = () => {
  const context = useContext(DownloadsViewStateContext);
  const [items, setItems] = useState<BlobItemDownload[]>([]);

  const getDownloadedItems = () => {
    const sub = context.downloadedItems$
      .pipe(tap(items => setItems(items)))
      .subscribe();

    return () => sub.unsubscribe();
  };
  useEffect(getDownloadedItems, []);

  return (
    <div className="items-downloaded">
      <h3>Downloads</h3>

      {items.map((item, i) => (
        <div key={i}>
          {item.containerName}:
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {item.filename}
          </a>
        </div>
      ))}
    </div>
  );
};

export default ItemsDownloaded;
