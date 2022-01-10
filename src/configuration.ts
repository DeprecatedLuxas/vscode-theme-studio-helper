import { ConfigurationScope, ConfigurationTarget, workspace } from "vscode";
import { Config, ConfigPath, ConfigPathValue } from "./types";

const configPrefix = "vscode-theme-studio-helper";

export class Configuration {
  get(): Config;
  get<T extends ConfigPath>(
    section: T,
    scope?: ConfigurationScope | null,
    defaultValue?: ConfigPathValue<T>
  ): ConfigPathValue<T>;
  get<T extends ConfigPath>(
    section?: T,
    scope?: ConfigurationScope | null,
    defaultValue?: ConfigPathValue<T>
  ): Config | ConfigPathValue<T> {
    return defaultValue === undefined
      ? workspace
          .getConfiguration(
            section === undefined ? undefined : configPrefix,
            scope
          )
          .get<ConfigPathValue<T>>(
            section === undefined ? configPrefix : section
          )!
      : workspace
          .getConfiguration(
            section === undefined ? undefined : configPrefix,
            scope
          )
          .get<ConfigPathValue<T>>(
            section === undefined ? configPrefix : section,
            defaultValue
          )!;
  }

  set<T extends ConfigPath>(
    section: T,
    value: ConfigPathValue<T> | undefined,
    target: ConfigurationTarget
  ): Thenable<void> {
    return workspace
      .getConfiguration(configPrefix)
      .update(section, value, target);
  }
}

export const configuration = new Configuration();
