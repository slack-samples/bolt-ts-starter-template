import assert from 'node:assert';
import { describe, it, mock } from 'node:test';

import { appHomeOpenedCallback } from '../../listeners/events/app-home-opened.ts';

describe('events', () => {
  it('should publish home view when tab is home', async () => {
    const fakeClient = {
      views: {
        publish: mock.fn(),
      },
    };
    const fakeEvent = {
      tab: 'home',
      user: 'U123',
    };
    const fakeLogger = {
      error: mock.fn(),
    };

    await appHomeOpenedCallback({
      client: fakeClient,
      event: fakeEvent,
      logger: fakeLogger,
    });

    assert.strictEqual(fakeClient.views.publish.mock.callCount(), 1);

    const callArgs = fakeClient.views.publish.mock.calls[0].arguments[0];
    assert.equal(callArgs.user_id, fakeEvent.user);
    assert(callArgs.view);
  });

  it('should not publish when event tab is not home', async () => {
    const fakeClient = {
      views: {
        publish: mock.fn(),
      },
    };
    const fakeEvent = {
      tab: 'about',
      user: 'U123',
    };
    const fakeLogger = {
      error: mock.fn(),
    };

    await appHomeOpenedCallback({
      client: fakeClient,
      event: fakeEvent,
      logger: fakeLogger,
    });

    assert.strictEqual(fakeClient.views.publish.mock.callCount(), 0);
  });

  it('should log error when views publish throws exception', async () => {
    const testError = new Error('test exception');
    const fakeClient = {
      views: {
        publish: mock.fn(() => {
          throw testError;
        }),
      },
    };
    const fakeEvent = {
      tab: 'home',
      user: 'U123',
    };
    const fakeLogger = {
      error: mock.fn(),
    };

    await appHomeOpenedCallback({
      client: fakeClient,
      event: fakeEvent,
      logger: fakeLogger,
    });

    assert.strictEqual(fakeClient.views.publish.mock.callCount(), 1);
    assert.deepEqual(fakeLogger.error.mock.calls[0].arguments, [testError]);
  });
});
