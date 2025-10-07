import assert from 'node:assert';
import { describe, it, mock } from 'node:test';

import { sampleCommandCallback } from '../../listeners/commands/sample-command.ts';

describe('commands', () => {
  it('should acknowledge and respond to command', async () => {
    const fakeAck = mock.fn();
    const fakeRespond = mock.fn();
    const fakeLogger = {
      error: mock.fn(),
    };

    await sampleCommandCallback({
      ack: fakeAck,
      respond: fakeRespond,
      logger: fakeLogger,
    });

    assert.strictEqual(fakeAck.mock.callCount(), 1);
    assert.strictEqual(fakeRespond.mock.callCount(), 1);

    const callArgs = fakeRespond.mock.calls[0].arguments[0];
    assert(callArgs.includes('Responding to the sample command!'));
  });

  it('should log error when ack throws exception', async () => {
    const testError = new Error('test exception');
    const fakeAck = mock.fn(() => {
      throw testError;
    });
    const fakeRespond = mock.fn();
    const fakeLogger = {
      error: mock.fn(),
    };

    await sampleCommandCallback({
      ack: fakeAck,
      respond: fakeRespond,
      logger: fakeLogger,
    });

    assert.strictEqual(fakeAck.mock.callCount(), 1);
    assert.deepEqual(fakeLogger.error.mock.calls[0].arguments, [testError]);
  });
});
