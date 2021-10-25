// Charts

var ctx = document.getElementById('balance').getContext('2d');
var chart = new Chart(ctx, {
    type:"line",
    data: {
      labels: ['March', 'April', 'May', 'June', 'July', 'August'],
      datasets: [{
        label:"This is not working yet",
        data: [20,90,80,70,40,55],
        backgroundColor: 'rgba(255, 127, 80, 0.2)',
        borderColor: 'rgba(255, 127, 80, 1)',
        borderWidth: 1,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 0,
          max: 100,
        }
    }
    }
});


// Particles from the menu
var particles = Particles.init({
	selector: '.background',
  sizeVariations: 10,
  color: ['#ff9c78', '#ff4400', '#FF7F50'],
  connectParticles: true
});

// Change the theme of the website
var root = document.querySelector(':root');
var themeSwitches = document.getElementsByClassName("switches");
var isDark = false;
function changeTheme() {
  // changes the theme
    if(!isDark) {
        root.style.setProperty('--background', '#121212');
        root.style.setProperty('--color', 'white');
        root.style.setProperty('--keys-background', 'rgb(255,255,255,0.1');
        isDark = true;
        for(var i = 0; i < themeSwitches.length; i++) {
            themeSwitches[i].checked = true;
        }
    } else {
        root.style.setProperty('--background', '#f0f0f0');
        root.style.setProperty('--color', 'black');
        root.style.setProperty('--keys-background', 'rgb(0,0,0,0.1');

        isDark = false;
        for(var i = 0; i < themeSwitches.length; i++) {
            themeSwitches[i].checked = false;
        }
    }
}

var privateKey, publicKey;
function animateGenerateKeys(button) {
    button.firstElementChild.classList.add("hide");
    button.lastElementChild.classList.remove("hide");
    document.getElementsByClassName("keys")[0].classList.remove("hide");
    [privateKey,publicKey] = generateKeys();

    document.getElementById("pvKey").innerHTML = privateKey;
    document.getElementById("puKey").innerHTML = publicKey;

    setTimeout(() => {
      button.firstElementChild.classList.remove("hide");
    button.lastElementChild.classList.add("hide");
    }, 2000);
    
}

function goToCreateCoin() {
    document.getElementsByClassName("background")[0].classList.add("scaleUp");
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    setTimeout(() => {
        document.getElementsByClassName("background")[0].classList.remove("scaleUp");
        document.getElementsByTagName("body")[0].style.overflow = "initial";
        document.getElementById("menu").classList.add("hide");
        document.getElementById("create").classList.remove("hide");
    }, 2000);
}
function downloadKeys(filename) {
    var element = document.createElement('a');
    var text = 'Public Key = '+ publicKey + '\nPrivate Key = ' + privateKey;
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}
let coin;
function exportCoin() {
  var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + JSON.stringify(coin));
    element.setAttribute('download', coin.name + '.json');
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}
function animateCreateCoin() {
    coin = createCoin();
    updateCoin(coin);
    document.getElementById("create").classList.add("hide");
    document.getElementById("main").classList.remove("hide");
}
function changePage(newPageId,navlink) {
 let pages = document.getElementsByClassName("page");
 let navs = document.getElementsByClassName("nav");

  let newPage = document.getElementById(newPageId);

 for(let i = 0; i < pages.length;i++) {
    pages[i].classList.add("hide")
 }
 for(let i = 0; i < navs.length;i++) {
  navs[i].classList.remove("active");
}
 document.getElementById(newPageId).classList.remove("hide");
  navlink.classList.add("active")

}
function addTransationForm() {
  document.getElementById("transactionForm").classList.remove("hide")
}
function changeActiveBlock(block,index) {
  let cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    const element = cards[i];
    element.classList.remove("activeBlock");
  }
  block.classList.add("activeBlock");
  if(index == 0 ) {
    let table = document.getElementById("transactionTable");
    table.innerHTML = '<tr><th>#</th><th>From</th><th>To</th><th>Amount</th><th>Valid</th></tr>';
    table.innerHTML += "<tr class='eventr'><td>0</td><td>System</td><td>Genesis Block</td><td>Genesis  Block</td><td>&check;</td></tr>"
  }
  else {
    let table = document.getElementById("transactionTable");
    table.innerHTML = '<tr><th>#</th><th>From</th><th>To</th><th>Amount</th><th>Valid</th></tr>';
    let transactions = coin.chain[index].transactions;
    for(let i = 0; i < transactions.length; i++) {
      let evenCSSClass = 'uneventr';
      let giver = transactions[i].fromAddress;
      let validTransaction = transactions[i].isValid();

      if(validTransaction) {
        validTransaction = '&check;';
      }
      else {
        validTransaction = '&#x26CC;';

      }
      if(giver == null) {
        giver = 'System';
      }
      if(i % 2 == 0 ) {
        evenCSSClass = 'eventr';
      }
      table.innerHTML += '<tr class="'+evenCSSClass+'"><td>'+encodeURI(i)+'</td><td>'+encodeURI(giver)+'</td><td>'+encodeURI(transactions[i].toAddress)+'</td><td>'+encodeURI(transactions[i].amount)+'</td><td>'+validTransaction+'</td></tr>';
    }

  }

}

function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}
function createCards(coin) {
  document.getElementById("cards").innerHTML ='';

  for (let index = 0; index < coin.chain.length; index++) {
    if(index == 0) {
      document.getElementById("cards").innerHTML += '<div class="card activeBlock" onclick="changeActiveBlock(this,'+index+')"><h2>Block '+encodeURI(index)+'</h2><h3>Hash:</h3><h4 style="color:#'+ coin.chain[index].hash.substring(0,6)+'">'+encodeURI(coin.chain[index].hash)+'</h4><h3>Hash of previous block</h3><h4>Genesis Block</h4><h3>Nonce:</h3><h4>'+encodeURI(coin.chain[index].nonce)+'</h4><h3>Timestamp:</h3><h4>'+encodeURI(coin.chain[index].timestamp)+'</h4></div>'
    }
    else {
      document.getElementById("cards").innerHTML += '<div class="card" onclick="changeActiveBlock(this,'+index+')"><h2>Block '+encodeURI(index) +'</h2><h3>Hash:</h3><h4 style = "color:#'+ coin.chain[index].hash.substring(0,6)+'">'+encodeURI(coin.chain[index].hash)+'</h4><h3>Hash of previous block</h3><h4 style="color:#'+coin.chain[index].previousHash.substring(0,6)+'">'+encodeURI(coin.chain[index].previousHash)+'</h4><h3>Nonce:</h3><h4>'+encodeURI(coin.chain[index].nonce)+'</h4><h3>Timestamp:</h3><h4>'+encodeURI(coin.chain[index].timestamp)+'</h4></div>'
    }    
  }
}
function updateCoin(coin) {
  document.getElementById("title").innerHTML = coin.name + '(' + coin.abbr + ')';
  document.getElementById("balance-value").innerHTML = nFormatter(coin.getBalanceOfAddress(publicKey),1);
  var tag = document.createElement("span");
  var text = document.createTextNode(' ' + coin.abbr);
  tag.appendChild(text);
  var element = document.getElementById("balance-value");
  element.appendChild(tag);
  let latestTransaction = coin.getLatestBlock().transactions[coin.getLatestBlock().transactions.length - 1];
  document.getElementById("latest-transaction-from").innerHTML = latestTransaction.fromAddress;
  if (latestTransaction.fromAddress == null) {
  document.getElementById("latest-transaction-from").innerHTML = 'System';
  }
  document.getElementById("latest-transaction-to").innerHTML = latestTransaction.toAddress;
  document.getElementById("latest-transaction-amount").innerHTML = latestTransaction.amount + coin.abbr;
  document.getElementById("walletPuKey").innerHTML = publicKey;
  document.getElementById("walletPvKey").innerHTML = privateKey;
  document.getElementById("settingsPuKey").innerHTML = publicKey;
  document.getElementById("settingsPvKey").innerHTML = privateKey;
  document.getElementById("settingsName").innerHTML = coin.name;
  document.getElementById("settingsAbbr").innerHTML = coin.abbr;
  document.getElementById("settingsDifficulty").innerHTML = coin.difficulty;
  document.getElementById("settingsReward").innerHTML = coin.miningReward;

  createCards(coin);
}
function createNewTransaction() {
  let toAddress = document.getElementById("transaction-to").value;
  let amount = document.getElementById("transaction-amount").value;
  addTransaction();
  document.getElementById("transactionForm").classList.add("hide");

  toAddress = '';
  amount = '';

}
function startMiner() {
  document.getElementById("console").innerHTML += "<p>Starting the Miner...</p>";
  let hash = mine();
  document.getElementById("console").innerHTML += "<p style='color:#"+hash.substring(0,6) +"'>Block Mined! New Hash: "+ hash+"</p>";
  updateCoin(coin)
}