import assert from 'node:assert';
import { beforeEach, describe, it, mock } from 'node:test';
import type { AllMiddlewareArgs, SlackViewMiddlewareArgs } from '@slack/bolt';
import type { WebClient } from '@slack/web-api';
import { sampleViewCallback } from '../../listeners/views/sample-view.js';
import { fakeAck, fakeClient, fakeLogger } from '../helpers.js';

const fakeBody = {
  user: {
    id: 'U1234',
  },
};

const fakeView = {
  state: {
    values: {
      input_block_id: {
        sample_input_id: {
          value: 'test value',
        },
      },
      select_channel_block_id: {
        sample_dropdown_id: {
          selected_conversation: 'C1234',
        },
      },
    },
  },
};

const buildArguments = ({
  ack = fakeAck,
  body = fakeBody,
  client = fakeClient,
  logger = fakeLogger,
  view = fakeView,
}: {
  ack?: typeof fakeAck;
  body?: Record<string, unknown>;
  client?: WebClient;
  logger?: typeof fakeLogger;
  view?: Record<string, unknown>;
}): AllMiddlewareArgs & SlackViewMiddlewareArgs => {
  return {
    ack,
    body,
    client,
    logger,
    view,
  } as unknown as AllMiddlewareArgs & SlackViewMiddlewareArgs;
};

describe('views', () => {
  beforeEach(() => {
    fakeAck.mock.resetCalls();
    fakeLogger.resetCalls();
  });

  it('should acknowledge and post message with form values', async () => {
    const spy = mock.method(fakeClient.chat, 'postMessage', async () => ({
      ok: true,
    }));

    await sampleViewCallback(buildArguments({}));

    assert(fakeAck.mock.callCount() === 1);
    assert(spy.mock.callCount() === 1);

    const callArgs = spy.mock.calls[0].arguments[0];
    assert(
      callArgs?.channel === fakeView.state.values.select_channel_block_id.sample_dropdown_id.selected_conversation,
    );
    assert('text' in callArgs);
    assert(callArgs.text?.includes(fakeView.state.values.input_block_id.sample_input_id.value));
    assert(callArgs.text?.includes(fakeBody.user.id));
  });

  it('should log error when ack throws exception', async () => {
    const testError = new Error('test exception');
    const ack = mock.fn(() => {
      throw testError;
    });

    await sampleViewCallback(
      buildArguments({
        ack: ack,
      }),
    );

    assert(ack.mock.callCount() === 1);
    assert.deepEqual(fakeLogger.error.mock.calls[0].arguments, [testError]);
  });
});
