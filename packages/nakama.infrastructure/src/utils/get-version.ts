export const getVersion = () => {
  const trigger = process.env.CODEBUILD_SOURCE_VERSION;
  const hash = process.env.CODEBUILD_RESOLVED_SOURCE_VERSION;
  console.log('Trigger: ', trigger);
  console.log('Hash', hash);
  if (trigger && hash && trigger === hash) {
    return 'prod';
  }
  return 'test';
};
