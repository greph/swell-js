import api from './api';

const mockSettingState = {
  store: {
    id: 'test',
    currency: 'AUD',
    currencies: [
      {
        code: 'AUD',
        rate: 1,
        name: 'Australian Dollar',
        symbol: '$',
        decimals: 2,
        type: 'base',
      },
      {
        code: 'USD',
        rate: 0.7707,
        name: 'US Dollar',
        symbol: '$',
        decimals: 2,
        type: 'display',
      },
      {
        code: 'EUR',
        rate: 1.8,
        name: 'Euro',
        symbol: '€',
        decimals: 2,
        type: 'price',
      },
    ],
    locale: 'en-US',
  },
  session: {
    currency: undefined,
  },
};

describe('products', () => {
  beforeEach(() => {
    api.init('test', 'pk_test');
    api.settings.state = JSON.parse(JSON.stringify(mockSettingState));
    api.currency.code = null;
    api.currency.state = null;
  });

  describe('methods', () => {
    it('should return methods list, select, selected, format', () => {
      expect(api.currency.list).toBeDefined();
      expect(api.currency.select).toBeDefined();
      expect(api.currency.selected).toBeDefined();
      expect(api.currency.format).toBeDefined();
    });
  });

  describe('list', () => {
    it('should return list of enabled currencies', () => {
      const currencies = api.currency.list();

      expect(currencies).toEqual(mockSettingState.store.currencies);
    });
  });

  describe('select', () => {
    it('should make request to PUT /session', async () => {
      await api.currency.select('USD');

      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(`https://test.swell.store/api/session`);
      expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'put');
    });

    it('should set state to selected currency', async () => {
      await api.currency.select('USD');

      expect(api.currency.code).toEqual('USD');
      expect(api.currency.state).toEqual(mockSettingState.store.currencies[1]);
    });
  });

  describe('get', () => {
    it('should get store currency by default', async () => {
      const currency = api.currency.get();

      expect(currency).toEqual(mockSettingState.store.currencies[0]);
    });

    it('should get selected store currency', async () => {
      await api.currency.select('USD');
      const currency = api.currency.get();

      expect(currency).toEqual(mockSettingState.store.currencies[1]);
    });
  });

  describe('selected', () => {
    it('should get store currency code by default', async () => {
      const code = api.currency.selected();

      expect(code).toEqual('AUD');
    });

    it('should get selected store currency code', async () => {
      await api.currency.select('USD');
      const code = api.currency.selected();

      expect(code).toEqual('USD');
    });
  });

  describe('format', () => {
    it('should format base currency value', async () => {
      const formatted = api.currency.format(1);

      expect(formatted).toEqual('A$1.00');
    });

    it('should format currency value by code', async () => {
      const formatted = api.currency.format(1, { code: 'USD' });

      expect(formatted).toEqual('$0.77');
    });

    it('should format currency value by locale', async () => {
      const formatted = api.currency.format(1, { locale: 'en-GB' });

      expect(formatted).toEqual('A$1.00');
    });

    it('should format currency value with decimals', async () => {
      const formatted = api.currency.format(1, { decimals: 4 });

      expect(formatted).toEqual('A$1.0000');
    });

    it('should convert amount by explicit rate', async () => {
      const formatted = api.currency.format(1, { rate: 0.5 });

      expect(formatted).toEqual('A$0.50');
    });

    it('should convert amount by selected display currency', async () => {
      await api.currency.select('USD');
      const formatted = api.currency.format(1);

      expect(formatted).toEqual('$0.77');
    });

    it('should not convert amount by selected price currency', async () => {
      await api.currency.select('EUR');
      const formatted = api.currency.format(1);

      expect(formatted).toEqual('€1.00');
    });

    it('should get currency symbol without value', async () => {
      const symbol = api.currency.format();

      expect(symbol).toEqual('A$');
    });

    it('should get selected currency symbol without value', async () => {
      await api.currency.select('EUR');
      const symbol = api.currency.format();

      expect(symbol).toEqual('€');
    });
  });
});
