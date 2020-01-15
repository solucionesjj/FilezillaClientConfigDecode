import { Component } from '@angular/core';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fccd';

  textInXml: string;
  servers: any;
  columns: any = [];

  constructor(private ngxXml2jsonService: NgxXml2jsonService) {
  }

  convert() {
    const parser = new DOMParser();
    const xml = parser.parseFromString(this.textInXml, 'text/xml');
    const obj = this.ngxXml2jsonService.xmlToJson(xml);
    this.servers = obj['FileZilla3']['Servers']['Server'].map((server) => {
      return {
        name: server.Name, 
        host: server.Host, 
        port: server.Port,
        user: server.User,
        pass : atob(server.Pass),
        pasvMode: server.PasvMode
      }
    });
    this.columns = Object.keys(this.servers[0]);
  }

}
