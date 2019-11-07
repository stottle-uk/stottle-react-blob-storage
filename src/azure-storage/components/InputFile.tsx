import React, { useContext, useRef } from 'react';
import { UploadsViewStateContext } from '../contexts/viewStateContext';

const InputFile: React.FC = () => {
  const context = useContext(UploadsViewStateContext);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const uploadFiles = (files: FileList | null) =>
    files && context.uploadItems(files);

  const showFileDialog = () =>
    inputFileRef.current && inputFileRef.current.click();

  return (
    <div className="input-file">
      <input
        style={{ display: 'none' }}
        ref={inputFileRef}
        type="file"
        multiple={true}
        onChange={e => uploadFiles(e.target.files)}
      />
      <button onClick={() => showFileDialog()}>
        Click here to Upload File
      </button>
    </div>
  );
};

export default InputFile;
