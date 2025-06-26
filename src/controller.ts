import { UserPasswordSettings, GetCredResult } from "../main.d.ts";
import {
  askPasswordConfiguration,
  askSavePassword,
  cliShowAllCredentials,
  taskCompleteExitToMainMenu,
} from "./cliCommands.ts";
import generatePassword from "./passwordGenerater.ts";
import { createNewCredentials, getAllCredentials } from "./db-controller.ts";

export async function taskGeneratePassword(): Promise<null | void> {
  console.clear();
  //ask user for password config
  const passwordConfig: UserPasswordSettings = await askPasswordConfiguration();

  //generate password
  let generatedPassword: string = "";
  try {
    generatedPassword = generatePassword(
      passwordConfig.passwordOptions.length,
      passwordConfig.passwordOptions.isLowercase,
      passwordConfig.passwordOptions.isUppercase,
      passwordConfig.passwordOptions.isNumbers,
      passwordConfig.passwordOptions.isSymbols,
      passwordConfig.customSymbols,
    );
  } catch (_error) {
    //ask user if exit main menu or exit program
    const goToMainMenu: boolean = await taskCompleteExitToMainMenu("❌ Failed to generate password");
    if (!goToMainMenu) {
      Deno.exit(0);
    } else return null;
  }

  // if no error then show password and ask if save password to db
  const savePassword: boolean = await askSavePassword(
    passwordConfig.passwordOptions.username,
    generatedPassword,
  );

  if (savePassword) {
    const status: "success" | "failed" = createNewCredentials(
      passwordConfig.passwordOptions.platform,
      passwordConfig.passwordOptions.username,
      generatedPassword,
    );
    if (status === "failed") {
      const goToMainMenu: boolean = await taskCompleteExitToMainMenu("❌ Failed to save credentials");
      if (!goToMainMenu) {
        Deno.exit(0);
      } else return null;
    } else if (status === "success") {
      const goToMainMenu: boolean = await taskCompleteExitToMainMenu("✅ Credentials saved successfully");
      if (!goToMainMenu) {
        Deno.exit(0);
      } else return null;
    }
  }
}

export async function taskShowAllCredentials(): Promise<null | void> {
  console.clear();

  const result: GetCredResult = getAllCredentials();
  if (result.success === true) {
    const goToMainMenu: boolean = await cliShowAllCredentials(result.data);
    if (!goToMainMenu) {
      Deno.exit(0);
    } else return null;
  } else if (result.success === false) {
    const goToMainMenu: boolean = await taskCompleteExitToMainMenu("❌ Failed to retrieve credentials");
    if (!goToMainMenu) {
      Deno.exit(0);
    } else return null;
  }
}