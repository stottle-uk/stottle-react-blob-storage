import React from 'react';

const Header: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>stottle-react-blob-storage</h1>
      <div>
        Medium Article:{' '}
        <a
          href="https://medium.com/@stuarttottle/upload-to-azure-blob-storage-with-react-34f37805fdfc"
          target="_blank"
          rel="noopener noreferrer"
        >
          Upload to Azure Blob Storage with React
        </a>
      </div>
      <div>
        Github:{' '}
        <a
          href="https://github.com/stottle-uk/stottle-react-blob-storage"
          target="_blank"
          rel="noopener noreferrer"
        >
          stottle-react-blob-storage
        </a>
      </div>
    </div>
  );
};

export default Header;
