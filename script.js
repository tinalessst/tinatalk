let memory = {
    topic: "",
    mood: ""
};
const input = document.getElementById("userInput");
const send = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");
const typing = document.getElementById("typing");



send.onclick = kirim;

input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        kirim();
    }
});

// ==============================
// RANDOM
// ==============================


function random(arr){
    return arr[Math.floor(Math.random()*arr.length)];
}

// ==============================
// KIRIM
// ==============================

function kirim() {

    let text = input.value.trim();

    if (text === "") return;

    tambahUser(text);

    input.value = "";

    typing.style.display = "block";

    setTimeout(() => {

        typing.style.display = "none";

        let jawaban = cariJawaban(text);

        tambahBot(jawaban);

        localStorage.setItem("chat", chatBox.innerHTML);

    }, 800);

}

// ==============================
// LOAD CHAT
// ==============================

window.onload = function () {

    let data = localStorage.getItem("chat");

    if (data) {
        chatBox.innerHTML = data;
    }

};

// ==============================
// USER MESSAGE
// ==============================

function tambahUser(text) {

    chatBox.innerHTML += `
    <div class="message user">
        <div class="bubble">${text}</div>
    </div>
    `;

    scrollBawah();

}

// ==============================
// BOT LOGIC
// ==============================

function cariJawaban(text){

text = text.toLowerCase();


// ====================
// DATABASE TINA
// ====================

for(let data of knowledge){

    for(let key of data.keywords){

        if(text.includes(key)){

            if(data.answers){

                return{
                    answer:random(data.answers)
                }

            }

            return data;

        }

    }

}


// ====================
// CURHAT
// ====================

if(/sedih|kecewa|galau|capek|nangis|stress/.test(text)){

memory.topic="curhat";

return{

answer:random([

"Yahh 🤍 kenapa emangnya?",

"Aww... cerita aja kalau mau.",

"Pasti lagi berat ya. Aku dengerin kok."

])

};

}


// ====================
// SENANG
// ====================

if(/senang|bahagia|lolos|berhasil|naik/.test(text)){

memory.topic="senang";

return{

answer:random([

"YEAYY 🥳",

"Wah selamat yaa!",

"Asik banget dengernya 🤍"

])

};

}


// ====================
// USER MENJAWAB LANJUTAN
// ====================

if(/iya|iyaa|iya sih|bener|betul/.test(text)){

if(memory.topic=="curhat"){

return{

answer:random([

"Hmm... mau cerita lebih lanjut ga?",

"Aku dengerin kok 🤍",

"Pelan-pelan aja ceritanya."

])

};

}

if(memory.topic=="senang"){

return{

answer:random([

"Semoga makin banyak kabar baik ya.",

"Ikut seneng bacanya 😭",

"Rayain dong 😂"

])

};

}

}


// ====================
// MAKAN
// ====================

if(text.includes("makan")){

return{

answer:random([

"Makan apa? 😭",

"Enak ga?",

"Jangan bilang mie instan lagi 😂"

])

};

}


// ====================
// GABUT
// ====================

if(text.includes("gabut")){

return{

answer:random([

"Gabut level berapa nih? 😂",

"Main game apa tidur? 😭",

"Gabut juga ya wkwkwk."

])

};

}


// ====================
// DEFAULT
// ====================

return{

answer:random([

"Hmm... aku belum begitu ngerti 😭",

"Boleh ceritain lebih jelas ga?",

"Aku masih nyimak nih 👀",

"Terus gimana?",

"Aku penasaran deh."

])

};

}
// ==============================
// BOT MESSAGE
// ==============================

function tambahBot(data) {

    let isi = `<div class="bubble">${data.answer}`;

    if (data.image) {
        isi += `<br><img src="${data.image}" class="chat-image">`;
    }

    if (data.audio) {

        isi += `
        <br><br>
        <audio controls>
            <source src="${data.audio}" type="audio/mpeg">
        </audio>
        `;

    }

    isi += `</div>`;

    chatBox.innerHTML += `
    <div class="message bot">
        <div class="icon">🤍</div>
        ${isi}
    </div>
    `;

    scrollBawah();

}

// ==============================
// SCROLL
// ==============================

function scrollBawah() {

    chatBox.scroll({

        top: chatBox.scrollHeight,

        behavior: "smooth"

    });

}

// ==============================
// CONTOH PERTANYAAN
// ==============================

document.querySelectorAll(".question").forEach(btn => {

    btn.onclick = function () {

        input.value = this.innerText;

        kirim();

    };

});

// ==============================
// CHAT BARU
// ==============================

document.querySelector(".newChat").onclick = function () {

    localStorage.removeItem("chat");

    chatBox.innerHTML = `
    <div class="message bot">
        <div class="icon">🤍</div>
        <div class="bubble">
            Haiii 👋<br><br>
            Aku TinaTalk 🤍<br><br>
            Tanya apa aja ya 😊
        </div>
    </div>
    `;

};

/* ===========================
   SPLASH SCREEN
=========================== */

window.addEventListener("load",()=>{

const splash=document.getElementById("splash");

setTimeout(()=>{

splash.classList.add("hide");

},2700);

});