import reducer, {
  initialState,
  setUser,
  setIsAuthChecked
} from '../src/services/auth/slice';
import {
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../src/services/auth/action';

describe('Тест редьюсера слайса auth', () => {
  const testUser = {
    email: 'testEmail',
    name: 'testName'
  };
  const mockError = 'error';
  const mockResult = {
    user: testUser,
    isAuthChecked: false,
    error: mockError
  };
  it('Изменяется isAuthChecked', () => {
    const newState = reducer({ ...initialState }, setIsAuthChecked(true));
    const { isAuthChecked } = newState;

    expect(isAuthChecked).toEqual(true);
  });
  it('Изменяется user', () => {
    const newState = reducer({ ...initialState }, setUser(testUser));
    const { user } = newState;

    expect(user).toEqual(testUser);
  });
  describe('Проверка обработки экшена registerUser', () => {
    it('registerUser.pending', () => {
      const action = { type: registerUser.pending.type };
      const state = reducer(initialState, action);

      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBe(null);
    });
    it('registerUser.fulfilled', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: mockResult
      };
      const state = reducer(initialState, action);

      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toEqual(mockResult.user);
    });
    it('registerUser.rejected', () => {
      const action = {
        type: registerUser.rejected.type,
        error: { message: mockError }
      };
      const state = reducer(initialState, action);

      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBe(mockError);
    });
  });

  describe('Проверка обработки экшена loginUser', () => {
    it('loginUser.pending', () => {
      const action = { type: loginUser.pending.type };
      const state = reducer(initialState, action);

      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBe(null);
    });
    it('loginUser.fulfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: mockResult
      };
      const state = reducer(initialState, action);

      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toEqual(mockResult.user);
    });
    it('loginUser.rejected', () => {
      const action = {
        type: loginUser.rejected.type,
        error: { message: mockError }
      };
      const state = reducer(initialState, action);

      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBe(mockError);
    });
  });
  describe('Проверка обработки экшена updateUser', () => {
    it('updateUser.fulfilled', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: mockResult
      };
      const state = reducer(initialState, action);

      expect(state.user).toEqual(mockResult.user);
    });
  });

  describe('Проверка обработки экшена logoutUser', () => {
    it('logoutUser.pending', () => {
      const action = { type: logoutUser.pending.type };
      const state = reducer(initialState, action);

      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBe(null);
    });
    it('logoutUser.fulfilled', () => {
      const action = {
        type: logoutUser.fulfilled.type,
        payload: mockResult
      };
      const state = reducer(initialState, action);
      expect(state.user).toEqual(null);
    });
    it('logoutUser.rejected', () => {
      const action = {
        type: logoutUser.rejected.type,
        error: { message: mockError }
      };
      const state = reducer(initialState, action);
      expect(state.error).toBe(mockError);
    });
  });
});
