const fs = require ('fs');
const readlineSync = require ('readline-sync');
const moment = require ('moment');

function loadData() {
  try {
    const data = fs.readFileSync('data.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { events: [], cosplayers: [] };
  }
}

function saveData(data) {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
}

function addEvent() {
  const name = readlineSync.question('Nama Event: ');
  const date = readlineSync.question('Tanggal Event (YYYY-MM-DD): ');
  const location = readlineSync.question('Lokasi Event: ');

  const event = { name, date, location, cosplayers: [] };

  const data = loadData();
  data.events.push(event);
  saveData(data);

  console.log('Event berhasil ditambahkan!');
}

function searchEvent() {
  const eventName = readlineSync.question('Masukkan nama event: ');

  const data = loadData();
  const foundEvent = data.events.find(event => event.name === eventName);

  if (foundEvent) {
    console.log('Event ditemukan!');
    console.log('Nama Event:', foundEvent.name);
    console.log('Tanggal Event:', foundEvent.date);
    console.log('Lokasi Event:', foundEvent.location);
  } else {
    console.log('Event tidak ditemukan.');
  }
}

function deleteEvent() {
  const data = loadData();
  if (data.events.length === 0) {
    console.log('Tidak ada event yang dapat dihapus.');
    return;
  }

  console.log('Daftar Event:');
  data.events.forEach((event, index) => {
    console.log(`${index + 1}. ${event.name}`);
  });

  const eventIndex = readlineSync.questionInt('Pilih Event yang akan dihapus [1-' + data.events.length + ']: ', {
    limit: input => input >= 1 && input <= data.events.length,
  }) - 1;

  const deletedEvent = data.events.splice(eventIndex, 1)[0];
  saveData(data);

  console.log('Event berhasil dihapus!');
}

function addCosplayer() {
  const name = readlineSync.question('Nama Cosplayer: ');
  const characterName = readlineSync.question('Nama Karakter: ');
  const animeName = readlineSync.question('Nama Anime: ');

  const cosplayer = { name, characterName, animeName };

  const data = loadData();
  data.cosplayers.push(cosplayer);
  saveData(data);

  console.log('Cosplayer berhasil ditambahkan!');
}

function searchCosplayer() {
  const cosplayerName = readlineSync.question('Masukkan nama cosplayer: ');

  const data = loadData();
  const foundCosplayer = data.cosplayers.find(cosplayer => cosplayer.name === cosplayerName);

  if (foundCosplayer) {
    console.log('Cosplayer ditemukan!');
    console.log('Nama Cosplayer:', foundCosplayer.name);
    console.log('Nama Karakter:', foundCosplayer.characterName);
    console.log('Nama Anime:', foundCosplayer.animeName);
  } else {
    console.log('Cosplayer tidak ditemukan.');
  }
}

function deleteCosplayer() {
  const data = loadData();
  if (data.cosplayers.length === 0) {
    console.log('Tidak ada cosplayer yang dapat dihapus.');
    return;
  }

  console.log('Daftar Cosplayer:');
  data.cosplayers.forEach((cosplayer, index) => {
    console.log(`${index + 1}. ${cosplayer.name}`);
  });

  const cosplayerIndex = readlineSync.questionInt('Pilih Cosplayer yang akan dihapus [1-' + data.cosplayers.length + ']: ', {
    limit: input => input >= 1 && input <= data.cosplayers.length,
  }) - 1;

  const deletedCosplayer = data.cosplayers.splice(cosplayerIndex, 1)[0];
  saveData(data);

  console.log('Cosplayer berhasil dihapus!');
}

function addCosplayerToEvent() {
  const data = loadData();
  if (data.events.length === 0 || data.cosplayers.length === 0) {
    console.log('Tidak dapat menambahkan cosplayer ke dalam event. Pastikan terdapat event dan cosplayer.');
    return;
  }

  console.log('Daftar Event:');
  data.events.forEach((event, index) => {
    console.log(`${index + 1}. ${event.name}`);
  });

  const eventIndex = readlineSync.questionInt('Pilih Event yang akan ditambahkan cosplayer [1-' + data.events.length + ']: ', {
    limit: input => input >= 1 && input <= data.events.length,
  }) - 1;

  console.log('Daftar Cosplayer:');
  data.cosplayers.forEach((cosplayer, index) => {
    console.log(`${index + 1}. ${cosplayer.name}`);
  });

  const cosplayerIndex = readlineSync.questionInt('Pilih Cosplayer yang akan ditambahkan ke event [1-' + data.cosplayers.length + ']: ', {
    limit: input => input >= 1 && input <= data.cosplayers.length,
  }) - 1;

  data.events[eventIndex].cosplayers.push(data.cosplayers[cosplayerIndex]);
  saveData(data);

  console.log('Cosplayer berhasil ditambahkan ke event!');
}

function searchCosplayerInEvent() {
  const data = loadData();
  if (data.events.length === 0) {
    console.log('Tidak ada event yang dapat dicari cosplayer.');
    return;
  }

  console.log('Daftar Event:');
  data.events.forEach((event, index) => {
    console.log(`${index + 1}. ${event.name}`);
  });

  const eventIndex = readlineSync.questionInt('Pilih Event yang akan dicari cosplayer [1-' + data.events.length + ']: ', {
    limit: input => input >= 1 && input <= data.events.length,
  }) - 1;

  console.log('Daftar Cosplayer dalam Event:');
  const cosplayersInEvent = data.events[eventIndex].cosplayers;
  cosplayersInEvent.forEach((cosplayer, index) => {
    console.log(`${index + 1}. ${cosplayer.name}`);
  });
}

function deleteCosplayerInEvent() {
  const data = loadData();
  if (data.events.length === 0) {
    console.log('Tidak ada event yang dapat dihapus cosplayer.');
    return;
  }

  console.log('Daftar Event:');
  data.events.forEach((event, index) => {
    console.log(`${index + 1}. ${event.name}`);
  });

  const eventIndex = readlineSync.questionInt('Pilih Event yang akan dihapus cosplayer [1-' + data.events.length + ']: ', {
    limit: input => input >= 1 && input <= data.events.length,
  }) - 1;

  const cosplayersInEvent = data.events[eventIndex].cosplayers;

  if (cosplayersInEvent.length === 0) {
    console.log('Tidak ada cosplayer dalam event yang dapat dihapus.');
    return;
  }

  console.log('Daftar Cosplayer dalam Event:');
  cosplayersInEvent.forEach((cosplayer, index)) 
}