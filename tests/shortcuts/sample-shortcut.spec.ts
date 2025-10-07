import assert from 'node:assert';
import { describe, it, mock } from 'node:test';

import { sampleShortcutCallback } from '../../listeners/shortcuts/sample-shortcut.ts';

describe('shortcuts', () => {
  it('should acknowledge and open modal view', async () => {
    const fakeShortcut = {
      trigger_id: 't1234',
    };
    const fakeAck = mock.fn();
    const fakeClient = {
      views: {
        open: mock.fn(),
      },
    };
    const fakeLogger = {
      error: mock.fn(),
    };

    await sampleShortcutCallback({
      shortcut: fakeShortcut,
      ack: fakeAck,
      client: fakeClient,
      logger: fakeLogger,
    });

    assert.strictEqual(fakeAck.mock.callCount(), 1);
    assert.strictEqual(fakeClient.views.open.mock.callCount(), 1);

    const callArgs = fakeClient.views.open.mock.calls[0].arguments[0];
    assert.equal(callArgs.trigger_id, fakeShortcut.trigger_id);
    assert(callArgs.view);
  });

  it('should log error when ack throws exception', async () => {
    const testError = new Error('test exception');
    const fakeShortcut = {
      trigger_id: 't1234',
    };
    const fakeAck = mock.fn(() => {
      throw testError;
    });
    const fakeClient = {
      views: {
        open: mock.fn(),
      },
    };
    const fakeLogger = {
      error: mock.fn(),
    };

    await sampleShortcutCallback({
      shortcut: fakeShortcut,
      ack: fakeAck,
      client: fakeClient,
      logger: fakeLogger,
    });

    assert.strictEqual(fakeClient.views.open.mock.callCount(), 0);
    assert.strictEqual(fakeAck.mock.callCount(), 1);
    assert.deepEqual(fakeLogger.error.mock.calls[0].arguments, [testError]);
  });
});
