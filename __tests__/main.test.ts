import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs with linux', () => {
  process.env['RUNNER_OS'] = 'Linux'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  // eslint-disable-next-line no-console
  console.log(cp.execFileSync(np, [ip], options).toString())
})

test('test runs with windows', () => {
  process.env['RUNNER_OS'] = 'Windows'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  // eslint-disable-next-line no-console
  console.log(cp.execFileSync(np, [ip], options).toString())
})

test('test runs with macOS', () => {
  process.env['RUNNER_OS'] = 'macOS'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  // eslint-disable-next-line no-console
  console.log(cp.execFileSync(np, [ip], options).toString())
})
