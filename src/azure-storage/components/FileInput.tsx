import React, { useContext } from 'react';
import { uploadsViewStateContext } from '../contexts/viewStateContext';

const FileInput: React.FC = () => {
  const context = useContext(uploadsViewStateContext);

  const uploadFiles = (files: FileList | null) =>
    files && context.uploadItems(files);

  return (
    <div className="App">
      <input
        type="file"
        multiple={true}
        onChange={e => uploadFiles(e.target.files)}
      />
    </div>
  );
};

export default FileInput;
