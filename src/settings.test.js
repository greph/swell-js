import api from './api';

describe('settings', () => {
  beforeEach(() => {
    api.init('test', 'pk_test');
  });

  describe('get', () => {
    it('should make request to GET /settings', async () => {
      await api.settings.get();

      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(`https://test.swell.store/api/settings`);
      expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'get');
    });

    it('should register response state', async () => {
      api.settings.state = null;
      fetch.mockResponseOnce(JSON.stringify({ store_title: 'Test' }));
      await api.settings.get();
      expect(api.settings.state).toEqual({ store_title: 'Test' });
    });
  });

  describe('payments', () => {
    it('should make request to GET /settings/payments', async () => {
      await api.settings.payments();

      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(`https://test.swell.store/api/settings/payments`);
      expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'get');
    });

    it('should register response payment state', async () => {
      api.settings.paymentState = null;
      fetch.mockResponseOnce(JSON.stringify({ card: {} }));
      await api.settings.payments();
      expect(api.settings.paymentState).toEqual({ card: {} });
    });
  });
});
