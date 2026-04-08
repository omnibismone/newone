const https = require('https');

https.get('https://make.ct.ws/projects/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    const videoRegex = /<video[^>]+src="([^">]+)"/g;
    const sourceRegex = /<source[^>]+src="([^">]+)"/g;
    const iframeRegex = /<iframe[^>]+src="([^">]+)"/g;
    
    let match;
    console.log("--- IMAGES ---");
    while ((match = imgRegex.exec(data)) !== null) {
      console.log(match[1]);
    }
    console.log("--- VIDEOS ---");
    while ((match = videoRegex.exec(data)) !== null) {
      console.log(match[1]);
    }
    console.log("--- SOURCES ---");
    while ((match = sourceRegex.exec(data)) !== null) {
      console.log(match[1]);
    }
    console.log("--- IFRAMES ---");
    while ((match = iframeRegex.exec(data)) !== null) {
      console.log(match[1]);
    }
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
