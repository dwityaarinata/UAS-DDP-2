const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let events = [];
let cosplayers = [];

function displayMenu() {
  console.log("\nProgram Registrasi Event Jejepangan");
  console.log("===================================");
  console.log("1. Tambah Event");
  console.log("2. Cari Event");
  console.log("3. Hapus Event");
  console.log("4. Tambah Cosplayer");
  console.log("5. Cari Cosplayer");
  console.log("6. Hapus Cosplayer");
  console.log("7. Tambah Cosplayer ke Event");
  console.log("8. Cari Cosplayer dalam Event");
  console.log("9. Hapus Cosplayer dalam Event");
  console.log("10. Event yang akan diadakan dalam 7 hari mendatang");
  console.log("11. Keluar");
}

function addEvent() {
  rl.question("Nama Event: ", (eventName) => {
    rl.question("Tanggal Event (YYYY-MM-DD): ", (eventDate) => {
      rl.question("Lokasi Event: ", (eventLocation) => {
        const event = {
          name: eventName,
          date: eventDate,
          location: eventLocation
        };
        events.push(event);
        console.log("Event berhasil ditambahkan!");
        showMenu();
      });
    });
  });
}

function findEvent() {
  rl.question("Masukan nama event: ", (eventName) => {
    const event = events.find(e => e.name === eventName);
    if (event) {
      console.log("Event ditemukan!");
      displayEvent(event);
    } else {
      console.log("Event tidak ditemukan.");
    }
    showMenu();
  });
}

function deleteEvent() {
  displayEvents();
  rl.question("Pilih Event yang akan dihapus [1-" + events.length + "]: ", (index) => {
    index = parseInt(index) - 1;
    if (events[index]) {
      events.splice(index, 1);
      console.log("Event berhasil dihapus!");
    } else {
      console.log("Pilihan event tidak valid.");
    }
    showMenu();
  });
}

function addCosplayer() {
  rl.question("Nama Cosplayer: ", (cosplayerName) => {
    rl.question("Nama Karakter: ", (characterName) => {
      rl.question("Nama Anime: ", (animeName) => {
        const cosplayer = {
          name: cosplayerName,
          character: characterName,
          anime: animeName
        };
        cosplayers.push(cosplayer);
        console.log("Cosplayer berhasil ditambahkan!");
        showMenu();
      });
    });
  });
}

function findCosplayer() {
  rl.question("Masukan nama cosplayer: ", (cosplayerName) => {
    const cosplayer = cosplayers.find(c => c.name === cosplayerName);
    if (cosplayer) {
      console.log("Cosplayer ditemukan!");
      displayCosplayer(cosplayer);
    } else {
      console.log("Cosplayer tidak ditemukan.");
    }
    showMenu();
  });
}

function deleteCosplayer() {
  displayCosplayers();
  rl.question("Pilih Cosplayer yang akan dihapus [1-" + cosplayers.length + "]: ", (index) => {
    index = parseInt(index) - 1;
    if (cosplayers[index]) {
      cosplayers.splice(index, 1);
      console.log("Cosplayer berhasil dihapus!");
    } else {
      console.log("Pilihan cosplayer tidak valid.");
    }
    showMenu();
  });
}

function addCosplayerToEvent() {
  displayCosplayers();
  rl.question("Pilih Cosplayer yang akan ditambahkan ke event [1-" + cosplayers.length + "]: ", (cosplayerIndex) => {
    displayEvents();
    rl.question("Pilih Event yang akan ditambahkan cosplayer [1-" + events.length + "]: ", (eventIndex) => {
      cosplayerIndex = parseInt(cosplayerIndex) - 1;
      eventIndex = parseInt(eventIndex) - 1;
      if (cosplayers[cosplayerIndex] && events[eventIndex]) {
        events[eventIndex].cosplayers = events[eventIndex].cosplayers || [];
        events[eventIndex].cosplayers.push(cosplayers[cosplayerIndex]);
        console.log("Cosplayer berhasil ditambahkan ke event!");
      } else {
        console.log("Pilihan cosplayer atau event tidak valid.");
      }
      showMenu();
    });
  });
}

function findCosplayerInEvent() {
  displayEvents();
  rl.question("Pilih Event [1-" + events.length + "]: ", (eventIndex) => {
    eventIndex = parseInt(eventIndex) - 1;
    if (events[eventIndex]) {
      displayCosplayersInEvent(events[eventIndex]);
    } else {
      console.log("Pilihan event tidak valid.");
    }
    showMenu();
  });
}

function deleteCosplayerInEvent() {
  displayEvents();
  rl.question("Pilih Event [1-" + events.length + "]: ", (eventIndex) => {
    eventIndex = parseInt(eventIndex) - 1;
    if (events[eventIndex]) {
      displayCosplayersInEvent(events[eventIndex]);
      rl.question("Pilih Cosplayer yang akan dihapus dalam event [1-" + events[eventIndex].cosplayers.length + "]: ", (cosplayerIndex) => {
        cosplayerIndex = parseInt(cosplayerIndex) - 1;
        if (events[eventIndex].cosplayers[cosplayerIndex]) {
          events[eventIndex].cosplayers.splice(cosplayerIndex, 1);
          console.log("Cosplayer berhasil dihapus dalam event!");
        } else {
          console.log("Pilihan cosplayer tidak valid.");
        }
        showMenu();
      });
    } else {
      console.log("Pilihan event tidak valid.");
      showMenu();
    }
  });
}

function upcomingEvents() {
  const today = new Date();
  const sevenDaysLater = new Date(today);
  sevenDaysLater.setDate(today.getDate() + 7);

  const upcomingEvents = events.filter(event => new Date(event.date) <= sevenDaysLater);
  console.log("Event yang akan diadakan dalam 7 hari mendatang adalah:");
  upcomingEvents.forEach(event => {
    console.log(`${event.name} - ${event.date}`);
  });
  showMenu();
}

function displayEvent(event) {
  console.log(`Nama Event: ${event.name}`);
  console.log(`Tanggal Event: ${event.date}`);
  console.log(`Lokasi Event: ${event.location}`);
}

function displayEvents() {
  console.log("Daftar Event:");
  events.forEach((event, index) => {
    console.log(`${index + 1}. ${event.name} - ${event.date}`);
  });
}

function displayCosplayer(cosplayer) {
  console.log(`Nama Cosplayer: ${cosplayer.name}`);
  console.log(`Nama Karakter: ${cosplayer.character}`);
  console.log(`Nama Anime: ${cosplayer.anime}`);
}

function displayCosplayers() {
  console.log("Daftar Cosplayer:");
  cosplayers.forEach((cosplayer, index) => {
    console.log(`${index + 1}. ${cosplayer.name}`);
  });
}

function displayCosplayersInEvent(event) {
  console.log(`Cosplayer dalam Event ${event.name}:`);
  event.cosplayers.forEach((cosplayer, index) => {
    console.log(`${index + 1}. ${cosplayer.name}`);
  });
}

function showMenu() {
  displayMenu();
  rl.question("Pilih Menu [1-11]: ", (choice) => {
    switch (choice) {
      case '1':
        addEvent();
        break;
      case '2':
        findEvent();
        break;
      case '3':
        deleteEvent();
        break;
      case '4':
        addCosplayer();
        break;
      case '5':
        findCosplayer();
        break;
      case '6':
        deleteCosplayer();
        break;
      case '7':
        addCosplayerToEvent();
        break;
      case '8':
        findCosplayerInEvent();
        break;
      case '9':
        deleteCosplayerInEvent();
        break;
      case '10':
        upcomingEvents();
        break;
      case '11':
        rl.close();
        break;
      default:
        console.log("Pilihan tidak valid. Silakan pilih menu lagi.");
        showMenu();
    }
  });
}

showMenu();
