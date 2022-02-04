import { ActivatedRoute, Router } from '@angular/router';

export abstract class RepositoryViewBase<T> {
  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected resource: string
  ) {}

  private get isInsert(): boolean {
    return (this.record as any).operation === 'Insert';
  }

  public get record(): T {
    return this.activatedRoute.snapshot?.data.record;
  }

  public get before(): string {
    return this.isInsert
      ? ''
      : JSON.stringify((this.record as any).before, null, '\t');
  }

  public get after(): string {
    return JSON.stringify((this.record as any).after, null, '\t');
  }

  public get title(): string {
    return (this.record as any).after[this.resource].name;
  }

  public onBack(): void {
    this.router.navigate(['container', 'repository', this.resource, 'list']);
  }
}
