import '../support/commands';

describe('Интеграционные тесты', function () {
  beforeEach(() => {
    cy.visit('');
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.wait('@getIngredients');
    cy.get('[data-testid="bun"]').as('bun');
    cy.get('[data-testid="constructor"]').as('constructor');
    cy.get('[data-testid="main"]').as('main');
  });
  describe('Добавление ингредиента из списка в конструктор', function () {
    it('Добавление булки в корзину', function () {
      cy.clickIngredient('@bun');
      cy.get('@constructor').within(() => {
        cy.get('[data-testid="bunInConstructor"]').should(
          'have.length.greaterThan',
          0
        );
      });
    });

    it('Добавление начинок в корзину', function () {
      cy.get('@main').then(($mainIngredients) => {
        const ingredientCount = $mainIngredients.length;
        for (let i = 0; i < ingredientCount; i++) {
          cy.get('@main')
            .eq(i)
            .within(() => {
              cy.get('button').click();
            });
        }
        cy.get('@constructor').within(() => {
          cy.get('[data-testid="mainList"]')
            .children()
            .should('have.length', ingredientCount);
        });
      });
    });
  });

  describe('Работа модальных окон', function () {
    it('Открытие окна ингридиента и закрытие по крестику', function () {
      cy.get('@bun').first().click();
      cy.get('[data-testid="Детали ингредиента"]').as('details');
      cy.modalIsOpen('@details', 'Краторная булка N-200i');
      cy.clickIngredient('@details');
      cy.get('@details').should('not.exist');
    });
    it('Закрытие по оверлею', function () {
      cy.get('@bun').first().click();
      cy.get('body').click(0, 0);
      cy.get('[data-testid="Детали ингредиента"]').should('not.exist');
    });
  });

  describe('Создание заказа', function () {
    beforeEach(() => {
      cy.intercept('POST', '/api/auth/login', { fixture: 'user.json' });
      cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
      cy.intercept('POST', '/api/orders', { fixture: 'order.json' });

      cy.window().then((win) => {
        win.localStorage.setItem('ключ', 'значение');
      });
      cy.setCookie('accessToken', 'accessToken');
      cy.visit('');
    });
    it('Создание заказа, корректное отображение деталей заказа, очистка корзины', () => {
      cy.createOrder();
      cy.modalIsOpen('[data-testid="orderModal"]', '1');
      cy.get('[data-testid=""]').within(() => {
        cy.get('button').click();
      });
      cy.get('[data-testid=""]').should('not.exist');
      cy.get('@constructor').contains('Выберите булки');
      cy.get('@constructor').contains('Выберите начинку');
      cy.get('[data-testid="price"]').contains('0');
    });
    afterEach(() => {
      cy.window().then((win) => {
        win.localStorage.removeItem('refreshToken');
      });
      cy.clearCookie('accessToken');
    });
  });
});
