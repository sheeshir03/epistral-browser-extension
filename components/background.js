chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message, sender); 
    sendResponse("Message from extension ServiceWorker");
  });