import {
  BehaviorSubject,
  MonoTypeOperatorFunction,
  Observable,
  OperatorFunction
} from 'rxjs';
import {
  filter,
  finalize,
  map,
  scan,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';
import {
  BlobContainerRequest,
  BlobItem,
  BlobStorageRequest,
  Dictionary
} from '../types/azure-storage';
import { BlobStorageService } from './BlobStorageService';
import { SasGeneratorService } from './SasGeneratorService';

export class BlobSharedViewStateService {
  private selectedContainerInner$ = new BehaviorSubject<string>('');

  containers$ = this.getStorageOptions().pipe(
    switchMap(options => this.blobStorage.getContainers(options))
  );
  itemsInContainer$ = this.selectedContainer$.pipe(
    filter(containerName => !!containerName),
    switchMap(containerName =>
      this.getStorageOptions().pipe(
        switchMap(options =>
          this.blobStorage.listBlobsInContainer({
            ...options,
            containerName
          })
        )
      )
    )
  );

  get selectedContainer$() {
    return this.selectedContainerInner$.asObservable();
  }

  constructor(
    private sasGenerator: SasGeneratorService,
    private blobStorage: BlobStorageService
  ) {}

  getContainerItems(containerName: string): void {
    this.selectedContainerInner$.next(containerName);
  }

  finaliseBlobChange = <T>(
    containerName: string
  ): MonoTypeOperatorFunction<T> => source =>
    source.pipe(
      finalize(
        () =>
          this.selectedContainerInner$.value === containerName &&
          this.selectedContainerInner$.next(containerName)
      )
    );

  scanEntries = <T extends BlobItem>(): OperatorFunction<T, T[]> => source =>
    source.pipe(
      map(item => ({
        [`${item.containerName}-${item.filename}`]: item
      })),
      scan<Dictionary<T>>(
        (items, item) => ({
          ...items,
          ...item
        }),
        {}
      ),
      map(items => Object.values(items))
    );

  getStorageOptionsWithContainer(): Observable<BlobContainerRequest> {
    return this.getStorageOptions().pipe(
      withLatestFrom(this.selectedContainer$),
      map(([options, containerName]) => ({ ...options, containerName }))
    );
  }

  private getStorageOptions(): Observable<BlobStorageRequest> {
    return this.sasGenerator.getSasToken();
  }
}
