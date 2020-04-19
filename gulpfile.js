/**
 * Servless Task Runner
 * Consoles out put fun emojis :)
 */

const { src, dest, series } = require('gulp')
const concat = require('gulp-concat')
const clean = require('gulp-clean')
const emojify = require('gulp-emojify')

const origin = './serverless-yml'
const temp = './temp'
const FUNCTION_YML = `${origin}/functions/**`
const RESOURCES_YML = `${origin}/resources/**`
const IAM_ROLE_STATEMENTS_YML = `${origin}/iamRoleStatements/**`

const clean_yml = () => src(`${temp}/*.yml`, { read: false }).pipe(clean())

const build_functions_yml = () =>
  src(FUNCTION_YML).pipe(concat('/functions.yml')).pipe(dest(temp))

const build_resources_yml = () =>
  src(RESOURCES_YML).pipe(concat('/resources.yml')).pipe(dest(temp))

const build_iamRoleStatements_yml = () =>
  src(IAM_ROLE_STATEMENTS_YML)
    .pipe(concat('/iamRoleStatements.yml'))
    .pipe(dest(temp))

const consoleMessage = () =>
  process.env.GULP
    ? `
    🐢 Serverless deployments take awhile:snail:

    ⚙️  Beginning the deployment. Better grab a cup of:coffee:coffee.
    `
    : `     
    :package:Build process completed. Kick back with a:beer:and celebrate!

    🔥:skull:Unless the deployment failed:skull:🔥
    `

const emoji = () =>
  src(`${origin}/serviceConfig.yml`).pipe(emojify(consoleMessage()))

if (process.env.GULP) {
  exports.default = series(
    // clean_yml,
    emoji,
    // build_functions_yml
    // build_resources_yml,
    // build_iamRoleStatements_yml
  )
} else {
  exports.default = series(
    // clean_yml,
    emoji,
  )
}
