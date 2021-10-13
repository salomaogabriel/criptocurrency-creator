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

function animateGenerateKeys(button) {
    button.firstElementChild.classList.add("hide");
    button.lastElementChild.classList.remove("hide");
    document.getElementsByClassName("keys")[0].classList.remove("hide");
    var privateKey, publicKey;
    [privateKey,publicKey] = generateKeys();

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
function downloadKeys(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
  