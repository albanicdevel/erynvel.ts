<p align="center">
  <img src="assets/erynvelicon.png" width="300">
</p>

> This package means a lot more to me than just creating another library for Discord in js. It doesn't have any special advantages, or why you should use it, it's just unusual, it's new. Below are a couple of examples of its use

```ts
import {
    Client,
    Events,
    Ready
} from "erynvel";

const client = new Client("", 513);

client.gateway.on(Events.ready, (d: Ready) => {
    console.log(`session_id: ${d.session_id}`);
});

client.login();
```