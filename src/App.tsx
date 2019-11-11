import React from 'react';
import ContainerList from './azure-storage/components/ContainerList';
import InputFile from './azure-storage/components/InputFile';
import ItemsDeleted from './azure-storage/components/ItemsDeleted';
import ItemsDownloaded from './azure-storage/components/ItemsDownloaded';
import ItemsList from './azure-storage/components/ItemsList';
import ItemsUploaded from './azure-storage/components/ItemsUploaded';
import SelectedContainer from './azure-storage/components/SelectedContainer';
import Header from './layout/Header';

const App: React.FC = () => (
  <>
    <Header />
    <hr />
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

export default App;
