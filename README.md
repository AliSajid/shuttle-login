# Log in to the Shuttle.rs platform

![GitHub release (latest by date)](https://img.shields.io/github/v/release/AliSajid/shuttle-login)
[![Tests](https://github.com/AliSajid/shuttle-login/actions/workflows/test.yml/badge.svg)](https://github.com/AliSajid/shuttle-login/actions/workflows/test.yml)
[![CodeQL](https://github.com/AliSajid/shuttle-login/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/AliSajid/shuttle-login/actions/workflows/codeql-analysis.yml)
![GitHub package.json version](https://img.shields.io/github/package-json/v/AliSajid/shuttle-login)
![Github Package License](https://img.shields.io/github/license/AliSajid/shuttle-login)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

This action allows you to log in to the [shuttle.rs](https://shuttle.rs) platform and perform subsequent actions. At the moment, this action takes the `api-key` secret and injects that into the runner environment.

As of now, shuttle is in alpha and the API key is the only way to prove your identity. The shuttle team plans to implement proper authentication flows in the future.

If/when the shuttle team will set up a proper OAuth2 flow, this action will be updated to use that instead.

## Inputs

name | type | default | required | description |
-----|------|---------|----------|-------------|
shuttle_api_key | string | N/A | true | The API key to use to log in to the Shuttle.rs platform. This should be saved as a GitHub secret. |

## Outputs

name | type | description |
-----|------|-------------|
login_success | boolean | Whether the login was successful or not. |

## Example usage

```yaml
name: Shuttle Login
uses: AliSajid/shuttle-login@v1
id: login
with:
  shuttle_api_key: ${{ secrets.SHUTTLE_API_KEY }}
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
