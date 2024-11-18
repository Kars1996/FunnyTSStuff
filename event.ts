type EventMap = {
    click: { x: number; y: number };
    keypress: { key: string };
};

type EventCallback<E extends keyof EventMap> = (event: EventMap[E]) => void;

const handleEvent = <E extends keyof EventMap>(
    event: E,
    callback: EventCallback<E>
): void => {
    const mockEvent = {} as EventMap[E];
    callback(mockEvent);
};

handleEvent("click", (event) => {
    console.log(event.x, event.y);
});

handleEvent("keypress", (event) => {
    console.log(event.key);
});
