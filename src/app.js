const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const fs = require('fs');

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Active',
  });
});

app.post('/', (req, res) => {
  if(req.header["x-verification-token"] !== process.env.VERIFICATION_TOKEN) { // token didapatkan dari tiptap
    console.log("Some one try your api, Token Invalid!!")
  }
  console.log("Data:", req.body);
  // Menyimpan data ke file .json
  const { id, name, amount, message } = req.body.data;
  const jsonData = JSON.stringify(
    {
      event: 'tip',
      data: {
        id,
        name,
        amount: amount.toString(), // Mengubah nilai amount menjadi string
        message
      }
    },
    null,
    2
  );
  fs.writeFile('data.json', jsonData, (err) => {
    if (err) {
      console.error("Error writing data to file:", err);
      res.status(500).json({ message: 'Error writing data to file' });
    } else {
      console.log("Data written to file successfully");

      // Mengirim data ke bot Discord melalui WebSocket
      const channel = client.channels.cache.get(channelId);
      if (!channel) {
        console.error('Saluran tidak ditemukan.');
        res.status(500).json({ message: 'Channel not found' });
        return;
      }

      res.json({ message: 'Data written to file successfully' });
    }
  });
});

const sendEmbedDataToChannel = (channel) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data from file:', err);
      return;
    }

    const jsonData = JSON.parse(data);
    const { id, name, amount, message } = jsonData.data;

    const configData = JSON.parse(fs.readFileSync('config.json', 'utf8'));
    const image1 = configData.image1;
    const image2 = configData.image2;
    const image3 = configData.image3;

    let thumbnailUrl = image1;

    if (amount >= 50000) {
      thumbnailUrl = image2;
    } else if (amount >= 15000) {
      thumbnailUrl = image1;
    } else {
      thumbnailUrl = image3;
    }

    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Donate Notification')
      .setThumbnail(thumbnailUrl)
      .addFields(
        { name: 'Nama: ', value: name, inline: true },
        { name: 'Jumlah: ', value: amount, inline: true },
        { name: 'Pesan: ', value: message },
      )
      .setTimestamp()
      .setFooter({
        text: 'Donate Notification by Kasuma#3236',
        iconURL:
          'https://cdn.discordapp.com/attachments/1114006394266460253/1114006442333188146/highres__highest_quallity__illustration__cinematic_light__ultra_detailed__detailed_face___detailed_e_Seed-1856684017_Steps-20_Guidance-7.5_3.png',
      });

    channel.send({ embeds: [embed] });
  });
};

const channelId = '1113958224912191500';

let previousData = null; // Data sebelumnya dari file data.json
const checkAndUpdateData = (channel) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data from file:', err);
      return;
    }

    const jsonData = JSON.parse(data);
    if (JSON.stringify(jsonData) !== JSON.stringify(previousData)) {
      previousData = jsonData;
      sendEmbedDataToChannel(channel, jsonData); // Menggunakan jsonData sebagai argumens
    }
  });
};


client.on('ready', () => {
  console.log(client.user.username + " Hello World")
});

client.on('message', (message) => {
  if (message.content === '!checkData') {
    const channel = client.channels.cache.get(channelId);
    if (!channel) {
      console.error('Saluran tidak ditemukan.');
      return;
    }

    checkAndUpdateData(channel);
  }
});

// Cek file data.json setiap 5 detik
setInterval(() => {
  const channel = client.channels.cache.get(channelId);
  if (channel) {
    checkAndUpdateData(channel);
  }
}, 5000);

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

client.login(process.env.BOT_TOKEN);

module.exports = app;
