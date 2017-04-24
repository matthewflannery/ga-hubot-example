
module.exports = bot => {
  const dns = require('dns');

  // Perform a simple DNS lookup
  bot.respond(/resolve (.*)/, res => {
    const sourceAddr = res.match[1]
    target = sourceAddr.replace(/http:\/\//,"")
    // if (persistedData.includes(target)) {
    //   res.send("This target was already scanned during this session!");
    // }

    const lookup = dns.lookup(target, (err, match) => {
      console.log(match)
      domainsScanned = bot.brain.set('domains', match)
      console.log(domainsScanned)
      res.send(sourceAddr, match)
    })
  });

  bot.respond(/reset things/i, res => {
    numThings = bot.brain.set('things', 0)
    res.send('Reset all the things');
  });

  // Persist the data to Hubots KV store
  bot.respond(/do a thing/i, res => {
    numThings = bot.brain.get('things')
    bot.brain.set('things', numThings+1)
    console.log(numThings);
  });
}
