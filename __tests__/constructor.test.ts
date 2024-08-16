import reducer, {
  addIngredients,
  deleteIngredient,
  moveIngredientUp,
  moveIngredientDown,
  initialState
} from '../src/services/constructor/slice';

const ingredient = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0,
  id: '1'
};
const sause = {
  _id: '643d69a5c3f7b9001cfa0943',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
  __v: 0,
  id: '2'
};

const stateWithIngredient = {
  bun: null,
  ingredients: [ingredient]
};

const stateOne = {
  bun: null,
  ingredients: [ingredient, sause]
};

const stateTwo = {
  bun: null,
  ingredients: [sause, ingredient]
};

describe('Тест редьюсера слайса constructor', () => {
  it('Добавляется ингредиент', () => {
    const newState = reducer({ ...initialState }, addIngredients(ingredient));
    const { ingredients } = newState;

    expect(ingredients).toEqual([ingredient]);
  });
  it('Удаляется ингредиент', () => {
    const newState = reducer({ ...stateWithIngredient }, deleteIngredient(0));

    expect(newState).toEqual(initialState);
  });
  it('Ингредиент перемещается вверх', () => {
    const newState = reducer({ ...stateOne }, moveIngredientUp(1));

    expect(newState).toEqual(stateTwo);
  });
  it('Ингредиент перемещается вниз', () => {
    const newState = reducer({ ...stateTwo }, moveIngredientDown(0));

    expect(newState).toEqual(stateOne);
  });
});
