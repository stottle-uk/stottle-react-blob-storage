import { BlobItem } from "@azure/storage-blob";
import React, { useContext, useEffect, useState } from "react";
import { tap } from "rxjs/operators";
import {
  DeletesViewStateContext,
  DownloadsViewStateContext,
  SharedViewStateContext,
} from "../contexts/viewStateContext";

interface profile {
  user: string;
}

const ItemsList: React.FC<profile> = (props) => {
  const sharedContext = useContext(SharedViewStateContext);
  const downloadsContext = useContext(DownloadsViewStateContext);
  const deletesContext = useContext(DeletesViewStateContext);
  const [items, setItems] = useState<BlobItem[]>([]);
  const { user } = props;
  const [access, setAccess] = useState<Boolean>(false);

  useEffect(() => {
    if (user === "VENDOR") {
      setAccess(false);
    } else {
      setAccess(true);
    }
  }, [user]);

  const getContainerItemsEffect = () => {
    const sub = sharedContext.itemsInContainer$
      .pipe(tap((items) => setItems(items)))
      .subscribe();

    return () => sub.unsubscribe();
  };
  useEffect(getContainerItemsEffect, []);

  return (
    <div className="items-list">
      {access ? (
        items.map((item, i) => (
          <div key={i}>
            <span>{item.name}</span>
            <span>{item.properties.contentLength}</span>
            <span>{item.properties.lastModified.toISOString()}</span>
            <div>
              <button onClick={() => downloadsContext.downloadItem(item.name)}>
                Download
              </button>
              <button onClick={() => deletesContext.deleteItem(item.name)}>
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ItemsList;
