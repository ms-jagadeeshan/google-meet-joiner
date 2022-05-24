const DISABLE_VIDEO = true;
const DISABLE_AUDIO = true;
const AUTO_JOIN = true;

const LEAVE_MEET_AFTER_TIMEOUT = true;
const MEET_TIMEOUT = 56;  //in minutes


//gets all div, and scraps it to buttons list, and returns it
const getButtonList = () => {
    const node_list = document.getElementsByTagName('div');
    const button_list = [];
    for (let i = 0; i < node_list.length; i = i + 1) {
        if (node_list[i].getAttribute('role') === 'button') { button_list.push(node_list[i]); }
    }
    const b_list = document.getElementsByTagName('button');
    for (let i = 0; i < b_list.length; i = i + 1) {
        button_list.push(b_list[i]);
    }
    return button_list;
}

//finds buttons to mute audio, video and join, and does appropriate action
const main = () => {
    const button_list = getButtonList();
    const button_map = {
        video: null,
        audio: null,
        join: null
    }
    button_list.forEach(button => {
        const aria_label = button.getAttribute('aria-label')
        if (button.innerText === 'Join now') {
            button_map.join = button;
        } else if (aria_label && ~aria_label.toLowerCase().indexOf('+ d')) {
            button_map.audio = button;
        } else if (aria_label && ~aria_label.toLowerCase().indexOf('+ e')) {
            button_map.video = button;
        }
    })


    if (DISABLE_VIDEO)
        button_map.video.click()

    if (DISABLE_AUDIO)
        button_map.audio.click()

    if (AUTO_JOIN && button_map.audio && button_map.video)
        button_map.join && button_map.join.click();

};

//checks whether page loaded
const checkLoad = () => {
    const divs = document.getElementsByTagName('div')
    let loaded = true
    for (let i = 0; i < divs.length; i += 1) {
        if (divs[i].getAttribute('data-loadingmessage') === 'Loading...') { // :/
            loaded = false
        }
    }
    return loaded
}

//finds leave button and clicks it
const endMeet = () => {
    const button_list = document.getElementsByTagName('button');
    const button_map = {
        leaveCall: null
    }
    for (let i = 0; i < button_list.length; i++) {
        if (button_list[i].getAttribute('aria-label') === 'Leave call') {
            button_map.leaveCall = button_list[i]
        }
    }
    if (LEAVE_MEET_AFTER_TIMEOUT)
        button_map.leaveCall.click()
}

//If page loaded calls the main function
const interval_check = setInterval(() => {
    const button_list = getButtonList()
    if (checkLoad()) {

        clearInterval(interval_check)
        setTimeout(() => main(), 500)

    }
}, 100)

setTimeout(function () {
    endMeet()
}, 1000 * 60 * MEET_TIMEOUT);



// document.querySelector('.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.HNeRed.M9Bg4d').click()
// document.querySelector('.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.HNeRed.M9Bg4d').click()
// document.querySelector('.uArJ5e.UQuaGc.Y5sE8d.uyXBBb.xKiqt').click()
// document.querySelector('.VfPpkd-Bz112c-LgbsSe.yHy1rc.eT1oJ.tWDL4c.jh0Tpd.Gt6sbf.QQrMi.ftJPW').click()