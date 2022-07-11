import { fireEvent, render, screen } from "@testing-library/react";

import Authorization, { IAuthorizationProps } from "../index";

const renderComponent = (props?: IAuthorizationProps) => render(<Authorization onSubmit={() => {}} {...props} />);

type RenderWithMockProps = { email: string; password: string; onSubmit: IAuthorizationProps["onSubmit"] };
const renderFormWithMock = ({ email, password, onSubmit }: RenderWithMockProps) => {
  renderComponent({ onSubmit });

  fireEvent.change(screen.getByTestId("emailField"), { target: { value: email } });
  fireEvent.change(screen.getByTestId("passwordField"), { target: { value: password } });
  fireEvent.click(screen.getByTestId("authorizationButton"));
};

describe("Authorization component", () => {
  it("should render", () => {
    renderComponent();
    screen.getByTestId("authorization");
  });

  it("should render form", () => {
    renderComponent();
    screen.getByTestId("authorizationForm");
  });

  it("should render email and password fields", () => {
    renderComponent();
    screen.getByTestId("emailField");
    screen.getByTestId("passwordField");
  });

  it("should render disabled submit button", () => {
    renderComponent();
    expect(screen.getByTestId("authorizationButton")).toBeDisabled();
  });

  it("should not submit form with dirty data", () => {
    const onSubmitMock = jest.fn();
    renderFormWithMock({ onSubmit: onSubmitMock, email: "foobar", password: "123456" });
    expect(onSubmitMock).not.toBeCalled();
  });

  it("should submit form with good data", () => {
    const onSubmitMock = jest.fn();
    renderFormWithMock({ onSubmit: onSubmitMock, email: "foobar@mail.ru", password: "12345678" });
    expect(onSubmitMock).toBeCalled();
  });
});
