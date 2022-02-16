# Customizing the UI for DFINITY Internet Computer Documentation

This project uses [Antora](https://antora.org) to generate an interface for the DFINITY Internet Computer [SDK site](https://sdk.dfinity.org). The [dfinity-docs-playbook](https://github.com/dfinity-lab/dfinity-docs-playbook) pulls in the `ui-bundle.zip` file from this repo and the documentation from the the following repos to generate the static documentation site:

- [dfinity/docs](https://github.com/dfinity/docs)
- [dfinity/motoko-base](https://github.com/dfinity/motoko-base)
- [dfinity/candid](https://github.com/dfinity/candid)
- [dfinity-lab/motoko](https://github.com/dfinity-lab/motoko)

## Development
Run `gulp preview` to run the project locally. Doing this uses the sample documentation .

## Building the UI
Once you're happy with the changes, run `gulp-bundle` to generate a new `ui-bundle.zip` folder.

## Deployments
Deployments are handled automatically through netlify whenever commits to master 

#### Note
If you want to preview the site with actuall content before deploying, you can run `antora antora-playbook.yml` 

## Further Antora Documentation
[Further Antora Documentation](https://gitlab.com/antora/antora-ui-default)
