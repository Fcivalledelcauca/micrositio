import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { event } from 'jquery';

import { Subscription } from 'rxjs';
import { filter,map } from 'rxjs/operators';

@Component({
  selector: 'app-broadcrumbs',
  templateUrl: './broadcrumbs.component.html',
  styleUrls: ['./broadcrumbs.component.css']
})
export class BroadcrumbsComponent implements  OnDestroy, OnInit {

  public titulo:string='';
  public subtitulo:string='';
  public tituloSubs$: Subscription;
  constructor(private router: Router,private route: ActivatedRoute ) { 
    this.tituloSubs$ = this.getArgumentRuta()
                        .subscribe(({titulo,subtitulo})=>{
                          this.titulo=titulo;
                          this.subtitulo=subtitulo;
                          localStorage.setItem('titulo',titulo)
                          localStorage.setItem('subtitulo',subtitulo)
                          if(subtitulo==''){
                            this.subtitulo=titulo
                          }
                          document.title=`fundaprogreso ${subtitulo}`;
                        })
    if (!this.titulo){
      this.titulo = localStorage.getItem('titulo')!;
    }                        
    if(!this.subtitulo){
      this.subtitulo=localStorage.getItem('subtitulo')!;
    }else{
        if (localStorage.getItem('subtitulo')==''){
          this.subtitulo = this.titulo;
        }
    }
          
  }
   
  getArgumentRuta(){
    /*return this.router.events
              .pipe(
                filter(event=>event instanceof ActivationEnd),
                filter((event:ActivationEnd)=> event.snapshot.firstChild===null),
                map((event:ActivationEnd)=>event.snapshot.data)
             );*/
   return this.router.events
          .pipe(
            filter(event=>event instanceof ActivationEnd),
            filter((event:any)=>event.snapshot.firstChild===null),
            map((event:any)=>event.snapshot.data)
          );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

}
