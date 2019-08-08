chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "fill") {
        const activeElement = document.activeElement
        activeElement.value = request.password
    }
});