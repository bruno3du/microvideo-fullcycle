import { Expected } from './shared/infra/testing/types';

declare global {
  namespace jest {
    interface Matchers<R> {
      notificationContainsErrorMessages: (expected: Expected) => R;
    }
  }
}
