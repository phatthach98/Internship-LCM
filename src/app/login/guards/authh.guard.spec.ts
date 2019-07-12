import { TestBed, async, inject } from '@angular/core/testing';

import { AuthhGuard } from './authh.guard';

describe('AuthhGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthhGuard]
    });
  });

  it('should ...', inject([AuthhGuard], (guard: AuthhGuard) => {
    expect(guard).toBeTruthy();
  }));
});
