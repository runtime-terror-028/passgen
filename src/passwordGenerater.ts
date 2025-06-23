const LOWERCASE_CHARS: string = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE_CHARS: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMERIC_CHARS: string = "0123456789";
const SYMBOL_CHARS: string = "!\"#$%&'()*+,-./";

//generates a random password
export default function generatePassword(
    length: number,
    useLowercase: boolean,
    useUppercase: boolean,
    useNumbers: boolean,
    useSymbols: boolean,
    customSymbols: string[]
): string {

    const availableSets: string[] = generateAvailableSets(useLowercase, useUppercase, useNumbers, useSymbols, customSymbols);
    const guaranteedChars: string[] = generateGuaranteedChars(useLowercase, useUppercase, useNumbers, useSymbols, customSymbols);


    if (availableSets.length === 0) {
        throw new Error("At least one character type must be selected!!")
    }

    const allChars = availableSets.join("");
    const remainingLength = length - guaranteedChars.length;

    const resultChars = [...guaranteedChars];

    for (let i = 0; i < remainingLength; i++) {
        resultChars.push(randomChar(allChars));
    }

    return shuffleArray(resultChars).join("");
}

//generates an array of characters that can be used for password
export function generateAvailableSets(
    useLowercase: boolean,
    useUppercase: boolean,
    useNumbers: boolean,
    useSymbols: boolean,
    customSymbols: string[]
): string[] {

    const availableSets: string[] = [];

    if (useLowercase) availableSets.push(LOWERCASE_CHARS);
    if (useUppercase) availableSets.push(UPPERCASE_CHARS);
    if (useNumbers) availableSets.push(NUMERIC_CHARS);
    if (useSymbols) availableSets.push(SYMBOL_CHARS);
    if (!useSymbols && customSymbols.length > 0) {
        availableSets.push(customSymbols.join(""));
    }

    return availableSets;
}

//generates an array of characters that are guaranteed to be added in the password
function generateGuaranteedChars(
    useLowercase: boolean,
    useUppercase: boolean,
    useNumbers: boolean,
    useSymbols: boolean,
    customSymbols: string[]
): string[] {

    const guaranteedChars: string[] = [];

    if (useLowercase) guaranteedChars.push(randomChar(LOWERCASE_CHARS));
    if (useUppercase) guaranteedChars.push(randomChar(UPPERCASE_CHARS));
    if (useNumbers) guaranteedChars.push(randomChar(NUMERIC_CHARS));
    if (useSymbols) guaranteedChars.push(randomChar(SYMBOL_CHARS));
    if (!useSymbols && customSymbols.length > 0) {
        guaranteedChars.push(customSymbols.join(""));
    }

    return guaranteedChars;
}

//string randomizer
function randomChar(str: string): string {
    return str[Math.floor(Math.random() * str.length)];
}

//shuffles string array
function shuffleArray(arr: string[]): string[] {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}