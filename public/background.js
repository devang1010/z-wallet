// background.js
// This is where we'll store our wallet data
let walletData = {
  address: "Add account or reload" // Default address for testing
};

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_WALLET_ADDRESS") {
    // Return the current wallet address
    sendResponse({ address: walletData.address });
  }
  
  // For a more complete implementation, you would handle more message types here
  // For example, to update the address when the user selects a different account
  if (message.type === "UPDATE_WALLET_ADDRESS") {
    walletData.address = message.address;
    sendResponse({ success: true });
  }
  
  return true; // Required for async response
});