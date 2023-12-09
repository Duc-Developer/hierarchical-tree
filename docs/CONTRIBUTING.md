## Guideline for development
This project was created using `bun init` in bun v1.0.15.

If you not install bun, do it first (macOs/Linux):
With curl
```bash
curl -fsSL https://bun.sh/install | bash -s "bun-v1.0.15"
```
Or with npm
```bash
npm install -g bun@v1.0.15
```

Command line for dev:
```bash
bun install         # for installation
bun run dev         # for run start project in local
bun run test        # for run test case of this module
bun run bundle      # for bundle this module to publish npm
bun run format      # format with prettier
bun run check       # for check lint prettier
```

## GitGraph
Every branch which used for fix bug, create new features,... alway checkout and create a pull request when done.
Follow this diagram bellow
```mermaid
%%{init: { 'logLevel': 'debug', 'theme': 'base', 'gitGraph': {'showBranches': true, 'showCommitLabel':true,'mainBranchName': 'master'}} }%%
      gitGraph
        commit tag:"v1.0.15"
        branch hotfix
        checkout hotfix
        commit
        branch develop
        checkout develop
        commit id:"111"
        branch featureB
        checkout featureB
        commit type:HIGHLIGHT
        checkout master
        checkout hotfix
        commit type:NORMAL
        checkout develop
        commit type:REVERSE
        checkout featureB
        commit
        checkout master
        merge hotfix
        checkout featureB
        commit
        checkout develop
        branch featureA
        commit
        checkout develop
        merge hotfix
        checkout featureA
        commit
        checkout featureB
        commit
        checkout develop
        merge featureA
        branch release
        checkout release
        commit
        checkout master
        commit tag:"v1.1.0"
        checkout release
        merge master
        checkout develop
        merge release
```