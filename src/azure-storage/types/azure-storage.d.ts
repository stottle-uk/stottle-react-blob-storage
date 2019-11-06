import { BlobServiceClient } from '@azure/storage-blob';

export interface BlobItem {
  filename: string;
  containerName: string;
}

export interface BlobItemDownload extends BlobItem {
  url: string;
}

export interface BlobItemUpload extends BlobItem {
  progress: number;
}

export interface BlobStorageRequest {
  storageUri: string;
  storageAccessToken: string;
}

export interface BlobContainerRequest extends BlobStorageRequest {
  containerName: string;
}

export interface BlobFileRequest extends BlobContainerRequest {
  filename: string;
}

export type Dictionary<T> = { [key: string]: T };

export type BlobStorageClientFactory = (
  options: BlobStorageRequest
) => BlobServiceClient;
