module.exports = bot => {

  // A simple listener to greet people back, leverages random
  bot.hear(/Hello!/, res => {
    helloMsg = ['Hello!', 'Hi there!', 'G\'day!', 'Why hello there', 'y hallo thar']
    return res.send(res.random(helloMsg));
  });

  // Conditional outcome based on user input leveraging RegEx to be somewhat intelligent in replies
  bot.hear(/(\w*\s\w*\sclass.*today)/, res => {
    const today = new Date();
    const classPhrase = res.match[1]
    if (today.getDay() == 1 || today.getDay() == 3) {
      return res.send(`Indeed, ${classPhrase}.`)
    } else {
      return res.send("Nope!")
    }
  });


  bot.hear(/mtn (.*)/, res => {
    const userToMessage = res.match[1];
    res.send(`@${userToMessage}`)
  });

  // Generate a response from an array when a user joins / leaves.
  watchChan = '#general'
  onEnterMsg = ['Hello', 'Target acquired', 'ohai']
  onLeaveMsg = ['RIP', 'kthxbye', 'lat@@@@']

  bot.enter(res => {
    res.reply(res.random(onEnterMsg));
  });

  bot.leave(res => {
    res.reply(res.random(onLeaveMsg));
  });

  /* @TODO: This has been entirely refactored, so that the user simply talks to the bot about nukes
  and it will respond about nukes. Heuristics, yo */
  bot.hear(/([Bb]ot) can you (.*)/i, res => {

    console.log(res.match);
    known_phrases = ['launch the nukes', 'not launch the nukes', 'please not launch the nuclear weapons', 'for the love of god, whatever you do, do not launch the nukes']
    const action = res.match[2];

    if (action === 'launch the nukes') {
      return res.send('Now we are talking! Launching the nukes! :trollface:')
    } else if (known_phrases.includes(action)) {
      return res.send('Roger that. Lauching nuclear weapons. :trollface:')
    } else {
      return res.reply(`I do not know how to ${action}, i'm a nuclear warfare robot! Stop being silly`)
    }
  });

};
