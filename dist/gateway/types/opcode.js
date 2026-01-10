export var OpCode;
(function (OpCode) {
    OpCode[OpCode["Dispatch"] = 0] = "Dispatch";
    OpCode[OpCode["Heartbeat"] = 1] = "Heartbeat";
    OpCode[OpCode["Identify"] = 2] = "Identify";
    OpCode[OpCode["Resume"] = 6] = "Resume";
    OpCode[OpCode["Reconnect"] = 7] = "Reconnect";
    OpCode[OpCode["InvalidSession"] = 9] = "InvalidSession";
    OpCode[OpCode["Hello"] = 10] = "Hello";
    OpCode[OpCode["HeartbeatACK"] = 11] = "HeartbeatACK"; // 	Sent in response to receiving a heartbeat to acknowledge that it has been received. 
})(OpCode || (OpCode = {}));
