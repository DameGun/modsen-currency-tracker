import { Component } from 'react';

import type { INotifier, IObservable, IObserver } from '@/types/observable';
import { ObserveableActionType } from '@/types/observable';

export default class Observable<T> extends Component implements IObservable<T>, INotifier<T> {
  observers: IObserver<T>[];

  constructor(props: object) {
    super(props);
    this.observers = [];
    this.attach = this.attach.bind(this);
    this.detach = this.detach.bind(this);
    this.notify = this.notify.bind(this);
  }

  attach(observer: IObserver<T>) {
    const isExist = this.observers.includes(observer);

    if (!isExist) {
      this.observers.push(observer);
    }
  }

  detach(observer: IObserver<T>) {
    const observerIndex = this.observers.indexOf(observer);

    if (observerIndex !== -1) {
      this.observers.splice(observerIndex, 1);
    }
  }

  notify(data: T, action: ObserveableActionType) {
    for (const observer of this.observers) {
      observer.update(data, action);
    }
  }
}
