import { Component, OnInit } from '@angular/core';
import {
  MonoTypeOperatorFunction,
  Observable,
  of,
  OperatorFunction,
  pipe,
} from 'rxjs';
import { mergeMap, take, tap } from 'rxjs/operators';

import { ColumnItem } from '../models/column-item.interface';
import { RepositoryResponse } from '../models/repository-response.interface';

@Component({
  template: '',
})
export abstract class RepositoryListBase {
  public repositoryList: RepositoryResponse[] = [];
  public repositoryList$: Observable<RepositoryResponse[]>;
  public abstract title: string;
  public abstract repositorySource$: Observable<RepositoryResponse[]>;
  public abstract listOfColumns: ColumnItem<RepositoryResponse>[];

  constructor() {}

  repositoryListPipe(): MonoTypeOperatorFunction<RepositoryResponse[]> {
    return pipe(
      mergeMap((repositoryList) => {
        repositoryList.forEach((repository) =>
          this.setOperationTranslated(repository)
        );
        return of(repositoryList);
      })
    );
  }

  loadRepositoryList(
    op1: OperatorFunction<RepositoryResponse[], RepositoryResponse[]>
  ): void {
    this.repositoryList$ = this.repositorySource$
      .pipe(take(1))
      .pipe(this.repositoryListPipe())
      .pipe(tap((repositoryList) => (this.repositoryList = repositoryList)))
      .pipe(op1);
  }

  private setOperationTranslated(repository: RepositoryResponse): void {
    switch (repository.operation) {
      case 'Insert':
        repository.operation = 'Inserção';
        break;
      case 'Update':
        repository.operation = 'Atualização';
        break;
      case 'Delete':
        repository.operation = 'Exclusão';
        break;
      default:
        repository.operation = 'Nenhum';
        break;
    }
  }
}
