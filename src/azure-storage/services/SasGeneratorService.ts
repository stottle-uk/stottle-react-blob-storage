import { Axios } from 'axios-observable';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlobStorageRequest } from '../types/azure-storage';

export class SasGeneratorService {
  getSasToken(): Observable<BlobStorageRequest> {
    return Axios.get<BlobStorageRequest>(
      'https://stottle-blob-storage-api.azurewebsites.net/api/GenerateSasToken'
    ).pipe(map(res => res.data));
  }
}
