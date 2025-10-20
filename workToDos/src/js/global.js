const userInputId = document.getElementById('userInput');
const btnEnterId = document.getElementById('enter');
const ulTaskId = document.getElementById('task');

btnEnterId.addEventListener('click', () => sendInput());
userInputId.addEventListener('keydown',(event) => {
    if (event.key === 'Enter') {
            sendInput();
        }
    });

const sendInput = () => {
    createTask();
    deleteInputText();
}

const deleteInputText = () => {
    userInputId.value = '';
}

const createTask = () => {

    let inputValue = userInputId.value.trim();

    if (inputValue !== '') {

        let li = document.createElement('li');
        li.innerText = inputValue;
        ulTaskId.appendChild(li);
    
        li.addEventListener('click',() => crossOut());

        const crossOut = () => {
            li.style.background = 'green';
            btn.style.color = 'white';
        }

        let btn = document.createElement('button');
        btn.innerText += 'X';
        btn.addEventListener('click',() => deleteTask());
        li.appendChild(btn)
        
        const deleteTask = () => {
            li.remove();
        }

    }

}