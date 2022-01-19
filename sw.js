const reportURL = 'https://reportspatrol.mineplex.com/update_punishments.php'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let cookieQuery = {url: 'https://reportspatrol.mineplex.com', name: 'PHPSESSID'}
    chrome.cookies.get(cookieQuery, cookie => sendResponse(cookie))
    return true
})