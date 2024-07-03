import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Addresses } from "../Addresses.page";
import { useDepartments } from "../hooks/useDepartments";

describe("addresses", () => {
  test("form can be filled out and creates an address item on submit", async () => {
    const departments = useDepartments();
    const address = {
      address: "Some street in some city",
      departmentIds: departments.slice(0, 1).map((department) => department.id),
      description: "A non-helpful description",
    };
    const user = userEvent.setup();
    render(<Addresses />);

    expect(screen.queryAllByTestId("box-address")).toHaveLength(0);

    // fill out
    await user.type(screen.getByTestId("input-address"), address.address);
    fireEvent.change(screen.getByTestId("input-departments"), {
      target: { value: address.departmentIds.join(",") },
    });
    await user.type(
      screen.getByTestId("input-description"),
      address.description,
    );
    await user.click(screen.getByTestId("button-submit"));

    // check for item
    expect(screen.getAllByTestId("box-address")).toHaveLength(1);
    expect(screen.getByTestId("box-address")).toHaveTextContent(
      `No. of departments who use this address: ${address.departmentIds.length}`,
    );
    expect(screen.getByTestId("box-address")).toHaveTextContent(
      `Directions: ${address.description}`,
    );

    // create another one
    await user.click(screen.getByTestId("button-submit"));

    // there should be 2 items now
    expect(screen.getAllByTestId("box-address")).toHaveLength(2);
  });

  test("form validates required fields", async () => {
    const user = userEvent.setup();
    render(<Addresses />);

    await user.click(screen.getByTestId("button-submit"));

    expect(screen.getByText("Address is required")).toBeVisible();
    expect(screen.getByText("Select at least one department")).toBeVisible();
    expect(screen.queryAllByTestId("box-address")).toHaveLength(0);
  });

  test("items can be deleted", async () => {
    const departments = useDepartments();
    const address = {
      address: "Some street in some city",
      departmentIds: departments.slice(0, 1).map((department) => department.id),
      description: "A non-helpful description",
    };
    const user = userEvent.setup();
    render(<Addresses />);

    // fill out
    await user.type(screen.getByTestId("input-address"), address.address);
    fireEvent.change(screen.getByTestId("input-departments"), {
      target: { value: address.departmentIds.join(",") },
    });
    await user.type(
      screen.getByTestId("input-description"),
      address.description,
    );
    await user.click(screen.getByTestId("button-submit"));

    // check for item
    expect(screen.getAllByTestId("box-address")).toHaveLength(1);

    // delete the item
    await user.click(screen.getByTestId("icon-delete"));

    // item should be gone
    expect(screen.queryAllByTestId("box-address")).toHaveLength(0);
  });
});
