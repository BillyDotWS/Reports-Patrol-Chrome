const reportURL = 'https://reportspatrol.mineplex.com/update_punishments.php'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    submitReport(request, sender.tab.id)
})

async function submitReport({offender, offence, category, severity, status}, tabId) {
    let cookieQuery = {url: 'https://reportspatrol.mineplex.com', name: 'PHPSESSID'}
    let cookie = await chrome.cookies.get(cookieQuery)
    if(!cookie) {
        chrome.tabs.sendMessage(tabId, {
            success: false, 
            msg: 'No cookie found for Reports Patrol'
        })
        return
    }
    
    let options = {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            cookie: `${cookie.name}=${cookie.value}`
        },
        body: new URLSearchParams({
            punishment_offender: offender,
            punishment_offense: offence,
            punishment_category: category,
            punishment_severity: severity,
            punishment_status: status,
            punishment_id: '',
            operation: 'Add'
        })
    }

    try {
        let response = await fetch(reportURL, options)
        if(!response.ok) throw new Error(response.status)

        chrome.tabs.sendMessage(tabId, {
            success: true, 
            msg: await response.text()
        })
    } 
    catch (error) {
        console.log(error)
        if(error.message) chrome.tabs.sendMessage(tabId, {success: false, msg: error.message})
        else chrome.tabs.sendMessage(tabId, {success: false, msg: error})
    }
}