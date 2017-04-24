
module.exports = bot => {
  const dns = require('dns');

  // Perform a simple DNS lookup
  bot.respond(/resolve (.*)/, res => {
    const sourceAddr = res.match[1]
    const target = sourceAddr.replace(/http:\/\//,"")

    const append = (name, item) => {
      const curr = bot.brain.get(name);
      const hasItems = curr && curr.length > 0;
      const items = hasItems ? [...curr, item] : [item];
      if (hasItems && curr.includes(item)) {
         res.send("This target was already scanned during this session! So the result was not persisted.");
         //console.log("Result already in");
         return false;
      }
      // console.log(items);
      bot.brain.set(name, items);
    };

    const lookup = dns.lookup(target, (err, match) => {
      append('domains', match)
      res.send(sourceAddr, match)
      //console.log(sourceAddr, 'resolved to', match)
    });
  });

  // List the scans and send each item within the returned array using a forEach loop.
  bot.respond(/list scans/i, res => {
    const curr = bot.brain.get('domains')
    curr.forEach(function(item,index,array) {
          res.send(item)
    });
  });
  
  /* Only useful for testing p much
  bot.respond(/reset domains/i, res => {
    domainsScanned = bot.brain.set('domains', 0)
    res.send('Reset scanned domains');
  });
  */

}
