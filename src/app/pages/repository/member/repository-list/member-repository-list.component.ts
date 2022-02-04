import { Component, OnInit } from '@angular/core';
import { NzTableFilterList } from 'ng-zorro-antd/table';
import { tap } from 'rxjs/operators';

import { ColumnItem } from '../../models/column-item.interface';
import { RepositoryResponse } from '../../models/repository-response.interface';
import { RepositoryListBase } from '../../repository-list-base/repository-list-base';
import { ColumnTypeEnum } from './../../models/column-type.enum';
import { MemberRepositoryFacade } from './../member-repository.facade';

@Component({
  selector: 'app-member-repository-list',
  templateUrl: '../../repository-list-base/repository-list-base.component.html',
  styleUrls: ['../../repository-list-base/repository-list-base.component.css'],
})
export class MemberRepositoryListComponent
  extends RepositoryListBase
  implements OnInit
{
  public listOfColumns: ColumnItem<RepositoryResponse>[] = [];
  public title: string = 'Associados Lista';
  public repositorySource$ = this.memberRepositoryFacade.getAllAsync();

  private get nameColumn(): ColumnItem<RepositoryResponse> {
    return this.factoryMemberColumn('Nome', 'name', 25);
  }

  private get personIdentifierColumn(): ColumnItem<RepositoryResponse> {
    return this.factoryMemberColumn('Documento', 'personIdentifier', 15, false);
  }

  private get birthDayColumn(): ColumnItem<RepositoryResponse> {
    return this.factoryMemberColumn(
      'Data Nascimento',
      'birthDay',
      10,
      false,
      ColumnTypeEnum.Date
    );
  }

  private get operationColumn(): ColumnItem<RepositoryResponse> {
    return this.factoryBaseColumn(
      'Operação',
      (repositoryResponse: RepositoryResponse) => repositoryResponse.operation,
      [
        { text: 'Inserção', value: 'Inserção' },
        { text: 'Atualização', value: 'Atualização' },
        { text: 'Exclusão', value: 'Exclusão' },
      ],
      10,
      ColumnTypeEnum.Tag
    );
  }

  private get createdOnColumn(): ColumnItem<RepositoryResponse> {
    return this.factoryBaseColumn(
      'Criado em',
      (repositoryResponse: RepositoryResponse) => repositoryResponse.createdOn,
      [],
      12,
      ColumnTypeEnum.Date
    );
  }

  private get updatedOnColumn(): ColumnItem<RepositoryResponse> {
    return this.factoryBaseColumn(
      'Atualizado em',
      (repositoryResponse: RepositoryResponse) => repositoryResponse.updatedOn,
      [],
      12,
      ColumnTypeEnum.Date
    );
  }

  private get removedOnColumn(): ColumnItem<RepositoryResponse> {
    return this.factoryBaseColumn(
      'Removido em',
      (repositoryResponse: RepositoryResponse) => repositoryResponse.removedOn,
      [],
      12,
      ColumnTypeEnum.Date
    );
  }

  constructor(private memberRepositoryFacade: MemberRepositoryFacade) {
    super();
  }

  ngOnInit(): void {
    this.onAfterLoadingData();
  }

  private onAfterLoadingData(): void {
    this.loadRepositoryList(tap(_ => this.buildListOfColumns()));
  }

  private buildListOfColumns(): void {
    this.listOfColumns = [
      this.nameColumn,
      this.personIdentifierColumn,
      this.birthDayColumn,
      this.operationColumn,
      this.createdOnColumn,
      this.updatedOnColumn,
      this.removedOnColumn,
    ];
  }

  private factoryMemberColumn(
    columnName: string,
    columnProperty: string,
    columnWidth: number,
    useFilter = true,
    columnType = ColumnTypeEnum.String
  ): ColumnItem<RepositoryResponse> {
    return this.factoryBaseColumn(
      columnName,
      (repositoryResponse: RepositoryResponse) =>
        repositoryResponse.after.member[columnProperty],
      useFilter ? this.factoryListOfFilter(columnProperty) : [],
      columnWidth,
      columnType
    );
  }

  private factoryBaseColumn(
    columnName: string,
    columnPath: (repositoryResponse: RepositoryResponse) => any,
    listOfFilter: NzTableFilterList,
    columnWidth = 30,
    columnType = ColumnTypeEnum.String
  ): ColumnItem<RepositoryResponse> {
    return {
      name: columnName,
      width: columnWidth,
      sortOrder: null,
      sortFn: (
        currentRepositoryResponse: RepositoryResponse,
        nextRepositoryResponse: RepositoryResponse
      ) =>
        columnPath(currentRepositoryResponse).localeCompare(
          columnPath(nextRepositoryResponse)
        ),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter,
      filterFn: (list: string[], repositoryResponse: RepositoryResponse) =>
        list.some(
          (name) => columnPath(repositoryResponse).indexOf(name) !== -1
        ),
      showFilter: Boolean(listOfFilter.length),
      rowContent: columnPath,
      type: columnType,
      tagColor: this.factoryTagColor,
    };
  }

  private factoryListOfFilter(columnProperty: string): NzTableFilterList {
    return this.repositoryList.map((repository) => ({
      text: repository.after.member[columnProperty],
      value: repository.after.member[columnProperty],
    }));
  }

  private factoryTagColor(repositoryResponse: RepositoryResponse): string {
    switch (repositoryResponse.operation) {
      case 'Inserção':
        return 'green';
      case 'Atualização':
        return 'blue';
      case 'Exclusão':
        return 'purple';
      default:
        return 'gold';
    }
  }
}
