import { FileDB } from '@naturalcycles/db-lib/dist/adapter/file'
import { GithubPersistencePlugin } from '@naturalcycles/github-db'
import { requireEnvKeys } from '@naturalcycles/nodejs-lib'

require('dotenv').config()

const { GITHUB_TOKEN } = requireEnvKeys('GITHUB_TOKEN')

export const githubDB = new FileDB({
  plugin: new GithubPersistencePlugin({
    token: GITHUB_TOKEN,
    repo: 'NaturalCycles/github-db',
    forcePush: false,
  }),
})
