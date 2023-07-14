module.exports={
    add: (num1, num2) => {
        if(isNaN(num1)||isNaN(num2)){
            throw new Error("Valores inválidos");
        };
        return num1 + num2; 
    },
    sustraction: (num1, num2) => {
        if(isNaN(num1) || isNaN(num2)){
            throw new Error("Valores inválidos");
        };
        return num1 - num2;
    },
    multiplication: (num1, num2) => {
        if(isNaN(num1) || isNaN(num2)){
            throw new Error("Valores inválidos");
        };
        return num1 * num2;
    },
    division: (dividend, divisor) => {
        if(isNaN(dividend) || isNaN(divisor)){
            throw new Error("Valores inválidos");
        };
        if(divisor === 0){
            throw new Error("División por cero");
        };
        return dividend / divisor;
    },
    sumArray: (values) => {
        let sum = 0;

        for (const value of values) {
        if(isNaN(value)){
            throw new Error("Valores inválidos")
        }    
        sum += value;
        };
        return sum;
    }

}