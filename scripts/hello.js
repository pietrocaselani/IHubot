const COMMANDS = {
  HELLO: '/hello/i',
};

const _say_hello = (msg) =>{
  const user = msg.message.user
  msg.reply(`Hi ${user.name}. Your id is \`${user.id}\` and you are in the channel #${user.room}`)
}

module.exports = (hubot) => {
  hubot.respond(COMMANDS.HELLO, _say_hello);
};
