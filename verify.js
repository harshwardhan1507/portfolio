const { execSync } = require('child_process');
const fs = require('fs');

try {
  const tscOut = execSync('npx tsc --noEmit', { encoding: 'utf8', stdio: 'pipe' });
  fs.writeFileSync('out_tsc.txt', 'TSC SUCCESS:\n' + tscOut);
} catch(e) {
  fs.writeFileSync('out_tsc.txt', 'TSC ERROR:\n' + (e.stdout || '') + '\n' + (e.stderr || ''));
}

try {
  const eslintOut = execSync('npm run lint', { encoding: 'utf8', stdio: 'pipe' });
  fs.writeFileSync('out_eslint.txt', 'ESLINT SUCCESS:\n' + eslintOut);
} catch(e) {
  fs.writeFileSync('out_eslint.txt', 'ESLINT ERROR:\n' + (e.stdout || '') + '\n' + (e.stderr || ''));
}
