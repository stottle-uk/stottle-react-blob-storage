import React, { useContext, useEffect, useState } from "react";
import { tap } from "rxjs/operators";
import { UploadsViewStateContext } from "../contexts/viewStateContext";
import { BlobItemUpload } from "../types/azure-storage";

const ItemsUploaded: React.FC = () => {
  const context = useContext(UploadsViewStateContext);
  const [items, setItems] = useState<BlobItemUpload[]>([]);

  const getUploadsEffect = () => {
    const sub = context.uploadedItems$
      .pipe(tap((items) => setItems(items)))
      .subscribe();

    return () => sub.unsubscribe();
  };
  useEffect(getUploadsEffect, []);

  //   const css = `.upload-table{width: 100%}
  // .table-div{width:100%;display: table-header-group}`;
  return (
    <div className="items-list">
      {/* <style>{css}</style> */}
      <h3>Uploads</h3>
      <table>
        <tr>
          <th>Filename</th>
          <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <th>Storage Location</th>
          <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <th>Progress Percentage</th>
        </tr>
        {items.map((item, i) => (
          <tr>
            <td>
              {JSON.stringify(item.filename, undefined, 2).replace(/\"/g, "")}
            </td>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
            <td>
              {JSON.stringify(item.containerName, undefined, 2).replace(
                /\"/g,
                "",
              )}
            </td>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
            <td>{JSON.stringify(item.progress, undefined, 2)}</td>
            <pre key={i}></pre>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ItemsUploaded;

// {items.map((item, i) => (
//   <pre key={i}>{JSON.stringify(item, undefined, 2)}</pre>
// ))}
