import { Subject } from 'rxjs';

const ApiEvents$ = new Subject();

ApiEvents$.subscribe((event) => console.log(event));

export { ApiEvents$ };
