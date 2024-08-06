enum ObserveableActionType {
  created = 'created',
  deleted = 'deleted',
  completed = 'completed',
}

interface IObserver<T> {
  update(data: T, action: ObserveableActionType): void;
}

interface INotifier<T> {
  notify(data: T, action: ObserveableActionType): void;
}

interface IObservable<T> {
  attach(observer: IObserver<T>): void;
  detach(observer: IObserver<T>): void;
}

export { ObserveableActionType };

export type { INotifier, IObservable, IObserver };
