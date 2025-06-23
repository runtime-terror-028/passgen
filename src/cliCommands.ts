import { Checkbox, Confirm, prompt, Number, Select, Toggle } from "@cliffy/prompt";
import {PasswordOptions, UserPasswordSettings} from "../main.d.ts";

export async function initCLI(): Promise<UserPasswordSettings> {
    console.clear();
    console.log("=====| Password Generator |=====\n");

    const passwordOptions: PasswordOptions = await prompt([
        {
            name: "length",
            message: "Enter password length",
            type: Number,
            min: 1,
        },
        {
            name: "isLowercase",
            message: "Do you want to add lowercase characters in your password?",
            type: Confirm,
        },
        {
            name: "isUppercase",
            message: "Do you want to add uppercase characters in your password?",
            type: Confirm,
        },
        {
            name: "isNumbers",
            message: "Do you want to add numbers in your password?",
            type: Confirm,
        },
        {
            name: "isSymbols",
            message: "Do you want to add all default symbolic characters in your password?",
            type: Confirm,
        },
    ]);


    let customSymbols: string[] = [];

    if (!passwordOptions.isSymbols) {
        const { customSymbols: selectedSymbols } = await prompt([
            {
                name: "customSymbols",
                message: "Select using <space> to add any special characters in your password. Press Enter to confirm:",
                type: Checkbox,
                options: [
                    '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/',
                    ':', ';', '<', '=', '>', '?', '@',
                    '[', '\\', ']', '^', '_', '`',
                    '{', '|', '}', '~'
                ],
            }
        ]);
        if (selectedSymbols) {
            customSymbols = selectedSymbols;
        } else {
            customSymbols = [];
        }

    }

    return {
        passwordOptions,
        customSymbols,
    };
}

export async function askShowPasswordOption(): Promise<string> {
    const showPasswordOption: string = await Select.prompt({
        message: "How you want to view your password?",
        options: [
            { name: "Show password here", value: "cli" },
            { name: "Save it as .txt", value: "txt" },
            { name: "Save it in database", value: "database", disabled: true },
        ],
    });

    if (!["cli", "txt", "database"].includes(showPasswordOption)) {
        console.error(showPasswordOption);
        console.error("❌ Error selecting show password options")
        Deno.exit(1);
    }
    return showPasswordOption;
}

export async function askRestartCLI(): Promise<boolean> {
    return await Toggle.prompt("Generate another password?");
}
