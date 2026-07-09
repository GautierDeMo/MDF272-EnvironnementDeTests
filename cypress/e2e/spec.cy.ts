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
});
