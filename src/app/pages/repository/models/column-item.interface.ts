import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { ColumnTypeEnum } from './column-type.enum';

export interface ColumnItem<T> {
  name: string;
  width: number;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<T> | null;
  sortDirections: NzTableSortOrder[];
  listOfFilter: NzTableFilterList;
  showFilter: boolean;
  filterFn: NzTableFilterFn<T> | null;
  filterMultiple: boolean;
  rowContent: (instance: T) => string;
  type: ColumnTypeEnum;
  tagColor?: (instance: T) => string;
}
