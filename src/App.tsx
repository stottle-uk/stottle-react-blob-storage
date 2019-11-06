import React from 'react';
import BlobUploads from './azure-storage/components/BlobUploads';
import FileInput from './azure-storage/components/FileInput';

const App: React.FC = () => {
  return (
    <div className="App">
      <FileInput />
      <BlobUploads />
    </div>
  );
};

export default App;
