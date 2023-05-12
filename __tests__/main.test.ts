import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import * as core from '@actions/core'
import {expect, test} from '@jest/globals'

describe('Main action runs properly', () => {
  it('runs with linux', () => {
    process.env['RUNNER_OS'] = 'Linux'
    process.env['INPUT_SHUTTLE-API-KEY'] = 'my-api-key'
    const np = process.execPath
    const ip = path.join(__dirname, '..', 'lib', 'main.js')
    const options: cp.ExecFileSyncOptions = {
      env: process.env
    }

    expect(cp.execFileSync(np, [ip], options).toString())
      .toBe(`::debug::Running shuttle-login action
::debug::Reading shuttle-api-key input
::debug::Successfully read shuttle-api-key input
::debug::Checking Operating System
::debug::Operating System is Linux
::debug::Placing API key in appropriate location
::debug::$HOME: ${process.env.HOME}
::debug::$XDG_CONFIG_HOME: ${process.env.XDG_CONFIG_HOME}
::debug::Setting the appropriate base directory for the config file
::debug::config_base_dir: ${process.env.HOME}/.config
::debug::Creating base directory if it does not exist
::debug::Creating directory: ${process.env.HOME}/.config/shuttle
::debug::Successfully created directory: ${process.env.HOME}/.config/shuttle
::debug::Writing to file: ${process.env.HOME}/.config/shuttle/config.toml
::debug::Successfully wrote ${process.env.HOME}/.config/shuttle/config.toml
::debug::Successfully placed API key in appropriate location

::set-output name=login-status::success
`)
  })

  it('fails without api key', () => {
    process.env['RUNNER_OS'] = 'Linux'
    process.env['INPUT_SHUTTLE-API-KEY'] = ''
    const np = process.execPath
    const ip = path.join(__dirname, '..', 'lib', 'main.js')
    const options: cp.SpawnSyncOptions = {
      shell: true,
      env: process.env
    }
    const result = cp.spawnSync(np, [ip], options)

    expect(result.stdout.toString()).toBe(`::debug::Running shuttle-login action
::debug::Reading shuttle-api-key input
::debug::shuttle-api-key input is empty
::debug::Setting action as failed
::error::shuttle-api-key input is required
`)
  })

  it('fails without linux', () => {
    process.env['RUNNER_OS'] = 'Windows'
    process.env['INPUT_SHUTTLE-API-KEY'] = 'my-api-key'
    const np = process.execPath
    const ip = path.join(__dirname, '..', 'lib', 'main.js')
    const options: cp.SpawnSyncOptions = {
      shell: true,
      env: process.env
    }

    const result = cp.spawnSync(np, [ip], options)

    expect(result.status).not.toBe(0)

    expect(result.stdout.toString()).toBe(`::debug::Running shuttle-login action
::debug::Reading shuttle-api-key input
::debug::Successfully read shuttle-api-key input
::debug::Checking Operating System
::debug::Operating System is not Linux
::debug::Operating System is not supported
::debug::Setting action as failed
::error::Non-linux operating systems are not supported
`)
  })
})
