const { prefix, token } = require("./config.json");

const Discord = require("discord.js");
const client = new Discord.Client();

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    message.channel.send("Pong.");
  } else if (command.startsWith("beep")) {
    message.channel.send("Boop.");
  } else if (command === "join") {
    console.log("hi");
    const userID = message.author.id;
    const user = client.guilds
      .get(message.guild.id)
      .members.get(message.author.id);
    // console.log(user);
    if (user.voiceChannel) {
      user.voiceChannel
        .join()
        .then(connection => {
          message.reply("I have successfully connected to the channel!");
          connection.playArbitraryInput(
            "https://www.youtube.com/watch?v=qsv2B1ztlgw&list=PLMCY-e5FdmYUpEaZh2jY9XM5cm7B0f18G&index=2&t=0s"
          );
        })
        .catch(console.error);
    } else {
      message.channel.send("You must be in a voice channel first!");
    }
  } else if (command === "leave") {
    const bot = client.guilds.get(message.guild.id).members.get(client.user.id);
    if (bot.voiceChannel) {
      bot.voiceChannel.leave();
    } else {
      message.channel.send(
        client.user.username + " is not in a voice channel!"
      );
    }
  }
});

client.login(token);
