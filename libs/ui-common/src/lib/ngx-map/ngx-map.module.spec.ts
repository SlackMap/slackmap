import { NgxMapModule } from './ngx-map.module';

describe('NgmapModule', () => {
  let ngmapModule: NgxMapModule;

  beforeEach(() => {
    ngmapModule = new NgxMapModule();
  });

  it('should create an instance', () => {
    expect(ngmapModule).toBeTruthy();
  });
});
