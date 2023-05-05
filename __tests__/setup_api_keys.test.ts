import * as fs from 'fs'
import {place_api_key} from '../src/setup_api_keys'
import {expect} from '@jest/globals'

// Mock fs.promises
jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn(),
    writeFile: jest.fn()
  }
}))

describe('place_api_key', () => {
  it('creates the correct directory and writes the correct file', async () => {
    // Arrange
    const api_key = 'my-api-key'

    // Act
    await place_api_key(api_key)

    // Assert
    const config_path = `${process.env.HOME}/.config/shuttle/config.toml`
    const directory = `${process.env.HOME}/.config/shuttle`
    expect(fs.promises.mkdir).toHaveBeenCalledWith(directory, {recursive: true})
    expect(fs.promises.writeFile).toHaveBeenCalledWith(
      config_path,
      expect.any(String)
    )
  })

  it('handles errors', async () => {
    // Arrange
    const api_key = 'my-api-key'
    const error = new Error('test error')
    fs.promises.mkdir = jest.fn().mockRejectedValueOnce(error)

    // Act
    await place_api_key(api_key)

    // Assert
    expect(fs.promises.mkdir).toHaveBeenCalled()
    expect(fs.promises.writeFile).not.toHaveBeenCalled()
  })
})
