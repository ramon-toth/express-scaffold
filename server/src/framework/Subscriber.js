// Subscriber class to create new even subscribers
// Constructor takes a higher order observable
//----------------------------------------------------------------
//
import { filter, mergeAll } from 'rxjs/operators/api.js';

export class Subscriber {
    constructor(subject$) {
        this.outerSubject$ = subject$;
        this._flatten();
        this.init();
    }

    // Flatten Higher Order Observable
    // Override this method to replace mergeAll()
    _flatten() {
        this.subject$ = this.outerSubject$.pipe(mergeAll());
    }

    // pass function to filter and subscribe to the result
    filter(func) {
        return this.subject$.pipe(filter(func));
    }

    init() {
        console.log('Warning: A subscriber class has no initialized subscriptions');

        // Subscribe to this.subject$ or filters by passing a filter function

        // this.subject$.subscribe(this.subscriber);
        // this.filter((x) => x.payload).subscribe(this.subscriber);
    }

    // Define subscribers like so
    // subscriber = {
    //   next(x) {
    //     console.log(x);
    //   },
    //   error(err) {
    //     console.log(err);
    //   },
    //   complete() {
    //     console.log('complete');
    //   }
    // };
}