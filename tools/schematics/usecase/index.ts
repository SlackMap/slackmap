import { chain, externalSchematic, Rule, SchematicContext, Tree, url, apply, template, mergeWith, move } from '@angular-devkit/schematics';
import { strings } from "@angular-devkit/core";
import { getProjectConfig } from '@nrwl/workspace';

function generateFilesFromTemplates(options: any) : Rule {
  return (tree: Tree, context: SchematicContext) => {
    const config = getProjectConfig(tree, options.project);
    const subDir = config.projectType === 'library' ? 'lib' : 'app'

    const sourceTemplates = url('./files');
    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        ...options,
        ...strings
      }),
      move(`${config.sourceRoot}/${subDir}`)
    ]);

    const rule = mergeWith(sourceParametrizedTemplates);
    return rule;
  }
}

export default function(options: any): Rule {
  return chain([
    generateFilesFromTemplates(options),
  ]);
}
