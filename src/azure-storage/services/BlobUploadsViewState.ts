import { from, OperatorFunction, Subject } from 'rxjs';
import { map, mergeMap, startWith, switchMap } from 'rxjs/operators';
import { BlobContainerRequest, BlobItemUpload } from '../types/azure-storage';
import { BlobSharedViewStateService } from './BlobSharedViewState';
import { BlobStorageService } from './BlobStorageService';

export class BlobUploadsViewStateService {
  private uploadQueueInner$ = new Subject<FileList>();

  uploadedItems$ = this.uploadQueue$.pipe(
    mergeMap(file => this.uploadFile(file)),
    this.blobState.scanEntries()
  );

  get uploadQueue$() {
    return this.uploadQueueInner$
      .asObservable()
      .pipe(mergeMap(files => from(files)));
  }

  constructor(
    private blobStorage: BlobStorageService,
    private blobState: BlobSharedViewStateService
  ) {}

  uploadItems(files: FileList): void {
    this.uploadQueueInner$.next(files);
  }

  private uploadFile = (file: File) =>
    this.blobState.getStorageOptionsWithContainer().pipe(
      switchMap(options =>
        this.blobStorage
          .uploadToBlobStorage(file, {
            ...options,
            filename: file.name + new Date().getTime()
          })
          .pipe(
            this.mapUploadResponse(file, options),
            this.blobState.finaliseBlobChange(options.containerName)
          )
      )
    );

  private mapUploadResponse = (
    file: File,
    options: BlobContainerRequest
  ): OperatorFunction<number, BlobItemUpload> => source =>
    source.pipe(
      map(progress => ({
        filename: file.name,
        containerName: options.containerName,
        progress: parseInt(((progress / file.size) * 100).toString(), 10)
      })),
      startWith({
        filename: file.name,
        containerName: options.containerName,
        progress: 0
      })
    );
}
