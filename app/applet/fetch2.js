async function run() {
  const res = await fetch('https://make.ct.ws/projects/');
  const data = await res.text();
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
}
run();
