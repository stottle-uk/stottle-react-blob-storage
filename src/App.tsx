import React from 'react';
import BlobUploads from './azure-storage/components/BlobUploads';
import ContainerList from './azure-storage/components/ContainerList';
import FileInput from './azure-storage/components/FileInput';
import ItemsDeleted from './azure-storage/components/ItemsDeleted';
import ItemsDownloaded from './azure-storage/components/ItemsDownloaded';
import ItemsList from './azure-storage/components/ItemsList';
import SelectedContainer from './azure-storage/components/SelectedContainer';

const App: React.FC = () => {
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>stottle-react-blob-storage</h1>
      </div>

      <ContainerList />
      <hr />
      <div className="container">
        <SelectedContainer>
          <FileInput />
          <ItemsList />
          <div className="item-details">
            <BlobUploads />
            <ItemsDownloaded />
            <ItemsDeleted />
          </div>
        </SelectedContainer>
      </div>
    </>
  );
};

export default App;
