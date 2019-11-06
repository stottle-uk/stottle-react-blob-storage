import React from 'react';
import { BlobSharedViewStateService } from '../services/BlobSharedViewState';
import { BlobStorageService } from '../services/BlobStorageService';
import { BlobUploadsViewStateService } from '../services/BlobUploadsViewState';
import { SasGeneratorService } from '../services/SasGeneratorService';

const blobStorage = new BlobStorageService();
const sasGenerator = new SasGeneratorService();
const sharedViewState = new BlobSharedViewStateService(
  sasGenerator,
  blobStorage
);
const uploadsViewState = new BlobUploadsViewStateService(
  blobStorage,
  sharedViewState
);

export const sharedViewStateContext = React.createContext(sharedViewState);
export const uploadsViewStateContext = React.createContext(uploadsViewState);
