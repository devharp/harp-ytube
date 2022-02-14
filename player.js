/*const info = require('./vid-test.json');

let data = [];
data.push(info.player_response.streamingData.formats);
data.push(info.player_response.streamingData.adaptiveFormats);


console.log('formats: ');
for(const e of data[0]){
    console.log('itag: ', e.itag, '\tquality: ', e.qualityLabel, ' \tmime: ', e.mimeType);
}
console.log('adaptive stream formats: ');
for(const e of data[1]){
    console.log('itag: ', e.itag, '\tquality: ', e.qualityLabel, ' \tmime: ', e.mimeType);

}*/

// console.log(data[1]);

const ytdl = require('ytdl-core');
const fs = require('fs');
const lnk = 'https://www.youtube.com/watch?v=aWzlQ2N6qqg';

ytdl.getInfo('aWzlQ2N6qqg').then(function (info) {

    const json_info = JSON.stringify(info);
    fs.writeFileSync('vid-test2.json', json_info);
    console.log('done');
});
// const json_info  = JSON.stringify(info);
// fs.writeFileSync('vid-test2.json', json_info);
// console.log('done');