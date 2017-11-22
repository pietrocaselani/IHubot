const CinesystemService = require('./cinesystem/cinesystemservice')

const COMMANDS = {
  CINEMA: /cinema ([0-9]{1,2}\/[0-9]{1,2}|hoje|amanhã|amanha)/i,
};

const _cinesystem_movies = (msg) => {
  const dateText = /([0-9]{1,2}\/[0-9]{1,2}|hoje|amanhã|amanha)/i.exec(msg.message.text)[0];

  msg.reply(`Buscando os filmes de ${dateText}`);

  CinesystemService.get_movies(dateText)
  .then(result => {
    msg.reply(result);
  })
  .catch(err => {
    msg.reply(`Não consegue né moises ${err}`);
  })
};

module.exports = (robot) => {
  robot.respond(COMMANDS.CINEMA, _cinesystem_movies);
};
