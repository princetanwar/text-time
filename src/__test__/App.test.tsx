import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { allTimezones } from "../utils/data";

describe("test form application component", () => {
  const user = userEvent.setup();
  it("App component element render successfully", () => {
    render(<App />);

    const dateInputElement = screen.getByRole("textbox");
    expect(dateInputElement).toBeInTheDocument();

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    const submitButton = screen.getByRole("button", {
      name: /create/i,
    });

    expect(submitButton).toBeInTheDocument();
  });

  it("input element update correctly", async () => {
    render(<App />);

    const dateInputElement = screen.getByRole("textbox");
    expect(dateInputElement).toBeInTheDocument();

    await act(async () => {
      await user.type(dateInputElement, "10 am after 2 days");
    });
    expect(dateInputElement).toHaveValue("10 am after 2 days");
  });

  it("select element update correctly", async () => {
    render(<App />);
    const selectElement = screen.getByRole("combobox");

    userEvent.selectOptions(selectElement, allTimezones[0]);

    // Wait for the DOM to update
    await screen.findByDisplayValue(allTimezones[0]);

    expect(selectElement).toHaveValue(allTimezones[0]);
  });

  it("getting correct result", async () => {
    render(<App />);

    const dateInputElement = screen.getByRole("textbox");
    await act(async () => {
      await user.type(dateInputElement, "10 am after 2 days");
    });

    const selectElement = screen.getByRole("combobox");
    userEvent.selectOptions(selectElement, "Asia/Qatar");
    await screen.findByDisplayValue("Asia/Qatar");

    const submitButton = screen.getByRole("button", {
      name: /create/i,
    });

    const resultElement = screen.getByRole("result");

    expect(resultElement).toHaveTextContent("");

    await act(async () => {
      await user.click(submitButton);
    });

    const tmpDate = new Date();
    tmpDate.setDate(new Date().getDate() + 2);

    expect(resultElement.textContent?.trim()).toEqual(
      `${tmpDate.getFullYear()}-${(tmpDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${tmpDate.getDate()} 10:00:00 AM (+03:00)`
    );
  });
});
