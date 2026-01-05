import { describe, it, expect } from "vitest";
import { getDogs } from "./getDogs.js";
import { dogs } from "../../../data/dogs.js";

describe(getDogs.name, () => {
  it("returns all dogs when no args are provided", () => {
    const result = getDogs({});
    expect(result.length).toBe(dogs.length);
    expect(result).toEqual(dogs);
  });

  it("filters by name only", () => {
    const result = getDogs({ name: "Buddy" });
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Buddy");
  });

  it("filters by breed only", () => {
    const result = getDogs({ breed: "German Shepherd" });
    expect(result.length).toBe(1);
    expect(result[0].breed).toBe("German Shepherd");
  });

  it("filters by both name and breed", () => {
    const result = getDogs({ name: "Max", breed: "German Shepherd" });
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Max");
    expect(result[0].breed).toBe("German Shepherd");
  });

  it("returns empty array if no dogs match", () => {
    const result = getDogs({ name: "Nonexistent", breed: "Poodle" });
    expect(result.length).toBe(0);
    expect(result).toEqual([]);
  });

  it("is case-insensitive when filtering", () => {
    const result = getDogs({ name: "buddy", breed: "golden retriever" });
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Buddy");
  });

  it("works if only one filter matches some dogs (AND logic)", () => {
    const result = getDogs({ name: "Buddy", breed: "German Shepherd" });
    expect(result.length).toBe(0);
  });

  it("returns all dogs if empty strings are passed", () => {
    const result = getDogs({ name: "", breed: "" });
    expect(result.length).toBe(dogs.length);
  });
});
