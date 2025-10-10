import assert from 'node:assert';
import { beforeEach, describe, it, mock } from 'node:test';
import type { AllMiddlewareArgs, SlackEventMiddlewareArgs } from '@slack/bolt';
import { sampleMessageCallback } from '../../listeners/messages/sample-message.js';
import { fakeLogger, fakeSay } from '../helpers.js';

const fakeContext = {
  matches: ['hello'],
};

const buildArguments = ({
  context = fakeContext,
  logger = fakeLogger,
  say = fakeSay,
}: {
  context?: Record<string, unknown>;
  logger?: typeof fakeLogger;
  say?: typeof fakeSay;
}): AllMiddlewareArgs & SlackEventMiddlewareArgs<'message'> => {
  return {
    context,
    logger,
    say,
  } as unknown as AllMiddlewareArgs & SlackEventMiddlewareArgs<'message'>;
};

describe('messages', () => {
  beforeEach(() => {
    fakeLogger.resetCalls();
    fakeSay.mock.resetCalls();
  });

  it('should call say with greeting response', async () => {
    await sampleMessageCallback(buildArguments({}));

    assert(fakeSay.mock.callCount() === 1);
    const callArgs = fakeSay.mock.calls[0]?.arguments[0];
    assert(callArgs?.toString().includes(fakeContext.matches[0]));
    assert(callArgs?.toString().includes('hello, how are you?'));
  });

  it('should log error when say throws exception', async () => {
    const testError = new Error('test exception');
    const say = mock.fn(async () => {
      throw testError;
    });

    await sampleMessageCallback(
      buildArguments({
        say: say,
      }),
    );

    assert(say.mock.callCount() === 1);
    assert.deepEqual(fakeLogger.error.mock.calls[0].arguments, [testError]);
  });
});
