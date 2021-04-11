const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButtons = document.querySelector("[data-equals]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const pointButton = document.querySelector("[data-decimal]");
const screen = document.querySelector("[data-screen]");


const percentButton = document.querySelector("[data-percentage]");



let firstNumber = "";
let secondNumber = "";
let currentOperation = null;
let shouldResetScreen = false; 

window.addEventListener("keydown", setInput);
equalsButtons.addEventListener("click", evaluate); 
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNumber);
pointButton.addEventListener("click", appendPoint);

numberButtons.forEach((button)  =>
    button.addEventListener("click", () => appendNumber(button.textContent))
); 

operatorButtons.forEach((button) =>
    button.addEventListener("click", () => setOperation(button.textContent))
);

function appendNumber(number){
    if (screen.textContent === "0" || shouldResetScreen) resetScreen();
    screen.textContent += number;
}

function resetScreen(){
    screen.textContent = "";
    shouldResetScreen = false;
}

function clear(){
    screen.textContent = "0";
    firstNumber = "";
    secondNumber = "";
    currentOperation = null;
}

function appendPoint(){
    if (shouldResetScreen) resetScreen();
    if (screen.textContent === "") screen.textContent = "0";
    if (screen.textContent.includes(".")) return;
    screen.textContent += ".";
}

function deleteNumber(){
    screen.textContent = screen.textContent.toString().slice(0, -1);
}

function setOperation(operator){
    if(currentOperation !== null) evaluate();
    firstNumber = screen.textContent;
    currentOperation = operator;
    shouldResetScreen = true;
}

function evaluate(){
    if(currentOperation === null || shouldResetScreen) return;
    
    if(currentOperation === "/" && screen.textContent === "0") {
        alert("you cannot divide by 0!");
        clear();
        return;
    }
    
    secondNumber = screen.textContent;
    screen.textContent = roundResult(
        operate(currentOperation, firstNumber, secondNumber)
    );
    currentOperation = null;
    
}

function roundResult(number){
    return Math.round(number * 1000) / 1000;
}

function percentCal(){

}

function setInput(e){
    if(e.key >= 0 && e.key <=9) appendNumber(e.key);
    if(e.key === ".") appendPoint();
    if(e.key === "=") evaluate();
    if(e.key === "DEL") deleteNumber();
    if(e.key === "AC") clear();
    if(e.key === "+" || e.key === "-" || e.key === "x" || e.key === "/" || e.key === "%")  
        setOperation(convertOperator(e.key));
}

function convertOperator(keyboardOperator){
    if (keyboardOperator === "/") return "/"
    if (keyboardOperator === "x") return "*"
    if (keyboardOperator === "+") return "+"
    if (keyboardOperator === "-") return "-"
    if (keyboardOperator === "%") return "%"
    
}


function add(a,b){
    return a + b;
}


function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a / b;
}

function percen(a,b){
    return (a / 100) * b; 
}

function operate(operator, a, b){
    a = Number(a);
    b = Number(b);
    
    switch (operator){
        case "+":
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "x":
            return multiply(a,b);
        case "%":
            return percen(a,b);
        case "/":
            if (b === 0) return null;
            else return divide (a,b);
        default:
            return null ;

    }
}
