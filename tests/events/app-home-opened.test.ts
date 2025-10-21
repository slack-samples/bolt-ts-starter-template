import assert from 'node:assert';
import { beforeEach, describe, it, mock } from 'node:test';
import type { AllMiddlewareArgs, SlackEventMiddlewareArgs } from '@slack/bolt';
import type { WebClient } from '@slack/web-api';
import { appHomeOpenedCallback } from '../../listeners/events/app-home-opened.js';
import { fakeClient, fakeLogger } from '../helpers.js';

const fakeEvent = {
  tab: 'home',
  user: 'U123',
};

const buildArguments = ({
  client = fakeClient,
  event = fakeEvent,
  logger = fakeLogger,
}: {
  client?: WebClient;
  event?: Record<string, unknown>;
  logger?: typeof fakeLogger;
}): AllMiddlewareArgs & SlackEventMiddlewareArgs<'app_home_opened'> => {
  return {
    client,
    event,
    logger,
  } as unknown as AllMiddlewareArgs & SlackEventMiddlewareArgs<'app_home_opened'>;
};

describe('events', () => {
  beforeEach(() => {
    fakeLogger.resetCalls();
  });

  it('should publish home view when tab is home', async () => {
    const spy = mock.method(fakeClient.views, 'publish', async () => ({
      ok: true,
    }));

    await appHomeOpenedCallback(buildArguments({}));

    assert(spy.mock.callCount() === 1);

    const callArgs = spy.mock.calls[0].arguments[0];
    assert(callArgs);
    assert.equal(callArgs.user_id, fakeEvent.user);
    assert(callArgs.view);
  });

  it('should not publish when event tab is not home', async () => {
    const event = {
      tab: 'about',
      user: 'U123',
    };
    const spy = mock.method(fakeClient.views, 'publish', async () => ({
      ok: true,
    }));

    await appHomeOpenedCallback(
      buildArguments({
        event: event,
      }),
    );

    assert(spy.mock.callCount() === 0);
  });

  it('should log error when views publish throws exception', async () => {
    const testError = new Error('test exception');
    const spy = mock.method(fakeClient.views, 'publish', async () => {
      throw testError;
    });

    await appHomeOpenedCallback(buildArguments({}));

    assert(spy.mock.callCount() === 1);
    assert.deepEqual(fakeLogger.error.mock.calls[0].arguments, [testError]);
  });
});
