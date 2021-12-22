import { Injectable } from '@angular/core';
import {HttpClient} from  '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private socket: Socket) {}

  sendOrder() {
    this.socket.emit('nueva-orden');
  }
  getSteps() {
    return this.socket.fromEvent('step').pipe(map((data) =>data));
  }
}
