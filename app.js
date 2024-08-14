const word_el = document.getElementById("kelimeler");

    function randomword() { 
        let wordlist = document.getElementById("kelimeler");
        let words = new XMLHttpRequest();
        words.open("GET", "kelimeler.json", true);
        words.onload = function() {
            if (this.status == 200) {
                const Allwords = JSON.parse(this.responseText);
                //! ekrana yazdırma kısmı düzeltilicek 
                Allwords.forEach(word => {  
                    wordlist.innerHTML = `
                    <div class="letter">${word.kelimeler}</div>`;
                });
    
                const randomIndex = Math.floor(Math.random() * Allwords.length);
                const randomWord = Allwords[randomIndex].kelimeler;
                console.log(randomWord); 
            }
        };
    
        words.send(); 
    }





