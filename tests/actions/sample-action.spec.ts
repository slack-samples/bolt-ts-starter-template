import assert from 'node:assert';
import { describe, it, mock } from 'node:test';

import { sampleActionCallback } from '../../listeners/actions/sample-action.ts';

describe('actions', () => {
  it('should acknowledge and update view', async () => {
    const fakeAck =  mock.fn();
    const fakeClient = {
      views: {
        update: mock.fn(),
      },
    };
    const fakeBody = {
      view: {
        id: 'test_id',
        hash: '156772938.1827394',
      },
    };
    const fakeLogger = {
      error: mock.fn(),
    };

    await sampleActionCallback({
      ack: fakeAck,
      client: fakeClient,
      body: fakeBody,
      logger: fakeLogger,
    });

    assert.strictEqual(fakeAck.mock.callCount(), 1);
    assert.strictEqual(fakeClient.views.update.mock.callCount(), 1);

    const callArgs = fakeClient.views.update.mock.calls[0].arguments[0];
    assert.equal(callArgs.view_id, fakeBody.view.id);
    assert.equal(callArgs.hash, fakeBody.view.hash);
    assert(callArgs.view);
  });

  it('should log error when ack throws exception', async () => {
    const testError = new Error('test exception');
    const fakeAck = mock.fn(() => {
      throw testError;
    });
    const fakeClient = {
      views: {
        update: mock.fn(),
      },
    };
    const fakeBody = {
      view: {
        id: 'test_id',
        hash: '156772938.1827394',
      },
    };
    const fakeLogger = {
      error: mock.fn(),
    };

    await sampleActionCallback({
      ack: fakeAck,
      client: fakeClient,
      body: fakeBody,
      logger: fakeLogger,
    });

    assert.strictEqual(fakeAck.mock.callCount(), 1);
    assert.deepEqual(fakeLogger.error.mock.calls[0].arguments, [testError]);
  });
});
