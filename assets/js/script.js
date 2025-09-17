const calculator = {
    result: 0,
    firstNumber: '',
    operator: '',
    secondNumber: ''
};

const operators = ['+', '-', '*', '/'];
const operation = document.getElementById('operation');
const operationResult = document.getElementById('operation-result');

function clearAll() {
    calculator.result = 0;
    calculator.firstNumber = '';
    calculator.secondNumber = '';
    calculator.operator = '';
    refreshDisplay();
}

function deleteLast() {
    if(calculator.secondNumber.length > 0){
        calculator.secondNumber = calculator.secondNumber.slice(0, -1);    
    }else if(calculator.operator.length > 0){
        calculator.operator = '';
    }else if(calculator.firstNumber.length > 0){
        calculator.firstNumber = calculator.firstNumber.slice(0, -1);
    }
    refreshDisplay();
}

function addNumber(number) {
    let numberValue = number.innerHTML;
    if(calculator.operator.length > 0){
        calculator.secondNumber += numberValue;
    }else{
        calculator.firstNumber += numberValue;
    }
    refreshDisplay();
}

function addOperator(operator) {
    console.log(calculator);
    let operatorValue = operator.innerHTML;

    if(calculator.result.length > 0){
        calculator.firstNumber = calculator.result;
        calculator.result = 0;
        calculator.secondNumber = '';
    }

    if(calculator.firstNumber.length > 0 && calculator.secondNumber.length > 0){
        calculate();
        addOperator(operator);
        return;
    }

    if(operators.includes(operatorValue)){
        calculator.operator = operatorValue;
    }
    refreshDisplay();
}

function refreshDisplay(){
    let calcResult = `${calculator.result}`;

    if(calcResult.length > 11){
        clearAll();
        operationResult.innerHTML = 'ERROR';
    }else{
        operation.innerHTML = calculator.firstNumber + calculator.operator + calculator.secondNumber;
        operationResult.innerHTML = calculator.result;
    }
}

function calculate(){
    let result = 0;
    switch(calculator.operator){
        case '+':
            result = parseFloat(calculator.firstNumber) + parseFloat(calculator.secondNumber);
            break;
        case '-':
            result = parseFloat(calculator.firstNumber) - parseFloat(calculator.secondNumber);
            break;
        case '*':
            result = parseFloat(calculator.firstNumber) * parseFloat(calculator.secondNumber);
            break;
        case '/':
            result = parseFloat(calculator.firstNumber) / parseFloat(calculator.secondNumber);
            break;
    }

    let calculatedResult = result.toString();

    if(calculatedResult.indexOf('.') > -1){
        let splitResult = calculatedResult.split('.');
        if(splitResult[1].length > 4){
            result = parseFloat(result.toFixed(4));
        }
    }

    calculator.result = `${result}`;
    refreshDisplay();
}

window.addEventListener('DOMContentLoaded', function(){
    refreshDisplay();
});