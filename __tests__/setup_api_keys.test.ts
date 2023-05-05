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
    const error_message = 'unable to create directory'
    fs.promises.mkdir = jest.fn().mockRejectedValueOnce(new Error(error_message))

    // Act
    try {
      await place_api_key(api_key)
    } catch (error: unknown) {
      let error_message = ''
      if (error instanceof Error) {
        error_message = error.message
      }
      // Assert
      expect(error_message).toBe(`Error creating file: ${error_message}`)
    }
    

    // Assert
    expect(fs.promises.mkdir).toHaveBeenCalled()
    expect(fs.promises.writeFile).not.toHaveBeenCalled()
  })
})
