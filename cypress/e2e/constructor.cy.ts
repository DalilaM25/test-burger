describe('Интеграционные тесты', function () {
  beforeEach(() => {
    cy.visit('');
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.wait('@getIngredients');
  });
  describe('Добавление ингредиента из списка в конструктор', function () {
    it('Добавление булки в корзину', function () {
      cy.get('[data-testid="bun"]')
        .first()
        .within(() => {
          cy.get('button').click();
        });
      cy.get('[data-testid="constructor"]')

        .within(() => {
          cy.get('[data-testid="bunInConstructor"]').should(
            'have.length.greaterThan',
            0
          );
        });
    });

    it('Добавление начинок в корзину', function () {
      cy.get('[data-testid="main"]').then(($mainIngredients) => {
        const ingredientCount = $mainIngredients.length;
        for (let i = 0; i < ingredientCount; i++) {
          cy.get('[data-testid="main"]')
            .eq(i)
            .within(() => {
              cy.get('button').click();
            });
        }

        cy.get('[data-testid="constructor"]').within(() => {
          cy.get('[data-testid="mainList"]')
            .children()
            .should('have.length', ingredientCount);
        });
      });
    });
  });

  describe('Работа модальных окон', function () {
    it('Открытие окна ингридиента и закрытие по крестику', function () {
      cy.get('[data-testid="bun"]').first().click();
      cy.get('[data-testid="Детали ингредиента"]')
        .should('be.visible')
        .contains('Краторная булка N-200i');
      cy.get('[data-testid="Детали ингредиента"]').within(() => {
        cy.get('button').click();
      });
      cy.get('[data-testid="Детали ингредиента"]').should('not.exist');
    });
    it('Закрытие по оверлею', function () {
      cy.get('[data-testid="bun"]').first().click();
      cy.get('body').click(0, 0);
      cy.get('[data-testid="Детали ингредиента"]').should('not.exist');
    });
  });

  describe('Создание заказа', function () {
    beforeEach(() => {
      cy.intercept('POST', '/api/auth/login', { fixture: 'user.json' });
      cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
      cy.intercept('POST', '/api/orders', { fixture: 'order.json' });

      localStorage.setItem('refreshToken', 'refreshToken');
      cy.setCookie('accessToken', 'accessToken');
      cy.visit('');
    });
    it('Создание заказа, корректное отображение деталей заказа, очистка корзины', () => {
      cy.get('[data-testid="bun"]')
        .first()
        .within(() => {
          cy.get('button').click();
        });
      cy.get('[data-testid="main"]')
        .first()
        .within(() => {
          cy.get('button').click();
        });
      cy.get('[data-testid="constructor"]').within(() => {
        cy.contains('Оформить заказ').click();
      });
      cy.get('[data-testid="orderModal"]').should('be.visible').contains('1');
      cy.get('[data-testid=""]').within(() => {
        cy.get('button').click();
      });
      cy.get('[data-testid=""]').should('not.exist');
      cy.get('[data-testid="constructor"]').contains('Выберите булки');
      cy.get('[data-testid="constructor"]').contains('Выберите начинку');
      cy.get('[data-testid="price"]').contains('0');
    });
  });
});
