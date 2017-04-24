#!/usr/bin/env node
/*
  Author: Matt Flannery
  Desc: Simple Hubot script that performs a lookup against the Threatcrowd API
  for a user supplied target domain as input, and returns the results.
  @TODO: Persist retrieved information to an SQL DB.
*/

module.exports = bot => {
    const request = require('request');

    // Listen for a target to scan, perform lookup against Threatcrowd API and return resulting subdomains.
    bot.hear(/threatcrowd (.*)/, res => {
        const domain = res.match[1]
        const target = `http://www.threatcrowd.org/searchApi/v2/domain/report/?domain=${domain}`
        res.send(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcJWBx65MbmuSVfBtrzti-xxzbW3wmRM_pFDdYq47-82WzhFU4RgQ5YBk Using Threatcrowd API to scan ${res.match[1]}`);
        const grabSubdomainsForDomain = domain => {
                request(target.replace(/domain=http:\/\//,"domain="), function (err, response, body) {
                        if (!err && response.statusCode === 200) {
                          obj = JSON.parse(body)
                          res.send(JSON.stringify(obj.subdomains, null, "*Domain:*"))
                          return res.send("Results:")
                    } else {
                        return `The following error occurred: ${err} with HTTP status code: ${response}`
                    }
                })
            };
        grabSubdomainsForDomain(domain)
    });
};
