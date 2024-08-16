const word_el = document.getElementById("kelimeler");
const play_again = document.getElementById("playagain");
const play_again_btn = document.getElementById("yenidenoyna");
const correctLetters = []; 
const wrongLetters = [];
let selectedword = ``;  
const wrongletters__El = document.getElementById("hatali__kelimeler");
const items = document.querySelectorAll(".item");


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

function displayword() {
    word_el.innerHTML = `
        ${selectedword.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter.toLowerCase()) ? letter : ` `}
            </div>
        `).join('')}
    `;

    const i = word_el.textContent.replace(/\n/g, '').replace(/\s+/g, '');
    if (i.toLowerCase() === selectedword.toLowerCase()) {
        Alert.alertmessage("Kelimeyi Doğru Bildiniz.","alert alert-success")
    }
}

randomword().then(word => {
    selectedword = word;  
    displayword();  
}).catch(error => {
    console.error(error);
});

function updatewrongletters(){
    wrongletters__El.innerHTML = `
        ${wrongLetters.length>0? `<h3>Hatalı Harfler</h3>`:``}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
    items.forEach((item,index) =>{
        const errorcount = wrongLetters.length;
        if(index<errorcount){
            item.style.display = `block`;
        }
        else{
            item.style.display = `none`;
        }
    })

    document.getElementById("showword").addEventListener("click", function() {
        word_el.innerHTML = `
            ${selectedword.split('').map(letter => `
                <div class="letter">
                    ${letter}
                </div>
            `).join('')}
        `;
        
        const modal = bootstrap.Modal.getInstance(document.getElementById("customModal"));
        modal.hide(); 
        //////////////////////////////
        play_again_btn.classList.remove("btn-display");
        play_again_btn.addEventListener("click",function () { 
            Game.resetwindow();
         })
    });
    

    play_again.addEventListener("click", function() {
        correctLetters.splice(0); 
        wrongLetters.splice(0);   
        items.forEach(item => item.style.display = 'none'); 
    
        randomword().then(word => {
            selectedword = word;  
            displayword();  
        }).catch(error => {
            console.error(error);
        });
    
        updatewrongletters(); 
        const modal = bootstrap.Modal.getInstance(document.getElementById("customModal"));
        modal.hide(); 
    });
    

    if(wrongLetters.length === items.length){
     let showModal = document.getElementById("customModal");
        const modal = new bootstrap.Modal(showModal);
        modal.show(); 
    }
}
window.addEventListener("keydown", function(e) {
        const letter = e.key.toLowerCase();  

        if (selectedword.toLowerCase().includes(letter)) {  
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayword(); 
            }
            else{
                Alert.alertmessage("Bu Harf Eklendi.","alert alert-danger");
            }
        }
        else{
            if(!wrongLetters.includes(letter)){
               wrongLetters.push(letter);
                updatewrongletters();
            }
        }

    
});