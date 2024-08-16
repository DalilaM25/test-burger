import reducer, { initialState } from '../src/services/order/slice';
import {
  getFeeds,
  getOrderByNum,
  getOrders,
  postOrder
} from '../src/services/order/action';

describe('Тест редьюсера слайса order', () => {
  const testOrder = {
    _id: 'id',
    status: 'status',
    name: 'name',
    createdAt: 'test',
    updatedAt: 'test',
    number: 1,
    ingredients: ['test']
  };
  const mockError = 'error';
  const mockResult = {
    order: testOrder,
    name: 'name',
    error: mockError,
    isLoading: false,
    orders: [testOrder],
    orderModal: [testOrder],
    profileOrders: [testOrder],
    total: 1,
    totalToday: 1
  };

  describe('Проверка обработки экшена getFeeds', () => {
    it('getFeeds.fulfilled', () => {
      const action = {
        type: getFeeds.fulfilled.type,
        payload: mockResult
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual(mockResult.orders);
      expect(state.total).toEqual(mockResult.total);
      expect(state.totalToday).toEqual(mockResult.totalToday);
    });
    it('getFeeds.rejected', () => {
      const action = {
        type: getFeeds.rejected.type,
        error: { message: mockError }
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual([]);
      expect(state.total).toEqual(0);
      expect(state.totalToday).toEqual(0);
      expect(state.error).toBe(mockError);
    });
  });

  describe('Проверка обработки экшена getOrders', () => {
    it('getOrders.pending', () => {
      const action = { type: getOrders.pending.type };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(true);
    });
    it('getOrders.fulfilled', () => {
      const action = {
        type: getOrders.fulfilled.type,
        payload: mockResult
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.profileOrders).toEqual(mockResult);
    });
    it('getOrders.rejected', () => {
      const action = {
        type: getOrders.rejected.type,
        error: { message: mockError }
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(mockError);
    });
  });

  describe('Проверка обработки экшена postOrder', () => {
    it('postOrder.pending', () => {
      const action = { type: postOrder.pending.type };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(true);
    });
    it('postOrder.fulfilled', () => {
      const action = {
        type: postOrder.fulfilled.type,
        payload: mockResult
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.name).toEqual(mockResult.name);
      expect(state.order).toEqual(mockResult.order);
    });
    it('postOrder.rejected', () => {
      const action = {
        type: postOrder.rejected.type,
        error: { message: mockError }
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(mockError);
    });
  });

  describe('Проверка обработки экшена getOrderByNum', () => {
    it('getOrderByNum.pending', () => {
      const action = { type: getOrderByNum.pending.type };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(true);
    });
    it('getOrderByNum.fulfilled', () => {
      const action = {
        type: getOrderByNum.fulfilled.type,
        payload: mockResult
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.orderModal).toEqual(mockResult.orderModal);
    });
    it('getOrderByNum.rejected', () => {
      const action = {
        type: getOrderByNum.rejected.type,
        error: { message: mockError }
      };
      const state = reducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(mockError);
    });
  });
});
