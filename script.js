
//MVP
// Watch Video on local storage
// Rewrite code
// Watch video on DOM manipulation 
// Rewrite code
// Animation, vid nästa kort och vid hover ev annat
// Strukturera kod - Sök efter dubletter 
// Styling - Samma som på bucket list...
// Remove ordet advice i listan
// Lägg till rubriker ev skapa en tabell istället...


const adviceTitle = document.getElementById('advice-title');
const adviceDesc = document.getElementById('advice');
const fetchAdviceBtn = document.getElementById('fetch-advice-btn');
const saveAdviceBtn = document.getElementById('save-advice-btn');
const adviceList = document.getElementById('advice-list');
let myArray = [];


/* -----Everything local storage-----*/

// Load advice from local storage
const loadAdviceFromLocalStorage = () => { 
    const storedAdvice = localStorage.getItem('myArray') || [];
    if (storedAdvice) {
        myArray = JSON.parse(storedAdvice);
        renderAdvice();
    }
}

// Save advice to local storage
const toLocalStorage = () => {
    localStorage.setItem('myArray', JSON.stringify(myArray));
}

/* ----- Fetch the API -----*/

async function fetchAdvice() {
    try {
        const response = await fetch('https://api.adviceslip.com/advice?t=', { cache: "no-cache" });
        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }
        const responseJson = await response.json();
        const data = responseJson.slip;

        console.log(data);

        const id = `ADVICE #${data.id}`;
        const advice = data.advice;

        adviceTitle.innerText = id;
        adviceDesc.innerText = advice;

    } catch (error) {
        console.error('Error fetching advice:', error);
    }
}


/* ----- Create my list in the DOM ----- */ 

const renderAdvice = () => {
    adviceList.innerHTML = "";
    myArray.forEach((advice, i) => {
        const adviceItem = document.createElement('li');
        const deleteBtn = document.createElement('button');
        const icon = document.createElement('i');
        const editBtn = document.createElement('button');
        const icon2 = document.createElement('i');

        adviceItem.innerText = `${advice.text}`;
        deleteBtn.innerText = 'Delete';
        editBtn.innerText = 'Edit';

        adviceItem.classList.add('advice-col-one');
        deleteBtn.classList.add('delete-btn');
        editBtn.classList.add('edit-btn');

        icon.className = 'fa-regular fa-square-minus'; 
        icon2.className = 'fa-regular fa-pen-to-square';

        deleteBtn.onclick = () => deleteAdvice(i);
        editBtn.onclick = () => editAdvice(i);

        deleteBtn.insertBefore(icon, deleteBtn.firstChild); 
        editBtn.insertBefore(icon2, editBtn.firstChild);

        adviceItem.append(deleteBtn, editBtn);
        adviceList.appendChild(adviceItem);
    });
}


/* ----- Displays the advice in my list ----- */
const saveAdvice = () => {
    const title = adviceTitle.innerText;
    const text = adviceDesc.innerText;
    if (title && text) {
        myArray.push({ title, text });
        toLocalStorage();
        renderAdvice();
    }
}

/* ----- Deletes the advice from my list ----- */
const deleteAdvice = (index) => {
    myArray.splice(index, 1);
    toLocalStorage();
    renderAdvice();
}

/* ----- Edits my advice in the list ----- */
const editAdvice = (i) => {
    const newTitle = prompt('Edit your advice title:', myArray[i].title);
    const newText = prompt('Edit your advice:', myArray[i].text);
    if(newTitle !== null && newTitle.trim() && newText !== null && newText.trim()) {
        myArray[i] = { title: newTitle.trim(), text: newText.trim() };
        toLocalStorage();
        renderAdvice();
    }
}

/* -----0 Loads my advice from local storage ----- */
loadAdviceFromLocalStorage();

/*----- Buttons that I use to get the next advice and save / display on my list ----- */
fetchAdviceBtn.addEventListener('click', fetchAdvice); // Är detta som de skall se ut?
saveAdviceBtn.addEventListener('click', saveAdvice); // Är detta som de skall se ut?
