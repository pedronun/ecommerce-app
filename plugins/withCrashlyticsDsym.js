const { withXcodeProject } = require('@expo/config-plugins');

const SCRIPT_NAME = 'Upload Crashlytics dSYM';
const SCRIPT_MARKER = 'FirebaseCrashlytics/run';

const INPUT_PATHS = [
  '"${DWARF_DSYM_FOLDER_PATH}/${DWARF_DSYM_FILE_NAME}/Contents/Resources/DWARF/${PRODUCT_NAME}"',
  '"${DWARF_DSYM_FOLDER_PATH}/${DWARF_DSYM_FILE_NAME}/Contents/Info.plist"',
  '"$(TARGET_BUILD_DIR)/$(UNLOCALIZED_RESOURCES_FOLDER_PATH)/GoogleService-Info.plist"',
  '"$(TARGET_BUILD_DIR)/$(EXECUTABLE_PATH)"',
];

const hasCrashlyticsScript = (project) => {
  const phases = project.hash.project.objects.PBXShellScriptBuildPhase ?? {};

  return Object.values(phases).some(
    (phase) =>
      typeof phase === 'object' &&
      typeof phase.shellScript === 'string' &&
      phase.shellScript.includes(SCRIPT_MARKER)
  );
};

const withCrashlyticsDsym = (config) =>
  withXcodeProject(config, (configWithMods) => {
    const project = configWithMods.modResults;

    project.addBuildProperty('DEBUG_INFORMATION_FORMAT', 'dwarf-with-dsym');

    if (!hasCrashlyticsScript(project)) {
      project.addBuildPhase(
        [],
        'PBXShellScriptBuildPhase',
        SCRIPT_NAME,
        project.getFirstTarget().uuid,
        {
          shellPath: '/bin/sh',
          shellScript: '${PODS_ROOT}/FirebaseCrashlytics/run',
          inputPaths: INPUT_PATHS,
        }
      );
    }

    return configWithMods;
  });

module.exports = withCrashlyticsDsym;
