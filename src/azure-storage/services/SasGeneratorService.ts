import { Axios } from "axios-observable";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BlobStorageRequest } from "../types/azure-storage";

export class SasGeneratorService {
  getSasToken(): Observable<BlobStorageRequest> {
    return Axios.get<BlobStorageRequest>(
      "https://testfunctiontokenreturn.azurewebsites.net/api/httptriggertoken",
    ).pipe(map((res) => res.data));
  }
}
