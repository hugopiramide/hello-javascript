const userInputId = document.getElementById('userInput');
const btnEnterId = document.getElementById('enter');
const ulMainListId = document.getElementById('ulMainList');

btnEnterId.addEventListener('click', () => btnSend());

const btnSend = () => {
   const inputValue = userInputId.value.trim();
    if (inputValue !== '') {
        let li = document.createElement('li');
        li.innerText = inputValue;
        ulMainListId.appendChild(li);
        userInputId.value = '';
    }
}