export interface PasswordOptions {
    length: number;
    isLowercase: boolean
    isUppercase: boolean
    isNumbers: boolean
    isSymbols: boolean
}

export interface UserPasswordSettings {
    passwordOptions: PasswordOptions;
    customSymbols: string[];
}

export type ShowPasswordOptions = "cli" | "txt" | "database";