import * as core from '@actions/core'
import {place_api_key} from './setup_api_keys'

async function run(): Promise<void> {
  try {
    core.debug('Running shuttle-login action')
    core.debug('Reading shuttle-api-key input')
    const api_key = core.getInput('shuttle-api-key')
    core.debug('Successfully read shuttle-api-key input')
    core.debug('Checking Operating System')
    if (process.env.RUNNER_OS === 'Linux') {
      core.debug('Operating System is Linux')
      core.debug('Placing API key in appropriate location')
      await place_api_key(api_key)
      core.debug('Successfully placed API key in appropriate location')
      core.setOutput('login-status', 'success')
    } else {
      core.debug('Operating System is not Linux')
      core.debug('Operating System is not supported')
      core.debug('Setting action as failed')
      core.setFailed('Non-linux operating systems are not supported')
    }
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

run()
