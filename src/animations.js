// Charts

var ctx = document.getElementById('balance').getContext('2d');
var chart = new Chart(ctx, {
    type:"line",
    data: {
      labels: ['March', 'April', 'May', 'June', 'July', 'August'],
      datasets: [{
        label:"GTC",
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
function animateCreateCoin() {
    document.getElementById("create").classList.add("hide");
    document.getElementById("main").classList.remove("hide");
}
  