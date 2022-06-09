## Usage

You could define a method that trigger a vue event by `Emit` decorator.

The decorator received an optional event name paramater. Event will be triggered with this name and the returned value. If the parameter is omitted, use method's name as event name.

[](./code-usage.ts ':include :type=code typescript')

## Asynchronous event

If one event method returns a promise, Event will be triggered after the promise resolved with the promise value.

[](./code-asynchronous.ts ':include :type=code typescript')