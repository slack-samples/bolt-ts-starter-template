import assert from 'node:assert';
import { beforeEach, describe, it, mock } from 'node:test';
import type { AllMiddlewareArgs, BlockAction, SlackActionMiddlewareArgs } from '@slack/bolt';
import type { WebClient } from '@slack/web-api';
import { sampleActionCallback } from '../../listeners/actions/sample-action.js';
import { fakeAck, fakeClient, fakeLogger } from '../helpers.js';

const fakeBody = {
  view: {
    type: 'modal',
    id: 'test_id',
    hash: '156772938.1827394',
  },
};

const buildArguments = ({
  ack = fakeAck,
  body = fakeBody,
  client = fakeClient,
  logger = fakeLogger,
}: {
  ack?: typeof fakeAck;
  body?: Record<string, unknown>;
  client?: WebClient;
  logger?: typeof fakeLogger;
}): AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockAction> => {
  return {
    ack,
    body,
    client,
    logger,
  } as unknown as AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockAction>;
};

describe('actions', () => {
  beforeEach(() => {
    fakeAck.mock.resetCalls();
    fakeLogger.resetCalls();
  });

  it('should acknowledge and update view', async () => {
    const spy = mock.method(fakeClient.views, 'update', async () => ({
      ok: true,
    }));

    await sampleActionCallback(buildArguments({}));

    assert(fakeAck.mock.callCount() === 1);
    assert(spy.mock.callCount() === 1);

    const callArgs = spy.mock.calls[0].arguments[0];
    assert(callArgs);
    assert(callArgs.view);
    assert('view_id' in callArgs);
    assert(callArgs.view_id === fakeBody.view.id);
    assert(callArgs.hash === fakeBody.view.hash);
  });

  it('should log error when ack throws exception', async () => {
    const testError = new Error('test exception');
    const ack = mock.fn(async () => {
      throw testError;
    });
    const spy = mock.method(fakeClient.views, 'update', async () => ({
      ok: true,
    }));

    await sampleActionCallback(
      buildArguments({
        ack: ack,
      }),
    );

    assert(ack.mock.callCount() === 1);
    assert.deepEqual(fakeLogger.error.mock.calls[0].arguments, [testError]);
    assert(spy.mock.callCount() === 0);
  });
});
