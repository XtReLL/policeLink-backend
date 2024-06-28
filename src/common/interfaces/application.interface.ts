export enum ApplicationEnvironment {
  TEST = 'test',
  TEST_CI = 'test-ci',
  LOCAL = 'local',
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
  K8S = 'k8s',
}

export enum ApplicationLoggerFormatter {
  NEST = 'nest',
  ELK = 'elk',
}
