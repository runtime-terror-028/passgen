import {
  askTask,
} from "./src/cliCommands.ts";
import {taskGeneratePassword, taskShowAllCredentials} from "./src/controller.ts";

async function init() {
  console.clear();
  const task: string = await askTask();

  switch (task) {
    case "generate_password":
      await taskGeneratePassword();
      await exitToMainMenu();
      break;
    case "search_credentials":
      break;
    case "show_all_credentials":
      await taskShowAllCredentials()
      await exitToMainMenu();
      break;
    case "edit_credentials":
      break;
    case "save_all_txt":
      break;
    case "exit":
      Deno.exit(0);
  }
}

async function exitToMainMenu(): Promise<void> {
  console.clear()
  await init();
}

await init();
