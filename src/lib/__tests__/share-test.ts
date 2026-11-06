import { canShare, formatShareMessage } from "@/lib/share";

describe("formatShareMessage", () => {
  it("puts the text, the name and the image link on three lines", () => {
    expect(formatShareMessage(1, "bulbasaur")).toBe(
      "Check out this Pokémon!\n" +
        "Bulbasaur\n" +
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
    );
  });

  it("formats the name of an alternate form and uses its ID in the link", () => {
    const [, name, link] = formatShareMessage(10001, "deoxys-attack").split("\n");

    expect(name).toBe("Deoxys Attack");
    expect(link).toMatch(/\/home\/10001\.png$/);
  });
});

describe("canShare", () => {
  it("is true for a Pokémon with a real name", () => {
    expect(canShare("bulbasaur")).toBe(true);
  });

  it('is false for an "Unknown" card', () => {
    expect(canShare("Unknown")).toBe(false);
  });
});
