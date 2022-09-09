import { TreeNode } from 'primeng/api';
import { TreeviewItem } from 'ngx-treeview';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http: HttpClient) { }

  getFilesystem() {
    return this.http.get<any>('assets/docs/filesystem.json')
      .toPromise()
      .then(res => <TreeNode[]>res.data);
  }


}
