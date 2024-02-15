const myNumSystem = (characterSet) => {
    const characterArray = characterSet.split('');
    const checkIfFirst0 = () => {
        if (!(characterArray[0] === '0')) throw new Error('Character set should start with 0 (zero)')
    };
    const findDuplicate = () => {
        const seen = new Set();
        for (const char of characterArray) {
            if (seen.has(char)) {
                throw new Error(`Duplicate character in set: ${char}`);
            }
            seen.add(char);
        }
    };
    const checkIfCorrectNumber = (string) => {
        if (!string.split('').every(char => characterSet.includes(char))) throw new Error('There is no such symbol in passed set! Use only characters from passed set.');
    };
    checkIfFirst0();
    findDuplicate();
    const self = {
        decimalToMySystem: (number) => {
            number = parseInt(number);
            if (typeof number == NaN) throw new Error('You passed string to decimalToBase62(). You should pass a number')
            if (number === 0) return '0';
            if (number < 0) throw new Error('myNumSystem works only with positive numbers');
            let base62Number = '';
            while (number > 0) {
                base62Number = characterSet[number % 62] + base62Number;
                number = Math.floor(number / 62);
            }
            return base62Number;
        },
        mySystemToDecimal: (string) => {
            string = string + '';
            checkIfCorrectNumber(string);
            let number = 0;
            for (let i = 0; i < string.length; i++) {
                number = number * 62 + characterSet.indexOf(string[i]);
            }
            return number;
        },
        compare: (string1, string2) => {
            if(string1 === '') return 1;
            if(string2 === '') return -1;
            string1 = string1 + '';
            string2 = string2 + '';
            checkIfCorrectNumber(string1);
            checkIfCorrectNumber(string2);
            const number1 = self.mySystemToDecimal(string1);
            const number2 = self.mySystemToDecimal(string2);
            return number1 - number2;
        },
        sort: (unsortedArrayOfBase62Numbers) => {
            return unsortedArrayOfBase62Numbers.sort((a, b) => self.compare(a, b));
        },
        nextNumber: (base62Number) => {
            base62Number = base62Number + '';
            checkIfCorrectNumber(base62Number);
            let decimalNumber = self.mySystemToDecimal(base62Number);
            return self.decimalToMySystem(decimalNumber + 1);
        },
        findFirstMissed: (base62Array) => {
            let sortedArray = self.sort(base62Array);
            for (let i = 0; i < sortedArray.length - 1; i++) {
                let current = self.mySystemToDecimal(sortedArray[i]);
                let next = self.mySystemToDecimal(sortedArray[i + 1]);
                if (next - current > 1) {
                    return self.decimalToMySystem(current + 1);
                }
            }
            return self.nextNumber(sortedArray[sortedArray.length - 1]);
        }
    };
    return self;
};
const base62CharacterSet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const base62 = myNumSystem(base62CharacterSet);