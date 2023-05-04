import * as core from '@actions/core'
import {login_linux} from './login_linux'
import {login_mac} from './login_mac'
import {login_windows} from './login_windows'

async function run(): Promise<void> {
  try {
    const api_key = core.getInput('shuttle-api-key')
    core.debug(`Running on OS ${process.env.RUNNER_OS}`)
    switch (process.env.RUNNER_OS) {
      case 'Linux':
        login_linux(api_key)
        break
      case 'macOS':
        login_mac(api_key)
        break
      case 'Windows':
        login_windows(api_key)
        break
    }
    core.debug('Goodbye World!')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
