const createSpyObj = (name: string, methods: string[]) => {
    return jasmine.createSpyObj(name, methods);
  };

export const ApiServiceSpy = createSpyObj('ApiService', [
    'getProducts',
    'getProduct',
  ]);
