import { BehaviorSubject, Observable } from 'rxjs';

export interface StoreBase<T> {
    objectStore$: BehaviorSubject<T>;
    get snapshot(): T;

    consumer(): Observable<T>;
    publisher(object: T);
}