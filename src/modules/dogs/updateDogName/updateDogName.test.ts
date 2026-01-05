import { describe, it, expect } from "vitest";
import { updateDogName } from "./updateDogName.js";
import { dogs } from "../../../data/dogs.js";

describe(updateDogName.name, () => {
  it("updates the dog name successfully", () => {
    const dogId = dogs[0].id;
    const newName = "Charlie";

    const updatedDog = updateDogName({ id: dogId, name: newName });

    expect(updatedDog).not.toBeNull();
    expect(updatedDog?.id).toBe(dogId);
    expect(updatedDog?.name).toBe(newName);

    // Also verify that the original array was updated
    expect(dogs[0].name).toBe(newName);
  });

  it("returns null if dog ID does not exist", () => {
    const result = updateDogName({ id: "non-existent-id", name: "Foo" });
    expect(result).toBeNull();
  });

  it("does not change other dogs when updating one", () => {
    const dogId = dogs[0].id;
    const otherDogName = dogs[1].name;
    updateDogName({ id: dogId, name: "Charlie" });

    expect(dogs[1].name).toBe(otherDogName);
  });

  it("can update multiple times correctly", () => {
    const dogId = dogs[0].id;

    const firstUpdate = updateDogName({ id: dogId, name: "Charlie" });
    expect(firstUpdate?.name).toBe("Charlie");

    const secondUpdate = updateDogName({ id: dogId, name: "Rex" });
    expect(secondUpdate?.name).toBe("Rex");

    // Ensure the dogs array reflects the latest update
    expect(dogs[0].name).toBe("Rex");
  });
});
