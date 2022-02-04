import { TestBed } from '@angular/core/testing';
import { BpmAddModule } from './bpm-add.module';

describe('BpmAddModule', () => {
  let pipe: BpmAddModule;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [BpmAddModule] });
    pipe = TestBed.inject(BpmAddModule);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
