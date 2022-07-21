import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient : HttpClient) { }

  saveFile(data : any) {
    return this.httpClient.post<any>("http://localhost:3000/fileDetails/", data);
  }

  getAllFilesData() {
    return this.httpClient.get<any>("http://localhost:3000/fileDetails/");
  }

  update(data: any, fileNumber : any) {
    return this.httpClient.put<any>("http://localhost:3000/fileDetails/" + fileNumber, data);
  }

  delete(id : any) {
    return this.httpClient.delete<any>("http://localhost:3000/fileDetails/" + id);
  }
}
