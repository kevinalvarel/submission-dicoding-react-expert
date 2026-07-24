/**
 * Skenario pengujian E2E Login:
 *
 * - Login spec:
 *   1. Harus menampilkan halaman login dengan benar (form, input email, input password, tombol login)
 *   2. Harus menampilkan alert ketika email dan password kosong
 *   3. Harus menampilkan alert ketika login gagal (email/password salah)
 *   4. Harus berhasil login dan redirect ke halaman utama dengan tombol logout muncul
 */

describe("Login spec", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should display login page correctly", () => {
    cy.get("#input-email").should("be.visible");
    cy.get("#input-password").should("be.visible");
    cy.get("#btn-login-submit").should("be.visible");
  });

  it("should display alert when email is empty", () => {
    cy.on("window:alert", (str) => {
      expect(str).to.be.a("string");
    });
    cy.get("#btn-login-submit").click();
  });

  it("should display alert when login fails with wrong credentials", () => {
    cy.on("window:alert", (str) => {
      expect(str).to.equal("email or password is wrong");
    });
    cy.get("#input-email").type("wronguser@example.com");
    cy.get("#input-password").type("wrongpassword");
    cy.get("#btn-login-submit").click();

    cy.url().should("include", "/login");
  });

  it("should login successfully and redirect to homepage", () => {
    cy.get("#input-email").type("testusere2e_forum@example.com");
    cy.get("#input-password").type("testpassword123");
    cy.get("#btn-login-submit").click();

    cy.url({ timeout: 10000 }).should("not.include", "/login");
    cy.get("#btn-logout", { timeout: 10000 }).should("be.visible");
  });
});
