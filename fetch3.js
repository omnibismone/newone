async function run() {
  const res = await fetch('https://make.ct.ws/projects/');
  const data = await res.text();
  const iframeRegex = /<iframe[^>]+src="([^">]+)"/g;
  const videoRegex = /<video[^>]*>([\s\S]*?)<\/video>/g;
  const sourceRegex = /<source[^>]+src="([^">]+)"/g;
  const aRegex = /<a[^>]+href="([^">]+)"[^>]*>.*?<\/a>/g;
  
  let match;
  console.log("--- IFRAMES ---");
  while ((match = iframeRegex.exec(data)) !== null) {
    console.log(match[1]);
  }
  console.log("--- VIDEOS ---");
  while ((match = videoRegex.exec(data)) !== null) {
    console.log(match[0]);
  }
  console.log("--- LINKS ---");
  while ((match = aRegex.exec(data)) !== null) {
    if (match[1].includes('youtube') || match[1].includes('vimeo') || match[1].endsWith('.mp4')) {
      console.log(match[1]);
    }
  }
}
run();
