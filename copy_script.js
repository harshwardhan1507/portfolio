const fs = require('fs');
fs.copyFileSync('./components/HyperspeedBackground.jsx', './components/Hyperspeed/Hyperspeed.jsx');
try { fs.unlinkSync('./components/HyperspeedBackground.jsx'); } catch(e){}
if(fs.existsSync('./components/Hyperspeed.css')) {
  fs.copyFileSync('./components/Hyperspeed.css', './components/Hyperspeed/Hyperspeed.css');
  try { fs.unlinkSync('./components/Hyperspeed.css'); } catch(e){}
}
