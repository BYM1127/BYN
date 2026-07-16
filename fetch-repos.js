const https = require('https');
https.get('https://api.github.com/users/BYM1127/repos', { headers: { 'User-Agent': 'Node.js' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
            console.log(parsed.map(r => ({ name: r.name, url: r.html_url, desc: r.description })));
        } else {
            console.log(parsed);
        }
    } catch(e) {
        console.log("Error parsing");
    }
  });
});
