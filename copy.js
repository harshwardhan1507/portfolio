const fs = require('fs');
try {
  const content = fs.readFileSync('d:/Programming/react/portfolio/components/HyperspeedBackground.jsx', 'utf8');
  fs.writeFileSync('d:/Programming/react/portfolio/components/Hyperspeed/Hyperspeed.jsx', '/* eslint-disable */\n// @ts-nocheck\n' + content);
  const css = fs.readFileSync('d:/Programming/react/portfolio/components/Hyperspeed.css', 'utf8');
  fs.writeFileSync('d:/Programming/react/portfolio/components/Hyperspeed/Hyperspeed.css', css);
  console.log("SUCCESS");
} catch(e) {
  console.error(e);
}
