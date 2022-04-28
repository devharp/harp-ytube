const fs = require('fs');
const http = require('https');

function httpGetReq(host, path) {
    return new Promise((resolve, reject) => {
        const options = {
            host,
            path,
            port: 443,
            method: 'GET'
        }
        const req = http.request(options, (res) => {
            if (res.statusCode < 200 || res.statusCode >= 300) { return reject(new Error('status code: ', res.statusCode)); }
            let body = [];
            res.on('data', (chunk) => { body.push(chunk); });
            res.on('end', () => {
                try {
                    body = Buffer.concat(body).toString();
                } catch (e) { reject(e); }
                resolve(body);
            });
        });
        req.on('error', (e) => { reject(e) });
        req.end();
    });
}

function getResults(query) {


    return new Promise((resolve, reject) => {
        httpGetReq('www.youtube.com', '/results?search_query=' + encodeURIComponent(query)).then(handleRes, handleError);

        function handleRes(payload) {
            let results = []
            const result = JSON.parse(payload.match('var ytInitialData.=.(.*?)(;</script>)')[1]).contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
            for (e of result) {
                try {
                    const title = e.videoRenderer.title.runs[0].text;
                    const thumbnail = e.videoRenderer.thumbnail.thumbnails[0].url;
                    results.push({ title, thumbnail });
                } catch (e) {}
            }
            resolve(results);
        }

        function handleError(error) {
            reject(error);
        }

    });
}

module.exports = { getResults };