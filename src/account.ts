interface StateChange {
    method: string,
    url: string,
    data: object
}

function methods(request: Function) {
    return {
      state: null,
  
      async requestStateChange({ method, url, data }: StateChange) {
        const result = await request(method, url, null, data);
        if (result && result.errors) {
          return result;
        }
        return (this.state = result);
      },
  
      get(query: object) {
        return this.requestStateChange({ method: 'get', url: '/account', data: query });
      },
  
      create(data: object) {
        return this.requestStateChange({ method: 'post', url: '/account', data });
      },
  
      update(data: object) {
        return this.requestStateChange({ method: 'put', url: '/account', data });
      },
  
      login(email: string, password: string) {
        return this.requestStateChange({ method: 'post', url: '/account/login', data: { email, password } });
      },
  
      logout() {
        this.state = null;
        return request('post', '/account/logout');
      },
  
      recover(data: object) {
        return request('post', '/account/recover', data);
      },
  
      listAddresses(query: object) {
        return request('get', '/account/addresses', query);
      },
  
      createAddress(data: object) {
        return request('post', '/account/addresses', data);
      },
  
      updateAddress(id: string, data: object) {
        return request('put', `/account/addresses/${id}`, data);
      },
  
      deleteAddress(id: string) {
        return request('delete', `/account/addresses/${id}`);
      },
  
      listCards(query: object) {
        return request('get', '/account/cards', query);
      },
  
      createCard(data: object) {
        return request('post', '/account/cards', data);
      },
  
      updateCard(id: string, data: object) {
        return request('put', `/account/cards/${id}`, data);
      },
  
      deleteCard(id: string) {
        return request('delete', `/account/cards/${id}`);
      },
  
      listOrders(query: object) {
        return request('get', `/account/orders`, query);
      },
  
      getOrder(id: string) {
        return request('get', `/account/orders/${id}`);
      },
  
      // Deprecated methods
      getAddresses(query: object) {
        return request('get', '/account/addresses', query);
      },
      getCards(query: object) {
        return request('get', '/account/cards', query);
      },
      getOrders(query: object) {
        return request('get', `/account/orders`, query);
      },
    };
  }
  
  export default methods;