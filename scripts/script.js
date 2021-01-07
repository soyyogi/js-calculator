// elements selectors
const dark = document.querySelector('.slider');
const nums = document.querySelectorAll('.number');
const ops = document.querySelectorAll('.ops');
const opC = document.getElementById('C');
const opPlusMinus = document.getElementById('plusMinus');
const opEqual = document.getElementById('equal');
const inputH = document.getElementById('input_history');
const inputV = document.getElementById('input_value');

function insertNum(e){
    let iLength = inputV.value.length
    if(iLength === 9) {return}4
    e.preventDefault()
    inputV.value += e.target.value;
    e.target.blur()
}

function insertOp(e){
    const lastValue = inputV.value[inputV.value.length -1]
    if(inputV.value === '' || inputV.value.length === 9 || lastValue === '%' || lastValue === '/' || lastValue === '*' || lastValue === '-' || lastValue === '+'){return}
    inputV.value += e.target.value;
    e.target.blur()
}

window.addEventListener('keypress', (e) => {
    const lastValue = inputV.value[inputV.value.length -1]
    switch (e.key) {
        case 'Enter':
            calculate()
            break;

        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            if(inputV.value.length === 9) {return}
            inputV.value += e.key
            break;

        case '.':
            if(lastValue === '.' || inputV.value.length === 9){return}
            inputV.value += e.key
            break;

        case '%':
        case '/':
        case '*':
        case '+':
            if(inputV.value === '' || lastValue === '%' || lastValue === '/' || lastValue === '*' || lastValue === '-' || lastValue === '+' || inputV.value.length === 9){return}
            inputV.value += e.key
            break;

        case '-':
            if(lastValue === '%' || lastValue === '/' || lastValue === '*' || lastValue === '-' || lastValue === '+' || inputV.value.length === 9){return}
            inputV.value += e.key
            break;

        case 'Delete':
            inputV.value =''
            break;

        default:
            break;
    }
})

function calculate(){
    const lastValue = inputV.value[inputV.value.length -1]
    if(inputV.value === '' || lastValue === '%' || lastValue === '/' || lastValue === '*' || lastValue === '-' || lastValue === '+'){return}
    inputH.value = inputV.value
    if(inputV.value.includes('%')) {
        const values = inputV.value.split('%')
        inputV.value = (values[0]/100) * values[1]
    } else {
        inputV.value = eval(inputV.value)
    }
}

// insert events

nums.forEach(num => num.addEventListener('click', insertNum))
ops.forEach(op => op.addEventListener('click', insertOp))
opEqual.addEventListener('click', calculate)

// cancel button events

opC.addEventListener('click', (e) => {
    inputV.value =''
    e.target.blur()
})

opC.addEventListener('dblclick', (e) => {
    if(inputV.value === ''){
        inputH.value = ''
    }
    e.target.blur()
})

// sign change event

opPlusMinus.addEventListener('click', (e) => {
    inputV.value *= -1
    e.target.blur()
})

// dark mode event
dark.addEventListener('click', () => {
    document.querySelector('body').classList.toggle('dark')
    document.querySelector('.container').classList.toggle('container_dark')
    document.querySelector('header').classList.toggle('header_dark')
    inputV.classList.toggle('input_dark')
    inputH.classList.toggle('input_dark')
    document.querySelectorAll('.operator').forEach(el => el.classList.toggle('operator_dark'))
    nums.forEach(el => el.classList.toggle('number_dark'))
    opEqual.classList.toggle('equal_dark')
})