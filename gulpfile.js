/**
 * Servless Task Runner: yaml files
 * 1st: Combinds multiple .yml micro services into newly created functions.yml & resource.yml files.
 * 2nd: After sls deploy finish, the newly created yml files are deleted.
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
    src(FUNCTION_YML)
        .pipe(concat('/functions.yml'))
        .pipe(dest(temp))

const build_resources_yml = () =>
    src(RESOURCES_YML)
        .pipe(concat('/resources.yml'))
        .pipe(dest(temp))

const build_iamRoleStatements_yml = () =>
    src(IAM_ROLE_STATEMENTS_YML)
        .pipe(concat('/iamRoleStatements.yml'))
        .pipe(dest(temp))

const emoji = () =>
    src(`${origin}/serviceConfig.yml`).pipe(
        emojify(
            process.env.GULP
                ? 'Creating functions & resources yaml files & running sls deloy. This may take awhile, better grab a cup of:coffee: coffee.'
                : 'Build process completed. Kick back with a:beer: & celebrate! Unless sls failed to deploy...:fire::skull::fire:'
        )
    )

if (process.env.GULP) {
    exports.default = series(
        clean_yml,
        emoji,
        build_functions_yml,
        build_resources_yml,
        build_iamRoleStatements_yml
    )
} else {
    exports.default = series(clean_yml, emoji)
}
