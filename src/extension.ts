import { commands, tasks, ExtensionContext, Task, window } from "vscode";

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
}

export function deactivate() {}
