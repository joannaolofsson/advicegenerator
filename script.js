
const adviceTitle = document.getElementById('advice-title');
const adviceDesc = document.getElementById('advice');
const fetchAdviceBtn = document.getElementById('fetch-advice-btn');
const saveAdviceBtn = document.getElementById('save-advice-btn');
const adviceList = document.getElementById('advice-list');
let myArray = [];

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

/* ----- Save advice to local storage ----- */ 

const toLocalStorage = () => {
    localStorage.setItem('myArray', JSON.stringify(myArray));
}

/* ----- This READS advice from local storage to displaying it in the DOM ----- */ 

const loadAdviceFromLocalStorage = () => { 
    const storedAdvice = localStorage.getItem('myArray') || [];
    if (storedAdvice) {
        myArray = JSON.parse(storedAdvice);
        renderAdvice();
    }
}

const renderAdvice = () => {
    adviceList.innerHTML = "";
    myArray.forEach((advice, i) => {
        const adviceItem = document.createElement('li');
        const deleteBtn = document.createElement('button');

        const editBtn = document.createElement('button');

        adviceItem.innerText = `${advice.text}`;
        deleteBtn.innerText = 'Delete';
        editBtn.innerText = 'Edit';

        adviceItem.classList.add('advice-col-one');
        deleteBtn.classList.add('delete-btn');
        editBtn.classList.add('edit-btn');

        deleteBtn.onclick = () => deleteAdvice(i);
        editBtn.onclick = () => editAdvice(i);

        adviceItem.append(deleteBtn, editBtn);
        adviceList.appendChild(adviceItem);
    });
}


/* ------ This CREATES advice for the advicelist ----- */
const saveAdvice = () => {
    const title = adviceTitle.innerText;
    const text = adviceDesc.innerText;
    if (title && text) {
        myArray.push({ title, text });
        toLocalStorage();
        renderAdvice();
    }
}

/* ----- This UPDATES the adviceList ----- */
const editAdvice = (i) => {
    const newTitle = prompt('Edit your advice title:', myArray[i].title);
    const newText = prompt('Edit your advice:', myArray[i].text);
    if(newTitle !== null && newTitle.trim() && newText !== null && newText.trim()) {
        myArray[i] = { title: newTitle.trim(), text: newText.trim() };
        toLocalStorage();
        renderAdvice();
    }
}

/* ----- This functiion DELETES the advice from my list ----- */
const deleteAdvice = (index) => {
    myArray.splice(index, 1);
    toLocalStorage();
    renderAdvice();
}

/* -----0 Loads my advice from local storage ----- */
loadAdviceFromLocalStorage();

/*----- Buttons that I use to get the next advice and save / display on my list ----- */
fetchAdviceBtn.addEventListener('click', fetchAdvice); 
saveAdviceBtn.addEventListener('click', saveAdvice); 
