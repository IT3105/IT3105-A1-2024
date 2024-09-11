# IT3105-A1-2024
## Setup
 - make sure youve installed pnpm in your computer follow the official installation page: https://pnpm.io/installation
## Adding your activity
 - Create duplicate copy-me in locacted inside 'packages' and rename it to `<lastname>-<firstname>` format (i.e smith-john)
 - Make sure to replace the property 'name' in package.json to `<lastname>-<firstname>`
 - To run it run the command 'pnpm --filter `<lastname>-<firstname>` start'

## Submission of your activity
 - Make sure youre in a different branch `<lastname>-<firstname>` from the main branch run the command '`git checkout -b '`<lastname>-<firstname>`' to create your own branch. verify youve created the branch throught git branch
 - git add .
 - git commit -m 'activity: `<project-name>`'
 - git push
 - create a pull request it should instruct you in the terminal how to create one or go to the pull request tab and create your pull request there. you can follow the official docs for this: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request

