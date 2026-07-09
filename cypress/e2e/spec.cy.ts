describe("Tests Homepage de l'app", () => {
    const pages = [
        {label: "Get Started", path: "/register"},
        {label: "Login", path: "/login"},
    ];

    pages.forEach(({label, path}) => {
        it(`navigue vers ${path} en cliquant sur "${label}"`, () => {
            cy.visit("http://localhost:5173/");
            cy.contains("a", label).first().click({force: true});
            cy.location("pathname").should("include", path);
        });
    });

    it("les liens pointent vers les bonnes routes", () => {
        cy.visit("http://localhost:5173/");
        cy.contains("a", "Get Started").should("have.attr", "href", "/register");
        cy.contains("a", "Login").should("have.attr", "href", "/login");
    });

    it("la page affiche le contenu correct", () => {
        cy.visit("http://localhost:5173/");
        cy.get("h1").should("contain.text", "TaskMaster");
        cy.contains("Manage your tasks, tags, and subtasks").should("be.visible");
    });


});
