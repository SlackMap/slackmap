/**
 * Helper class for creating Subcriptions bucket to unsubscribe all at onece
 */
export interface Subscription {
  unsubscribe(): void;
}
export interface Observable {
  subscribe(options: any): Subscription;
}
export class SubSink {

  private subscriptions = [];

  set add(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  set subscribe(observable: Observable) {
    this.subscriptions.push(observable.subscribe({
      error: () => {}
    }));
  }

  unsubscribe(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
