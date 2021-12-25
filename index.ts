import './style.css';

import { of, map, Observable } from 'rxjs';
import { fromEvent, exhaustMap, takeUntil } from 'rxjs';

of('World')
  .pipe(map((name) => `Hello, ${name}!`))
  .subscribe(console.log);

// Open the console in the bottom right to see results.
// make it different

const target = document.getElementById("try-me");
target.setAttribute(
  'style',
  'position: absolute; top: 0; left: 0; background-color: red; width: 50px; height: 50px;'
);
document.body.append(target);

fromEvent(target, 'mousedown')
  .pipe(
    exhaustMap(() =>
      fromEvent(document, 'mousemove').pipe(
        takeUntil(fromEvent(document, 'mouseup'))
      )
    )
  )
  .subscribe(({ pageX, pageY }: MouseEvent) => {
    target.style.transform = `translate3d(${pageX}px, ${pageY}px, 0)`;
  });
