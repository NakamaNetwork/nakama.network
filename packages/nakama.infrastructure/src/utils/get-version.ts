export const getVersion = () => {
  const trigger = process.env.CODEBUILD_SOURCE_VERSION;
  console.log('Trigger: ', trigger);
  switch (trigger) {
    case 'branch/master':
      return 'prod';
    default:
      return 'test';
  }
};
