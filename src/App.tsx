import React from 'react';
import ContainerList from './azure-storage/components/ContainerList';
import InputFile from './azure-storage/components/InputFile';
import ItemsDeleted from './azure-storage/components/ItemsDeleted';
import ItemsDownloaded from './azure-storage/components/ItemsDownloaded';
import ItemsList from './azure-storage/components/ItemsList';
import ItemsUploaded from './azure-storage/components/ItemsUploaded';
import SelectedContainer from './azure-storage/components/SelectedContainer';

const App: React.FC = () => {
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>stottle-react-blob-storage</h1>
      </div>

      <ContainerList />
      <hr />
      <SelectedContainer className="container">
        <InputFile />
        <ItemsList />
        <div className="item-details">
          <ItemsUploaded />
          <ItemsDownloaded />
          <ItemsDeleted />
        </div>
      </SelectedContainer>
    </>
  );
};

export default App;
