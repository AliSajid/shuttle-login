import * as core from '@actions/core'

function login_mac(api_key: string): void {
  core.debug(
    `Placing API key ${api_key} in $HOME/Library/Application Support/shuttle`
  )
}

export {login_mac}
