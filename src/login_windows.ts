import * as core from '@actions/core'

function login_windows(api_key: string): void {
  core.debug(
    `Placing API key ${api_key} in {FOLDERID_RoamingAppData}/shuttle/config.toml`
  )
}

export {login_windows}
