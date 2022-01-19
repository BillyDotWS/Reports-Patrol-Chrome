try {
    let sidebar = document.querySelector('.sidebar')
    let texts = document.querySelector('.messageText').innerText.split('\n').filter(i => i.length)
    let ruleBreaker = texts.find(txt => txt.startsWith('Name of Rule Breaker(s):'))?.split(':')?.[1].trim()
    let brokenRule = texts.find(txt => txt.startsWith('Broken Rule'))?.split(':')?.[1].trim()
    
    sidebar.insertAdjacentHTML(
        'beforeend',
        `<div class="section widget-single">
            <div class="secondaryContent widget sidebar-widget WidgetFramework_WidgetRenderer_Threads">
                <h3 style="background-color: #1e252f;width: 102%;height: 150%;margin-left: -4%; padding: 6pt !important;
    margin-right: 100p;/* margin-bottom: 0pt !important; */border-bottom: 4px solid rgb(250, 159, 1);">Report Actions</h3>
                <div class="options">
                    <button class="button success ext-mark-accepted">✔ Mark Accepted</button>
                    <button class="button danger ext-mark-denied">❌ Mark Denied</button>
                    <button class="button primary ext-mark-bedrock">Mark Bedrock</button>
                    <button class="button primary ext-mark-no-evidence">No Evidence</button>
                    <button class="button primary ext-show-options">Options</button>
                </div>
                <strong class="ext-form-title">Add Punishment</strong>
                <hr>
                <div class="ext-form-container">
                    <div class="ext-form-row">
                        <label>Offender</label>
                        <input type="text" value="${ruleBreaker}" id="ext-offender">
                    </div>
                    <div class="ext-form-row">
                        <label>Offence</label>
                        <input type="text" value="${brokenRule}" id="ext-offence">
                    </div>
                    <div class="ext-form-row">
                        <label>Category</label>
                        <select id="ext-category">
                            <option value="1">Chat Offense</option>
                            <option value="2">General Offense</option>
                            <option value="3">Client Mod</option>
                        </select>
                    </div>
                    <div class="ext-form-row">
                        <label>Severity</label>
                        <select id="ext-severity">
                            <option value="1">Severity 1</option>
                            <option value="2">Severity 2</option>
                            <option value="3">Severity 3</option>
                            <option value="4">Permanent</option>
                        </select>
                    </div>
                    <div class="ext-form-row">
                        <label>Status</label>
                        <select id="ext-status">
                            <option value="1">Accepted</option>
                            <option value="2">Rejected</option>
                            <option value="3">Incorrect</option>
                        </select>
                    </div>
                    <div class="ext-form-row">
                        <div class="ext-alert ext-hidden"></div>
                        <button class="add-punishment-btn">Add</button>
                    </div>
                </div>
            </div>
        </div>`
    )

    document.querySelector('.add-punishment-btn').onclick = reportPunishment
    document.querySelector('.ext-mark-bedrock').onclick = markBedrock
    document.querySelector('.ext-mark-no-evidence').onclick = markNoEvidence
    document.querySelector('.ext-show-options').onclick = showOptions
} 
catch (error) {
    console.log(error)
    notify(error.message, false)
}

function showOptions() {
    let menu = document.querySelector("#XenForoUniq1")
    if(menu) menu.style = 'display: block; visibility: visible; left: 594.391px; top: 465.828px;'
}

function markNoEvidence() {
    let linkItem = document.querySelector('a[href$="moderation_macro_id=99"]')
    if(!linkItem) return notify('Option not found', false)

    linkItem.click()

    setTimeout(() => {
        let macroForm = document.querySelector('form[action$="apply-moderation-macro"]')
        if(!macroForm) return notify('Evidence popup not found', false)

        macroForm.submit()
    }, 100)
}

function markBedrock() {
    let linkItem = document.querySelector('a[href$="moderation_macro_id=289"]')
    if(!linkItem) return notify('Option not found', false)

    linkItem.click()

    setTimeout(() => {
        let macroForm = document.querySelector('form[action$="apply-moderation-macro"]')
        if(!macroForm) return notify('Bedrock popup not found', false)

        macroForm.submit()
    }, 100)
}

function notify(txt, ok = true) {
    let extAlert = document.querySelector('.ext-alert')
    extAlert.innerHTML = txt
    extAlert.classList.remove('ext-hidden')

    if(ok) {
        extAlert.classList.add('ext-alert-ok')
        extAlert.classList.remove('ext-alert-error')
    }
    else {
        extAlert.classList.add('ext-alert-error')
        extAlert.classList.remove('ext-alert-ok')
    }

    setTimeout(() => {
        extAlert.innerText = ''
        extAlert.classList.add('ext-hidden')
    }, 3000)
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    notify(request.msg, request.success)
})

function reportPunishment() {
    let offender = document.querySelector('#ext-offender').value
    let offence = document.querySelector('#ext-offence').value
    let category = document.querySelector('#ext-category').value
    let severity = document.querySelector('#ext-severity').value
    let status = document.querySelector('#ext-status').value

    chrome.runtime.sendMessage({
        offender, 
        offence, 
        category, 
        severity, 
        status
    })
}
