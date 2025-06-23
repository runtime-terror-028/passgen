import { initCLI, askShowPasswordOption, askRestartCLI } from "./src/cliCommands.ts";
import { UserPasswordSettings} from "./main.d.ts"
import generatePassword from "./src/passwordGenerater.ts"
import { savePasswordToTxt } from "./src/util.ts";


async function init(){
    //ask user for password settings
    const userPasswordSettings: UserPasswordSettings = await initCLI();

    console.log("🔃 Generating your password ...")

    let generatedPassword: string = "";

    try {
        //generate password
        generatedPassword = generatePassword(
            userPasswordSettings.passwordOptions.length,
            userPasswordSettings.passwordOptions.isLowercase,
            userPasswordSettings.passwordOptions.isUppercase,
            userPasswordSettings.passwordOptions.isNumbers,
            userPasswordSettings.passwordOptions.isSymbols,
            userPasswordSettings.customSymbols
        )
    } catch (error) {
        console.error(`❌ Failed to generate password: ${error}`);
        await restartCli();
    }

    console.log("✅ Password generated successfully.");

    const showPasswordOption: string = await askShowPasswordOption();

    if (showPasswordOption === "cli") {
        console.log(`🔑 Generated password: ${generatedPassword}`);
        await restartCli();
    } else if (showPasswordOption === "txt") {
      await savePasswordToTxt(generatedPassword);
      await restartCli();
    } else {
        console.error(`❌ This option is not available yet!`)
    }
}

async function restartCli() {
    if (!await askRestartCLI()) {Deno.exit(0);}
    await init();
}


await init();