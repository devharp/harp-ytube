const socket = io();
const videolink_element = document.querySelector('div > #videolink');
const video = document.querySelector('#from-server');
let fetched_data = null;
let selected_fmt = null;

const loading_component = '<div class="loader" style="width: 50px;">\
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" stroke="#fff"\
    style="background: none;">\
    <g fill="none" fill-rule="evenodd" stroke-width="2">\
        <circle cx="22" cy="22" r="1" stroke="black">\
            <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline"\
                keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" />\
            <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0"\
                calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1"\
                repeatCount="indefinite" />\
        </circle>\
        <circle cx="22" cy="22" r="1" stroke="black">\
            <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline"\
                keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite" />\
            <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0"\
                calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1"\
                repeatCount="indefinite" />\
        </circle>\
    </g>\
</svg>\
</div>';

function init() {

    socket.on('connection', () => {
        console.log('found socketio server')
    });
    socket.on('video-info', data => {
        console.log(data);
        console.log(data.player_response.videoDetails);
        const videodetails = data.player_response.videoDetails;

        video.innerHTML = '<div class="d-flex justify-content-center my-2"><img style="width: ' + (document.querySelector('.container').clientWidth - 50) + 'px" src="' + String(videodetails.thumbnail.thumbnails[0].url) + '"\
        alt="image"></div>\
<div>\
    <p>' + String(videodetails.title) + '</p>\
</div>\
<div class="d-flex">\
    <div class="dropdown">\
        <a class="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"\
            data-mdb-toggle="dropdown" aria-expanded="false">\
            Quality\
        </a>\
\
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">' +
            getQuality(data.formats) + '\
            \
        </ul>\
    </div>\
    <button onclick="downloadSelectedItag()" class="btn btn-primary mx-2">Download</button>\
</div>'
    });
}
function getQuality(fmt) {
    fetched_data = fmt;
    let formats = [];
    let i = 0;
    for (e of fmt) {
        let type = '';
        if (e.hasVideo && e.hasAudio) {
            type = e.qualityLabel;
            type += ' (video and audio) ';
            type += e.container;

        }
        else if (e.hasVideo) {
            type = e.qualityLabel;
            type += ' (video only) ';
            type += e.container;
        }
        else if (e.hasAudio) {
            type = e.audioQuality;
            type += '(audio only) ';
        }

        formats.push({ type, itag: e.itag, i });
        i += 1;
    }
    // console.log();
    let html_formats = '';
    for (const e of formats) {
        html_formats += '<li onclick="qualitySelected(' + e.itag + ', ' + e.i + ')" class="dropdown-item">' + e.type + '</li>\n';
    }
    // return '<li onclick="qualitySelected(22)" class="dropdown-item">Action</li>';
    return html_formats;

}

function btnClicked() {
    try {
        const link = videolink_element.value
        if (link.length > 0) {
            socket.emit('request-video-info', link);
            video.innerHTML = loading_component;
        }
    }
    catch (e) {
        console.log('error name: ', e.name);
        console.log('error message: ', e.message);
    }
}

function qualitySelected(itag, i) {
    document.querySelector('#from-server #dropdownMenuLink').innerHTML = i;
    console.log('user selected: ', itag);
    selected_fmt = itag;
}

function downloadSelectedItag() {
    if (selected_fmt === null) {
        return;
    }
    console.log('selected_fmt: ', selected_fmt);
    const vidurl = fetched_data.filter(e => e.itag === selected_fmt)[0].url;
    window.open(vidurl, '_blank');

}

init();