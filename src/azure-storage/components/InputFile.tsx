import React, { useContext } from 'react';
import { uploadsViewStateContext } from '../contexts/viewStateContext';

const InputFile: React.FC = () => {
  const context = useContext(uploadsViewStateContext);

  const uploadFiles = (files: FileList | null) =>
    files && context.uploadItems(files);

  return (
    <div className="input-file">
      <input
        type="file"
        multiple={true}
        onChange={e => uploadFiles(e.target.files)}
      />
    </div>
  );
};

export default InputFile;
