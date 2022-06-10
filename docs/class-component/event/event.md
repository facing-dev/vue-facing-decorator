## Usage

You could define a method which triggers a vue event by `Emit` decorator.

The decorator received an optional event name paramater. Event will be triggered with this name and the method returned value. If the event name parameter is omitted, use method's name by default.

[](./code-usage.ts ':include :type=code typescript')

## Asynchronous event

If one event method returns a promise, Event will be triggered after the promise resolved with the promise value.

[](./code-asynchronous.ts ':include :type=code typescript')