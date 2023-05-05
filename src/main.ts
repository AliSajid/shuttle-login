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
    } else {
      core.debug('Operating System is not Linux')
      core.debug('Operating System is not supported')
      core.debug('Setting action as failed')
      core.setFailed('Operating System is not supported')
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
