import { Component, Input, OnInit, Output, ViewChild,EventEmitter, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { DropzoneComponent, DropzoneDirective,
  DropzoneConfigInterface } from 'ngx-dropzone-wrapper';


@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css']
})
export class DropzoneCtrlComponent implements OnInit, OnChanges, DoCheck {

  files: File[] = [];

  
  public type: string = 'component';

  public disabled: boolean = false;

  @Input('configDropzone') config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    uploadMultiple:true,
    dictRemoveFile: 'Eliminar archivo',
    addRemoveLinks:true
  };


  @Input('limpiar') clear:boolean=false;
  @Output() resFiles: EventEmitter<File[]> = new EventEmitter()





  @ViewChild(DropzoneComponent, { static: false }) componentRef?: DropzoneComponent;
  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;


  constructor() { }
  ngDoCheck(): void {
    this.resetDropzoneUploads();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //cuendo se limpia todo el formulario se aplica el reseteo de 
    //el dropzone***************
    if(changes.clear.currentValue){
      this.resetDropzoneUploads();
    }
  }


  public toggleType(): void {
    this.type = (this.type === 'component') ? 'directive' : 'component';
  }

  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  public toggleAutoReset(): void {
    this.config.autoReset = this.config.autoReset ? null : 5000;
    this.config.errorReset = this.config.errorReset ? null : 5000;
    this.config.cancelReset = this.config.cancelReset ? null : 5000;
  }

  public toggleMultiUpload(): void {
    this.config.maxFiles = this.config.maxFiles ? 0 : 1;
  }

  public toggleClickAction(): void {
    this.config.clickable = !this.config.clickable;
  }

  public resetDropzoneUploads(): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.reset();
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.reset();
    }
  }

  public onUploadInit(args: any): void {
    //console.log('onUploadInit:', args.files);
    //args.files=[]
  }

  public onUploadError(args: any): void {
    //console.log('onUploadError:', args);
  }

  public onUploadSuccess(args: any): void {
		this.files.push(args[0]);
    this.resFiles.emit(this.files);
  }

  public onRemove(arg: File):void{
    
    this.files = this.files.filter((ev:File)=>{
       return ev.name!==arg.name
    })
    this.resFiles.emit(this.files);
  }

  public limpiar(arg:boolean){
    if (arg){
      this.files=[]
      this.resFiles.emit(this.files);
    }
  }

}
