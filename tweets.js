// tweets module 
const Twit = require('twit');

const T = new Twit({
    consumer_key: "gnE1Bd6XzkQlvT5dSQY2S8Zh3",
    consumer_secret: "AhvWzoZa2WVzVVA2VqhZRA6ihvYhgkiqDjT4xiWH7BlKW0NQVC",
    access_token: "1358136038850494472-tlpLGcyo5YDMj76tS4Tx8I5kB9JYnG",
    access_token_secret: "SythY0VpmCoUVhzgoP1RHqHwDGAoPEOa1uCIRV2vVtYzm",
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true,     // optional - requires SSL certificates to be valid.
});
const stream = T.stream('statuses/filter', { track: 'bitcoin' });

function getTweetObject(tweet) {
    let tweetText = (tweet.extended_tweet) ? tweet.extended_tweet.full_text : tweet.text;

    // check for retweets
    if (tweet.text.includes('RT @') && tweet.retweeted_status) {
        tweetText = (tweet.retweeted_status.extended_tweet) ? tweet.retweeted_status.extended_tweet.full_text : tweet.retweeted_status.text;
    }

    const TweetObject = {
        text: tweetText,
        user: tweet.user.name,
        location: (tweet.user.location !== null) ? tweet.user.location : '',
        followers: tweet.user.followers_count,
        userImage: tweet.user.profile_image_url,
        timestamp: tweet.timestamp_ms,
    };

    return TweetObject;
}

const tweetsSocket = (io) => {
    io.on('connection', function (socket) {
        console.log('sockets connected');
        let isStreamStopped = false;

        socket.on('stop stream', () => {
            console.log('stopped streaming tweets');
            stream.stop();
            isStreamStopped = true;
        });

        socket.on('restart stream', () => {
            console.log('restarted streaming tweets');
            stream.start();
            isStreamStopped = false;
        });

        socket.on('start stream', () => {
            console.log('started streaming tweets');

            if (!isStreamStopped) {
                stream.stop();
            }

            stream.on('tweet', function (tweet) {
                console.log('tweeting');

                let TweetObject = getTweetObject(tweet);

                socket.emit('latest tweets', TweetObject);
            });

            stream.start();

            isStreamStopped = false;
        });
    });
}
module.exports = tweetsSocket 