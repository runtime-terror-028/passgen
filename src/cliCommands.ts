import {
  Checkbox,
  Confirm,
  Number,
  prompt,
  Select,
  Input
} from "@cliffy/prompt";
import { Table } from "@cliffy/table";
import {Credential, PasswordOptions, UserPasswordSettings} from "../main.d.ts";

export async function askTask(): Promise<string> {
  const task: string = await Select.prompt({
    message: "What you wonna do bro?",
    options: [
      { name: "Generate a new password", value: "generate_password" },
      { name: "Search saved password", value: "search_credentials" },
      { name: "Show all credentials", value: "show_all_credentials" },
      { name: "Edit credentials credentials", value: "edit_credentials" },
      { name: "Save all credentials to .txt file", value: "save_all_txt" },
      { name: "Exit", value: "exit" },
    ],
  });
  return task;
}

export async function askPasswordConfiguration(): Promise<UserPasswordSettings> {
  const passwordOptions: PasswordOptions = await prompt([
    {
      name: "platform",
      message: "💻 What platform is this password for?",
      type: Input
    },
    {
      name: "username",
      message: "👤 What will be the username for this password?",
      type: Input
    },
    {
      name: "length",
      message: "📏 Password length",
      type: Number,
      min: 4,
    },
    {
      name: "isLowercase",
      message: "🔽 Include Lowercase?",
      type: Confirm,
    },
    {
      name: "isUppercase",
      message: "🔼 Include Uppercase?",
      type: Confirm,
    },
    {
      name: "isNumbers",
      message: "🔢 Include Numbers?",
      type: Confirm,
    },
    {
      name: "isSymbols",
      message:
        "🔣 Include Symbols?",
      type: Confirm,
    },
  ]);

  let customSymbols: string[] = [];

  if (!passwordOptions.isSymbols) {
    const { customSymbols: selectedSymbols } = await prompt([
      {
        name: "customSymbols",
        message:
          "Select using <space> to include any special characters. Press Enter to confirm:",
        type: Checkbox,
        options: [
          "!",
          '"',
          "#",
          "$",
          "%",
          "&",
          "'",
          "(",
          ")",
          "*",
          "+",
          ",",
          "-",
          ".",
          "/",
          ":",
          ";",
          "<",
          "=",
          ">",
          "?",
          "@",
          "[",
          "\\",
          "]",
          "^",
          "_",
          "`",
          "{",
          "|",
          "}",
          "~",
        ],
      },
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

// export async function askShowPasswordOption(): Promise<string> {
//   const showPasswordOption: string = await Select.prompt({
//     message: "View your password here or save it",
//     options: [
//       { name: "Show password here", value: "cli" },
//       { name: "Save it as .txt", value: "txt" },
//       { name: "Save it in database", value: "database" },
//     ],
//   });
//
//   if (!["cli", "txt", "database"].includes(showPasswordOption)) {
//     console.error(showPasswordOption);
//     console.error("❌ Error selecting show password options");
//     Deno.exit(1);
//   }
//   return showPasswordOption;
// }

export async function askSavePassword(username: string, password: string): Promise<boolean> {
  const option: boolean = await Select.prompt({
    message: `Password generated for ${username}: ${password}`,
    options: [
      { name: "Save credentials", value: true },
      { name: "Exit to main menu", value: false }
    ],
  });
  return option;
}


export async function taskCompleteExitToMainMenu(message: string): Promise <boolean> {
  const option: boolean = await Select.prompt({
    message: message,
    options: [
      { name: "Main Menu", value: true },
      { name: "Exit", value: false }
    ],
  });
  return option;
}

export async function cliShowAllCredentials(data: Credential[]): Promise<boolean> {
  new Table()
      .header(["ID", "Platform", "Username", "Password", "Created At"])
      .body(
          data.map((cred) => [
            cred.id,
            cred.platform,
            cred.username,
            cred.password,
            cred.created_at,
          ])
      )
      .border(true)
      .render();

  const option: boolean = await Select.prompt({
    message: "All Credentials loaded",
    options: [
      { name: "Main Menu", value: true },
      { name: "Exit", value: false }
    ],
  });
  return option;
}
