import * as core from '@actions/core'

function login_linux(api_key: string): void {
  core.debug(`Placing API key ${api_key} in $HOME/.config/shuttle/config.toml`)
}

export {login_linux}
