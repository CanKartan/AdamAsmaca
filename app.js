const word_el = document.getElementById("kelimeler");
const correctLetters = [`a`, `r`, `m`,`u`,`t`]; 
const wrongLetters = [];

    // JSON içerisinden kelime seçme
function randomword() { 
    return new Promise((resolve, reject) => {
        let words = new XMLHttpRequest();
        words.open("GET", "kelimeler.json", true);
        words.onload = function() {
            if (this.status == 200) {
                const Allwords = JSON.parse(this.responseText);
                
                const randomIndex = Math.floor(Math.random() * Allwords.length);
                const randomWord = Allwords[randomIndex].kelimeler;

                resolve(randomWord);
            } else {
                reject("Kelimeler Yüklenemedi.");
            }
        };
        
        words.send();
    });
}

function displayword(){
    randomword().then(selectedword => {
        word_el.innerHTML = `
            ${selectedword.split('').map(letter => `
                <div class="letter">
                    ${correctLetters.includes(letter) ? letter : ` `}
                </div>
            `).join('')}
        `;
        
        const i = word_el.textContent.replace(/\n/g, '').replace(/\s+/g, '');
        if (i === selectedword){
           const alert = document.createElement("div");
           alert.className = "alert alert-success";
           alert.innerHTML = `Kelimeyi Doğru Bildiniz.`
            document.querySelectorAll(".mesaj")[0].appendChild(alert);
            setTimeout(function(){
                alert.remove();
            },2000);
        }
        
        // console.log(word_el.textContent.replace(/\n/g, '').replace(/\s+/g, ''));
        
    }).catch(error => {
        console.error(error);
    });
}

displayword();
