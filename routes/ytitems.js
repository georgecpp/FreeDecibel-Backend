const express = require('express');
const router = express.Router();
const ytSearch = require('yt-search');


const videosFinder = async (query) => {
    const videosResult = await ytSearch(query);
    return (videosResult.videos.length > 0) ? videosResult.videos : null;
}

router.get('/', async (req, res) => {
    try {
        const query = req.body.query;
        if(!query) {
            return res.status(400).send('Send query keywords first!');
        }
        const videos = await videosFinder(query);
        if(videos) {
            var ytItems = videos.map( function (video) {
                var ytItem = {
                    "url": video.url,
                    "title": video.title,
                    "thumbnail": video.thumbnail,
                    "duration": video.duration.timestamp,
                    "views": video.views,
                    "uploader": video.author.name,
                    "time_upload": video.ago
                }
                return ytItem;
            });

            return res.status(200).send(ytItems);
        }
        else {
           return res.status(404).send('Couldn\'t find any videos related to your keywords...');
        }
    }
    catch(err) {
        return res.status(500).send({message: err});
    }

});


module.exports = router;