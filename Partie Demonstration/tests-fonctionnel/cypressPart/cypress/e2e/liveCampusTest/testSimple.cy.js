describe("Test du site Live Campus", () => {
    
    /*beforeEach(() => {
        cy.visit("https://www.livecampus.fr")
    })
    
    it("should show école word", () => {
        cy.contains("h1", "Votre école d'informatique", { matchCase: false }).should("be.visible")
        cy.contains("en ligne et en direct", { matchCase: false }).should("be.visible")
        // EN LIGNE ET EN DIRECT ou En Ligne Et En Direct
    })
    it("should redirect correctly", () => {
        cy.contains("a", "Candidater")
            .should("be.visible")
            .and("have.attr", "href")
            .and("includes", "/candidature")
        cy.contains("a", "brochures", { matchCase: false })
            .should("be.visible")
            .and("have.attr", "href")
            .and("includes", "/demande-brochure")
    })*/
    /*it("Should Show every formation", () => {
        const formations = [
            'Bachelor',
            'Mastère',
            'Cybersécurité',
            'Informatique',
            'Marketing',
            'Data & IA',
        ]
        // match /Bachelor/ est contenu Bachelors || contains on cherche le mot Bachelor
        formations.forEach(f => {
            cy.scrollIntoView().contains(f, {matchCase: false}).should("be.visible")
        })
    })*/
    /*it("Should said if Form exist", () => {
        cy.visit("https://www.livecampus.fr/candidature")
        cy.contains("formulaire de candidature", { matchCase: false }).should("exist")
    })

    it("can't scroll", () => {
        cy.window().then(win => {
            const doc = win.document.documentElement
            expect(doc.scrollWidth, "largeur scrollable").to.be.lte(doc.clientWidth + 26)
        })
    })*/


    it("can't scroll", () => {
        cy.viewport(375, 812)
        cy.visit("https://www.livecampus.fr")
        cy.window().then(win => {
            const doc = win.document.documentElement
            expect(doc.scrollWidth, "largeur scrollable").to.be.lte(doc.clientWidth + 26)
        })
    })

    it("should have a good captain", () => {
        cy.visit("https://www.livecampus.fr")
        const pages = [
            { label: "Candidater", path : "/candidature"},
            { label: "Brochures", path : "/demande-brochure"},
        ]

        pages.forEach(({label, path}) => {
            cy.goTo("/")
            cy.contains("a", label).first().click({ force: true })
            cy.location("pathname").should("includes", path)
        })
    })
})