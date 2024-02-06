"use strict";

class PubSubClient {
  constructor(onMessageReceivedCallback) {
    this.connected = false;
    this.onMessageReceivedCallback = onMessageReceivedCallback;
  }

  async connect(identity, uniqueID) {
    if (this.connected) return;

    this.metadata = { uniqueID: uniqueID, ...identity };

    const ably = new Ably.Realtime.Promise({
      authUrl: "/api/createTokenRequest",
    });
    this.channel.subscribe((message) => {
      this.onMessageReceivedCallback(message.data, this.data);
    });

    this.connected = true;
  }

  sendMessage(message, targetClientId) {
    if (!this.connected) {
      throw "Client is not connected";
    }

    message.metadata = this.metadata;
    message.forClientId = targetClientId ? targetClientId : null;
    this.channel.publish({ name: "myMessageName", data: message });
  }
}
