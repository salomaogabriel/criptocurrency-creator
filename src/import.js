function importFile(files) {
            
    let fileContent = "";
        const fr = new FileReader();
        fr.onload = () => {
        fileContent = JSON.parse(fr.result);
        openCoinDashboard(importCoin(fileContent));
        }
        fr.readAsText(files[0]);
}
function importFileFromDrop(file) {
        
        let fileContent = "";
            const fr = new FileReader();
            fr.onloadend = () => {
            fileContent = JSON.parse(fr.result);
            openCoinDashboard(importCoin(fileContent));

            }
            fr.readAsText(file)

   }
    
function dropHandler(ev) {

// Impedir o comportamento padrão (impedir que o arquivo seja aberto)
ev.preventDefault();

if (ev.dataTransfer.items) {
// Use a interface DataTransferItemList para acessar o (s) arquivo (s)
for (var i = 0; i < ev.dataTransfer.items.length; i++) {
  // Se os itens soltos não forem arquivos, rejeite-os
  if (ev.dataTransfer.items[i].kind === 'file') {
    var file = ev.dataTransfer.items[i].getAsFile();
    importFileFromDrop(file)
  }
}
}
}

function dragOverHandler(ev) {
// Impedir o comportamento padrão (impedir que o arquivo seja aberto)
ev.preventDefault();
}