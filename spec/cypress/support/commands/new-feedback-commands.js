const feedbackNew = {
  title: 'Run Wild 3',
  kind: {name: 'Feature Request' , value: 'request'},
  problem: 'RW3 p1',
  solution: 'RW3 s1',
  inbox: {name:'Acme Support', value: '1'},
  status: {name: 'review', value: 'review'},
};

Cypress.Commands.add('openNewFeedback', () => {
  cy.get(`[data-test-id="new-feedback-btn"]`)
    .click();
  cy.get(`[data-test-id="new-feedback-title"]`)
});

Cypress.Commands.add('startNewFeedback', () => {
  cy.get(`[data-test-id="new-feedback-select-type"]`)
    .select(feedbackNew.kind.name)
    .should('have.value', feedbackNew.kind.value);
  cy.get(`[data-test-id="new-feedback-select-inbox"]`)
    .select(feedbackNew.inbox.name)
    .should('have.value', feedbackNew.inbox.value);
  cy.get(`[data-test-id="new-feedback-input-title"]`)
    .clear()
    .type(feedbackNew.title);
  cy.get(`[data-test-id="new-feedback-input-problem"]`)
    .clear()
    .type(feedbackNew.problem);
  cy.get(`[data-test-id="new-feedback-input-solution"]`)
    .clear()
    .type(feedbackNew.solution);
});

Cypress.Commands.add('finishNewFeedback', () => {
  cy.get(`[data-test-id="new-feedback-submit-btn"]`)
    .click();
  cy.get(`[data-test-id="feedback-title"]`)
    .contains(feedbackNew.title);
  cy.get(`[data-test-id="feedback-status"]`)
    .contains(feedbackNew.status.value);
  cy.get(`[data-test-id="feedback-type"]`)
    .contains(feedbackNew.kind.value);
  cy.get('[data-test-id="proposal-body"]')
    .should('have.length', 2)
    .first()
    .contains(feedbackNew.problem);
  cy.get('[data-test-id="proposal-body"]')
    .should('have.length', 2)
    .last()
    .contains(feedbackNew.solution);
  cy.get('[data-test-id="new-feedback-input-title"]')
    .should('not.exist');
  cy.get('[data-test-id="feedback-tab-review"]')
    .should('have.class', 'is-active')
  cy.get('[data-test-id="feedback-tab-active"]')
    .not('.is-active');
  cy.get('[data-test-id="feedback-tab-resolved"]')
    .not('.is-active');
  cy.get('[data-test-id="feedback-list-card"]')
    .last()
    .should('have.class', 'card-active');
});

Cypress.Commands.add('cancelNewFeedback', (location) => {
  cy.get(`[data-test-id="new-feedback-cancel-${location}"]`)
    .click('left');
  cy.get('[data-test-id="new-feedback-title"]')
    .should('not.exist');
  cy.get(`[data-test-id="new-feedback-btn"]`)
});

Cypress.Commands.add('checkFormData', (kind) => {
  cy.openNewFeedback();

  if (kind === 'reset') {
    cy.get(`[data-test-id="new-feedback-select-type"]`).as('kind')
    .should('have.value', 'request');
    cy.get(`[data-test-id="new-feedback-select-inbox"]`).as('inbox')
      .should('have.value', null);
    cy.get(`[data-test-id="new-feedback-input-title"]`).as('title')
      .should('be.empty');
    cy.get(`[data-test-id="new-feedback-input-problem"]`).as('problem')
      .should('be.empty');
    cy.get(`[data-test-id="new-feedback-input-solution"]`).as('solution')
      .should('be.empty');
  } else {
    cy.get(`[data-test-id="new-feedback-select-type"]`).as('kind')
    .should('have.value', feedbackNew.kind.value);
    cy.get(`[data-test-id="new-feedback-select-inbox"]`).as('inbox')
      .should('have.value', feedbackNew.inbox.value);
    cy.get(`[data-test-id="new-feedback-input-title"]`).as('title')
      .should('have.value', feedbackNew.title);
    cy.get(`[data-test-id="new-feedback-input-problem"]`).as('problem')
      .should('have.value', feedbackNew.problem);
    cy.get(`[data-test-id="new-feedback-input-solution"]`).as('solution')
      .should('have.value', feedbackNew.solution);
  }
});

Cypress.Commands.add('RunNewFeedbackSpecs', () => {
  cy.openNewFeedback();
  cy.startNewFeedback();

  cy.cancelNewFeedback('btn');
  cy.checkFormData('preserved');

  cy.cancelNewFeedback('icon');
  cy.checkFormData('preserved');

  cy.cancelNewFeedback('mask');
  cy.checkFormData('preserved');
});