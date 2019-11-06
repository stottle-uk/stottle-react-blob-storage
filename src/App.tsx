import React from 'react';
import BlobUploads from './azure-storage/components/BlobUploads';
import ContainerList from './azure-storage/components/ContainerList';
import FileInput from './azure-storage/components/FileInput';
import ItemsDownloaded from './azure-storage/components/ItemsDownloaded';
import ItemsList from './azure-storage/components/ItemsList';

const App: React.FC = () => {
  return (
    <div className="App">
      <ContainerList />
      <hr />
      <FileInput />
      <BlobUploads />
      <hr />
      <ItemsList />
      <hr />
      <ItemsDownloaded />
    </div>
  );
};

export default App;
