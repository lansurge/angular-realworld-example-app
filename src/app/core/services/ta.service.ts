import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ApiService } from './api.service';
import { WebsocketService } from './websocket.service';

const WATCHING_SYMBOLS = ['BTCUSDT', 'EOSBTC', 'BNBBTC', 'XRPBTC', 'LTCBTC'];
const INTERVALS = ['1d', '30m', '1h', '4h'];

@Injectable()
export class TaService {
  public ticker: Array<any> = [];
  symbolIndex = -1;
  intervalIndex = -1;
  symbols: Array<any>;

  constructor(private api: ApiService, private ws: WebsocketService) {
    this.ticker = this.initSymbols();
  }

  initSymbols() {
    return _.map(WATCHING_SYMBOLS, (s) => {
      return {
        name: s,
        series: this.initSeriesData({ s: s, c: 0, E: moment().format('x') })
      };
    });
  }

  initSeriesData(s) {
    const time = moment(s.E);
    const timeVal = time.format('HHmmss');
    const array = [];
    for (let i = 0; i < 20; i++) {
      array.push(this.decorateSymbol(s));
    }
    return array;
  }

  decorateSymbol(s) {
    return s;
  }
}
