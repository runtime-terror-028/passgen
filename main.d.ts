export interface PasswordOptions {
    platform: string;
    username: string;
    length: number;
    isLowercase: boolean;
    isUppercase: boolean;
    isNumbers: boolean;
    isSymbols: boolean;
}

export interface UserPasswordSettings {
    passwordOptions: PasswordOptions;
    customSymbols: string[];
}

export type ShowPasswordOptions = "cli" | "txt" | "database";

export type Credential = {
    id: number;
    platform: string;
    username: string;
    password: string;
    created_at: string;
};

export type GetCredResult = { success: true; data: Credential[] } | { success: false; error: string };