import { BlobDeleteResponse } from '@azure/storage-blob';
import { OperatorFunction, Subject } from 'rxjs';
import { map, mergeMap, startWith, switchMap } from 'rxjs/operators';
import { BlobContainerRequest, BlobItem } from '../types/azure-storage';
import { BlobSharedViewStateService } from './BlobSharedViewState';
import { BlobStorageService } from './BlobStorageService';

export class BlobDeletesViewStateService {
  private deleteQueueInner$ = new Subject<string>();

  deletedItems$ = this.deleteQueue$.pipe(
    mergeMap(filename => this.deleteFile(filename)),
    this.blobState.scanEntries()
  );

  get deleteQueue$() {
    return this.deleteQueueInner$.asObservable();
  }

  constructor(
    private blobStorage: BlobStorageService,
    private blobState: BlobSharedViewStateService
  ) {}

  deleteItem(filename: string): void {
    this.deleteQueueInner$.next(filename);
  }

  private deleteFile = (filename: string) =>
    this.blobState.getStorageOptionsWithContainer().pipe(
      switchMap(options =>
        this.blobStorage
          .deleteBlobItem({
            ...options,
            filename
          })
          .pipe(
            this.mapDeleteResponse(filename, options),
            this.blobState.finaliseBlobChange(options.containerName)
          )
      )
    );

  private mapDeleteResponse = (
    filename: string,
    options: BlobContainerRequest
  ): OperatorFunction<BlobDeleteResponse, BlobItem> => source =>
    source.pipe(
      map(() => ({
        filename,
        containerName: options.containerName
      })),
      startWith({
        filename,
        containerName: options.containerName
      })
    );
}
