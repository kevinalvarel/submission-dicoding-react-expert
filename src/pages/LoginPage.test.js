/**
 * - LoginPage component:
 *   1. Harus menampilkan form login dengan input email dan password
 *   2. Harus bisa mengetik email pada input email
 *   3. Harus bisa mengetik password pada input password
 *   4. Harus memanggil dispatch asyncSetAuthUser ketika form disubmit
 */

import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import LoginPage from "./LoginPage";
import authUserReducer from "../states/authUser/reducer";
import isPreloadReducer from "../states/isPreload/reducer";
import isLoadingReducer from "../states/isLoading/reducer";

// mock asyncSetAuthUser
const mockDispatchResult = jest.fn();
jest.mock("../states/authUser/action", () => ({
  ...jest.requireActual("../states/authUser/action"),
  asyncSetAuthUser: ({ email, password }) => {
    mockDispatchResult({ email, password });
    return () => Promise.resolve();
  },
}));

function renderLoginPage() {
  const store = configureStore({
    reducer: {
      authUser: authUserReducer,
      isPreload: isPreloadReducer,
      isLoading: isLoadingReducer,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>,
  );
}

describe("LoginPage component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display login form with email and password inputs", () => {
    renderLoginPage();
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Masuk" });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should allow typing email in email input", () => {
    renderLoginPage();
    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");
  });

  it("should allow typing password in password input", () => {
    renderLoginPage();
    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "secretpassword" } });
    expect(passwordInput.value).toBe("secretpassword");
  });

  it("should call dispatch asyncSetAuthUser when form is submitted", async () => {
    renderLoginPage();
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Masuk" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    expect(mockDispatchResult).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });
});
