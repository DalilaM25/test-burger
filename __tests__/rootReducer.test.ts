import { rootReducer } from '../src/services/store';
describe('rootReducer', () => {
  it('Корневой редюсер возвращает корректное начальное состояние хранилища ', () => {
    const initialState = {
      ingredients: {
        ingredients: [],
        isLoading: false,
        error: null
      },
      order: {
        order: null,
        name: null,
        error: null,
        isLoading: false,
        orders: [],
        orderModal: [],
        profileOrders: [],
        total: null,
        totalToday: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      auth: {
        user: null,
        isAuthChecked: false,
        error: null
      }
    };

    expect(rootReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });
});
