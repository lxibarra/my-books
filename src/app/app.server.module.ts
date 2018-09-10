import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { RouterModule } from '@angular/router';

import { appRoutes } from './routes';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    AppModule,
    ServerModule,
    ModuleMapLoaderModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppServerModule { }
