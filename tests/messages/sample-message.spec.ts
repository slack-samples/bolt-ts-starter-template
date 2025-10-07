import assert from 'node:assert';
import { describe, it, mock } from 'node:test';

import { sampleMessageCallback } from '../../listeners/messages/sample-message.ts';

describe('messages', () => {
  it('should call say with greeting response', async () => {
    const fakeContext = {
      matches: ['hello'],
    };
    const fakeSay = mock.fn();
    const fakeLogger = {
      error: mock.fn(),
    };

    await sampleMessageCallback({
      context: fakeContext,
      say: fakeSay,
      logger: fakeLogger,
    });

    assert.strictEqual(fakeSay.mock.callCount(), 1);
    const callArgs = fakeSay.mock.calls[0].arguments[0];
    assert(callArgs.includes(fakeContext.matches[0]));
    assert(callArgs.includes('hello, how are you?'));
  });

  it('should log error when say throws exception', async () => {
    const testError = new Error('test exception');
    const fakeContext = {
      matches: ['hello'],
    };
    const fakeSay = mock.fn(() => {
      throw testError;
    });
    const fakeLogger = {
      error: mock.fn(),
    };

    await sampleMessageCallback({
      context: fakeContext,
      say: fakeSay,
      logger: fakeLogger,
    });

    assert.strictEqual(fakeSay.mock.callCount(), 1);
    assert.deepEqual(fakeLogger.error.mock.calls[0].arguments, [testError]);
  });
});
