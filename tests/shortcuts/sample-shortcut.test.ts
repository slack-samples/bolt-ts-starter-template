import assert from 'node:assert';
import { beforeEach, describe, it, mock } from 'node:test';
import type { AllMiddlewareArgs, SlackShortcutMiddlewareArgs } from '@slack/bolt';
import type { WebClient } from '@slack/web-api';
import { sampleShortcutCallback } from '../../listeners/shortcuts/sample-shortcut.js';
import { fakeAck, fakeClient, fakeLogger } from '../helpers.js';

const fakeShortcut = {
  trigger_id: 't1234',
};

const buildArguments = ({
  ack = fakeAck,
  client = fakeClient,
  logger = fakeLogger,
  shortcut = fakeShortcut,
}: {
  ack?: typeof fakeAck;
  client?: WebClient;
  logger?: typeof fakeLogger;
  shortcut?: Record<string, unknown>;
}): AllMiddlewareArgs & SlackShortcutMiddlewareArgs => {
  return {
    ack,
    client,
    logger,
    shortcut,
  } as unknown as AllMiddlewareArgs & SlackShortcutMiddlewareArgs;
};

describe('shortcuts', () => {
  beforeEach(() => {
    fakeAck.mock.resetCalls();
    fakeLogger.resetCalls();
  });

  it('should acknowledge and open modal view', async () => {
    const spy = mock.method(fakeClient.views, 'open', async () => ({
      ok: true,
    }));

    await sampleShortcutCallback(buildArguments({}));

    assert(fakeAck.mock.callCount() === 1);
    assert(spy.mock.callCount() === 1);

    const callArgs = spy.mock.calls[0].arguments[0];
    assert(callArgs);
    assert('trigger_id' in callArgs);
    assert(callArgs.trigger_id === fakeShortcut.trigger_id);
    assert(callArgs.view);
  });

  it('should log error when ack throws exception', async () => {
    const testError = new Error('test exception');
    const ack = mock.fn(async () => {
      throw testError;
    });
    const spy = mock.method(fakeClient.views, 'open', async () => ({
      ok: true,
    }));

    await sampleShortcutCallback(
      buildArguments({
        ack: ack,
      }),
    );

    assert(ack.mock.callCount() === 1);
    assert.deepEqual(fakeLogger.error.mock.calls[0].arguments, [testError]);
    assert(spy.mock.callCount() === 0);
  });
});
