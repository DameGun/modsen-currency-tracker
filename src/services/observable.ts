import { Component } from 'react';

import { ObserveableActionType } from '@/types/observable';

export interface IObserver<T> {
  update(data: T, action: ObserveableActionType): void;
}

export interface INotifier<T> {
  notify(data: T, action: ObserveableActionType): void;
}

export interface IObservable<T> {
  attach(observer: IObserver<T>): void;
  detach(observer: IObserver<T>): void;
}

export default class Observable<T> extends Component implements IObservable<T>, INotifier<T> {
  observers: IObserver<T>[];

  constructor(props: object) {
    super(props);
    this.observers = [];
    this.attach = this.attach.bind(this);
    this.detach = this.detach.bind(this);
    this.notify = this.notify.bind(this);
  }

  attach(observer: IObserver<T>): void {
    const isExist = this.observers.includes(observer);

    if (!isExist) {
      this.observers.push(observer);
    }
  }

  detach(observer: IObserver<T>): void {
    const observerIndex = this.observers.indexOf(observer);

    if (observerIndex !== -1) {
      this.observers.splice(observerIndex, 1);
    }
  }

  notify(data: T, action: ObserveableActionType): void {
    for (const observer of this.observers) {
      observer.update(data, action);
    }
  }
}
