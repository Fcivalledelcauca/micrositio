import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 
'application/vnd.openxmlfromats-officedocument.spreadsheethtml.sheet; charset=UTF-8';
const EXCEL_EXT='.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportexcelService {

  constructor() { }

  exporTOExcel(json: any[],excelFileName: string){
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: {'data': worksheet},
      SheetNames:['data']
    };
    const excelBuffer: any=XLSX.write(workbook,{bookType:'xlsx',type:'array'});
    //call to method
    this.saveAsExcel(excelBuffer,excelFileName);

  }

  private saveAsExcel(buffer:any,filesName:string):void{
    const data:Blob= new Blob([buffer], { type:EXCEL_TYPE});
    FileSaver.saveAs(data,filesName + '_export_'+ EXCEL_EXT)
  }
}


