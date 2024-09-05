type Message = { action: string; payload: any };

export const sendMessageToRN = (message: Message) => {
  if (!window.ReactNativeWebView) return;
  window.ReactNativeWebView.postMessage(JSON.stringify(message));
};
