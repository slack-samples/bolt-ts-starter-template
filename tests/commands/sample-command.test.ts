import assert from 'node:assert';
import { beforeEach, describe, it, mock } from 'node:test';
import type { AllMiddlewareArgs, SlackCommandMiddlewareArgs } from '@slack/bolt';
import { sampleCommandCallback } from '../../listeners/commands/sample-command.js';
import { fakeAck, fakeLogger } from '../helpers.js';

const fakeRespond = mock.fn();

const buildArguments = ({
  ack = fakeAck,
  logger = fakeLogger,
  respond = fakeRespond,
}: {
  ack?: typeof fakeAck;
  logger?: typeof fakeLogger;
  respond?: typeof fakeRespond;
}): AllMiddlewareArgs & SlackCommandMiddlewareArgs => {
  return {
    ack,
    logger,
    respond,
  } as unknown as AllMiddlewareArgs & SlackCommandMiddlewareArgs;
};

describe('commands', () => {
  beforeEach(() => {
    fakeAck.mock.resetCalls();
    fakeLogger.resetCalls();
    fakeRespond.mock.resetCalls();
  });

  it('should acknowledge and respond to command', async () => {
    await sampleCommandCallback(buildArguments({}));

    assert(fakeAck.mock.callCount() === 1);
    assert(fakeRespond.mock.callCount() === 1);

    const callArgs = fakeRespond.mock.calls[0]?.arguments[0];
    assert(callArgs?.includes('Responding to the sample command!'));
  });

  it('should log error when ack throws exception', async () => {
    const testError = new Error('test exception');
    const ack = mock.fn(async () => {
      throw testError;
    });

    await sampleCommandCallback(
      buildArguments({
        ack: ack,
      }),
    );

    assert(ack.mock.callCount() === 1);
    assert.deepEqual(fakeLogger.error.mock.calls[0].arguments, [testError]);
    assert(fakeRespond.mock.callCount() === 0);
  });
});
