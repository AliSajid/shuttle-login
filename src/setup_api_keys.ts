import * as core from '@actions/core'
import * as fs from 'fs'
import * as TOML from '@ltd/j-toml'
import * as path from 'path'

async function place_api_key(api_key: string): Promise<void> {
  core.debug(`$HOME: ${process.env.HOME}`)
  core.debug(`$XDG_CONFIG_HOME: ${process.env.XDG_CONFIG_HOME}`)
  core.debug('Setting the appropriate base directory for the config file')
  const config_base_dir =
    process.env.XDG_CONFIG_HOME || `${process.env.HOME}/.config`
  core.debug(`config_base_dir: ${config_base_dir}`)
  const config_path = `${config_base_dir}/shuttle/config.toml`
  const input_data = {
    api_key
  }
  const toml_data: string = TOML.stringify(input_data, {newline: '\n'})

  core.debug('Creating base directory if it does not exist')
  const directory = path.dirname(config_path)

  try {
    core.debug(`Creating directory: ${directory}`)
    await fs.promises.mkdir(directory, {recursive: true})
    core.debug(`Successfully created directory: ${directory}`)
    core.debug(`Writing to file: ${config_path}`)
    await fs.promises.writeFile(config_path, toml_data)
    core.debug(`Successfully wrote ${config_path}`)
  } catch (error: unknown) {
    let message
    if (error instanceof Error) {
      message = error.message
    } else {
      message = String(error)
    }
    core.setFailed(`Error creating file: ${message}`)
  }
}

export {place_api_key}
