import {
  addToSlots,
  canCompare,
  clearSlot,
  EMPTY_SLOTS,
  excludePokemon,
  formatStatRowLabel,
  getCompareArea,
  getHigherSide,
  getOtherSlot,
  getSlotFromParam,
  getSlotStatus,
  setSlot,
  toCompareRows,
} from "@/lib/compare";
import type { PokemonStat } from "@/lib/pokemon";

const LABELS = ["HP", "Attack", "Defense", "Special Attack", "Special Defense", "Speed"];

function toStats(values: number[]): PokemonStat[] {
  return values.map((value, index) => ({ label: LABELS[index], value, percent: 0 }));
}

const charizard = toStats([78, 84, 78, 109, 85, 100]);
const blastoise = toStats([79, 83, 100, 85, 105, 78]);
const pikachu = toStats([35, 55, 40, 50, 50, 90]);

function getGreenValues(left: PokemonStat[], right: PokemonStat[]): number[] {
  return toCompareRows(left, right).flatMap((row) => {
    if (row.higher === "tie") {
      return [];
    }
    return [row.higher === "left" ? row.left : row.right];
  });
}

describe("addToSlots", () => {
  it("fills slot 1 when it is empty", () => {
    expect(addToSlots(EMPTY_SLOTS, 6)).toEqual([6, null]);
  });

  it("fills slot 2 when only slot 1 is filled", () => {
    expect(addToSlots([6, null], 9)).toEqual([6, 9]);
  });

  it("fills slot 1 when only slot 2 is filled", () => {
    expect(addToSlots([null, 9], 6)).toEqual([6, 9]);
  });

  it("replaces slot 2 when both slots are filled", () => {
    expect(addToSlots([6, 9], 25)).toEqual([6, 25]);
  });

  it("changes nothing when the Pokémon is already in a slot", () => {
    expect(addToSlots([6, 9], 6)).toEqual([6, 9]);
    expect(addToSlots([6, 9], 9)).toEqual([6, 9]);
    expect(addToSlots([null, 9], 9)).toEqual([null, 9]);
  });
});

describe("setSlot", () => {
  it("replaces only the chosen slot", () => {
    expect(setSlot([6, 9], 0, 25)).toEqual([25, 9]);
    expect(setSlot([6, 9], 1, 25)).toEqual([6, 25]);
  });

  it("fills an empty slot", () => {
    expect(setSlot(EMPTY_SLOTS, 1, 25)).toEqual([null, 25]);
  });

  it("changes nothing when picking the slot's current Pokémon", () => {
    expect(setSlot([6, 9], 0, 6)).toEqual([6, 9]);
  });

  it("does not put the same Pokémon in both slots", () => {
    expect(setSlot([6, 9], 0, 9)).toEqual([6, 9]);
  });
});

describe("clearSlot", () => {
  it("leaves the other Pokémon in its own slot", () => {
    expect(clearSlot([6, 9], 0)).toEqual([null, 9]);
    expect(clearSlot([6, 9], 1)).toEqual([6, null]);
  });
});

describe("getOtherSlot", () => {
  it("returns the opposite slot", () => {
    expect(getOtherSlot(0)).toBe(1);
    expect(getOtherSlot(1)).toBe(0);
  });
});

describe("getSlotFromParam", () => {
  it("reads the slot from the route param", () => {
    expect(getSlotFromParam("0")).toBe(0);
    expect(getSlotFromParam("1")).toBe(1);
  });

  it("falls back to slot 1 without a valid param", () => {
    expect(getSlotFromParam(undefined)).toBe(0);
    expect(getSlotFromParam("2")).toBe(0);
  });
});

describe("canCompare", () => {
  it("allows a Pokémon with a name", () => {
    expect(canCompare("bulbasaur")).toBe(true);
  });

  it("does not allow an Unknown card", () => {
    expect(canCompare("Unknown")).toBe(false);
  });
});

describe("excludePokemon", () => {
  const items = [
    { id: 6, name: "charizard" },
    { id: 9, name: "blastoise" },
  ];

  it("leaves out the Pokémon in the other slot", () => {
    expect(excludePokemon(items, 9)).toEqual([{ id: 6, name: "charizard" }]);
  });

  it("keeps everything when the other slot is empty", () => {
    expect(excludePokemon(items, null)).toEqual(items);
  });

  it("leaves nothing when the only match is the other slot's Pokémon", () => {
    expect(excludePokemon([{ id: 9, name: "blastoise" }], 9)).toEqual([]);
  });
});

describe("getHigherSide", () => {
  it("returns the side with the higher value", () => {
    expect(getHigherSide(84, 83)).toBe("left");
    expect(getHigherSide(78, 100)).toBe("right");
  });

  it("returns a tie for equal values", () => {
    expect(getHigherSide(50, 50)).toBe("tie");
  });
});

describe("toCompareRows", () => {
  it("keeps the stat order and each side's values", () => {
    const rows = toCompareRows(charizard, blastoise);

    expect(rows.map((row) => row.label)).toEqual(LABELS);
    expect(rows.map((row) => [row.left, row.right])).toEqual([
      [78, 79],
      [84, 83],
      [78, 100],
      [109, 85],
      [85, 105],
      [100, 78],
    ]);
  });

  it("marks the higher values of Charizard and Blastoise", () => {
    expect(getGreenValues(charizard, blastoise)).toEqual([79, 84, 100, 109, 105, 100]);
  });

  it("marks nothing for Pikachu and pikachu-phd, which have equal stats", () => {
    expect(getGreenValues(pikachu, pikachu)).toEqual([]);
  });

  it("moves the higher side along when the Pokémon swap slots", () => {
    const sides = toCompareRows(charizard, blastoise).map((row) => row.higher);
    const swapped = toCompareRows(blastoise, charizard).map((row) => row.higher);

    expect(sides).toEqual(["right", "left", "right", "left", "right", "left"]);
    expect(swapped).toEqual(["left", "right", "left", "right", "left", "right"]);
  });
});

describe("getSlotStatus", () => {
  it("is empty without an ID", () => {
    expect(getSlotStatus(null, { hasData: false, isPending: true })).toBe("empty");
  });

  it("is loading while the first request runs", () => {
    expect(getSlotStatus(6, { hasData: false, isPending: true })).toBe("loading");
  });

  it("is failed when the request ended without data", () => {
    expect(getSlotStatus(6, { hasData: false, isPending: false })).toBe("failed");
  });

  it("is loaded with cached data, with no spinner", () => {
    expect(getSlotStatus(6, { hasData: true, isPending: false })).toBe("loaded");
  });
});

describe("getCompareArea", () => {
  it("shows the prompt with an empty slot", () => {
    expect(getCompareArea("empty", "empty")).toBe("prompt");
    expect(getCompareArea("loaded", "empty")).toBe("prompt");
    expect(getCompareArea("empty", "loaded")).toBe("prompt");
    expect(getCompareArea("loading", "empty")).toBe("prompt");
  });

  it("shows nothing once a slot has failed, also with an empty slot", () => {
    expect(getCompareArea("failed", "loaded")).toBe("none");
    expect(getCompareArea("loading", "failed")).toBe("none");
    expect(getCompareArea("failed", "failed")).toBe("none");
    expect(getCompareArea("failed", "empty")).toBe("none");
  });

  it("shows one spinner while either Pokémon loads", () => {
    expect(getCompareArea("loading", "loading")).toBe("loading");
    expect(getCompareArea("loaded", "loading")).toBe("loading");
  });

  it("shows the stats when both have loaded", () => {
    expect(getCompareArea("loaded", "loaded")).toBe("stats");
  });
});

describe("formatStatRowLabel", () => {
  it("reads the stat with both names and values", () => {
    const [, attack] = toCompareRows(charizard, blastoise);

    expect(formatStatRowLabel(attack, "charizard", "blastoise")).toBe(
      "Attack: Charizard 84, Blastoise 83",
    );
  });
});
