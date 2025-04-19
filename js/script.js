const url="https://api.dicionario-aberto.net/word/";
const urlAlternativa="https://api.dicionario-aberto.net/near/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");


document.getElementById("inp-word").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      document.getElementById("search-btn").click();
    }
  });

btn.addEventListener("click", () =>{
    let inpWord = document.getElementById("inp-word").value;
    // console.log(`${url}${inpWord}`);
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data[0]);
            inpWord = inpWord[0].toUpperCase() + inpWord.slice(1).toLowerCase();
            result.innerHTML = `
                <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <hr>
                <br>
                <div class="details">
                    <p>${data[0].xml}</p>
                </div> 
            `;
        })
        .catch(() => {
            fetch(`${urlAlternativa}${inpWord}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log('Aqui');
                    console.log(!Array.isArray(data));
                    console.log(!Array.isArray(data));
                    console.log(!Array.isArray(data) || data.length !== 0);
                    console.log(data);
                    result.innerHTML = `
                    <h3 class="error" >Não encontrei essa palavra</h3> 
                    <hr>
                    `
                    if(!Array.isArray(data) || data.length !== 0){
                        let html = `
                    <spam>Veja palavras semelhantes: </spam>
                    <div class="details" id="semelhantes">
                        `;
                        for(let i=0; i<data.length; i++){
                            html += `<p onclick="clickBtn('${data[i]}')">${data[i]}</p>`;
                        }
                        html +=`
                    </div>
                    `
                    console.log(result.innerHTML += html);
                };
                    
                })
        });
});

function playSound(){
    sound.play();
}

function clickBtn(palavra){
    document.getElementById("inp-word").value = palavra;
    btn.click(); 
}