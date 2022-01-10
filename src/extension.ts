import { commands, tasks, ExtensionContext, Task, window, extensions } from "vscode";
import { configuration } from "./configuration";

export function activate(context: ExtensionContext) {


  context.subscriptions.push(
    commands.registerCommand(
      "vscode-theme-studio-helper.build-file",
      async () => {
        
        const workspaceTasks = (await tasks.fetchTasks()).filter(
          (task: Task) => task.name === "Generate Types"
        );
        if (!workspaceTasks.length) {
          window.showErrorMessage("Generate Types is not found.");
          return;
        }
        const task = workspaceTasks[0];
        await tasks.executeTask(task);
        window.showInformationMessage("Build completed.");
      }
    )
  );


  const materialIconExtension = extensions.getExtension("pkief.material-icon-theme");
  if (materialIconExtension) {
    
    if (configuration.get("show-icons")) {
      console.log("Showing icons");
    }

  }
}

export function deactivate() {}
