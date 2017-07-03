import { Injectable } from '@angular/core';
import { Division } from './division';
import { DIVISIONS } from './mock-divisions';

@Injectable()
export class DivisionService {
  getDivisions(): Promise<Division[]> {
    return Promise.resolve(DIVISIONS);
  }

  getDivisionsSlowly(): Promise<Division[]> {
  return new Promise(resolve => {
    // Simulate server latency with 2 second delay
    setTimeout(() => resolve(this.getDivisions()), 2000);
  });
  }
}
