// Inform the page that the Z-Wallet extension is available
window.postMessage({ type: "Z_WALLET_AVAILABLE" }, "*");

// Listen for messages from the web page
window.addEventListener("message", (event) => {
  // Only accept messages from the same window
  if (event.source !== window) return;
  
  // Handle connect wallet request
  if (event.data.type === "CONNECT_Z_WALLET") {
    // Ask our background script for the wallet address
    chrome.runtime.sendMessage({ type: "GET_WALLET_ADDRESS" }, (response) => {
      // Forward the address back to the webpage
      window.postMessage({
        type: "Z_WALLET_RESPONSE",
        address: response.address,
        connected: true
      }, "*");
    });
  }
});

// Also inform the page when the script has loaded
console.log("Z-Wallet extension content script loaded");