import { ContainerItem } from "@azure/storage-blob";
import React, { useContext, useEffect, useState } from "react";
import { tap } from "rxjs/operators";
import { SharedViewStateContext } from "../contexts/viewStateContext";

interface profile {
  user: string;
}

const ContainerList: React.FC<profile> = (props) => {
  const context = useContext(SharedViewStateContext);
  const [items, setItems] = useState<ContainerItem[]>([]);
  const [access, setAccess] = useState<Boolean>(false);

  const { user } = props;
  const getContainersEffect = () => {
    const sub = context.containers$
      .pipe(tap((items) => setItems(items)))
      .subscribe();

    return () => sub.unsubscribe();
  };
  useEffect(getContainersEffect, []);
  useEffect(() => {
    if (user === "VENDOR") {
      setAccess(false);
    } else {
      setAccess(true);
    }
  }, [user]);
  // const onContainerClick = (name: string) => context.getContainerItems(name);
  const onContainerClick = (name: string) => {
    context.getContainerItems(name);
  };

  return (
    <div className="container-list">
      <h3>Projects</h3>
      {access ? (
        items.map((item, i) => (
          <div key={i}>
            {item.name}
            <button onClick={() => onContainerClick(item.name)}>View</button>
          </div>
        ))
      ) : (
        <div>
          Welcome Supplier!
          {onContainerClick("upload")}
        </div>
      )}
    </div>
  );
};

export default ContainerList;
