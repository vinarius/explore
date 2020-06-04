window.addEventListener('DOMContentLoaded', () => {
    const stringToBinary = (str) => {
        let binary = "";
        str.split("").forEach((character) => {
            let test = character;
            test = test.charCodeAt(0);
            test = test.toString(2);
            test = test.padStart(8, '0');
            binary += test;
            // binary += character.charCodeAt(0)
            //     .toString(2)
            //     .padStart(8,'0');
        })
        return binary;
    }

    const binaryToString = (binary) => {
        let string = "";
        let bytes = binary.match(/.{8}/g);
        bytes.forEach(el => {
            let ascii = parseInt(el, 2);
            string += String.fromCharCode(ascii);
        })
        return string;
    }

    const alphabet = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
    ];

    // alphabet.forEach(letter => console.log(letter.charCodeAt(0))); // 97 - 122
    console.log(binaryToString('01100001'));

});