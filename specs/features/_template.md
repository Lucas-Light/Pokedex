# Feature: <name>

> Issue: #? · Status: draft

## Goal

As a <user>, I want to <action>, so that <outcome>.

## Acceptance criteria

Each one testable on the phone (and, where possible, in a unit test on the hook or service).

- [ ] <...>
- [ ] <...>

## Screens & UI

- Route(s): `src/app/<...>.tsx`
- Figma frame: <link or name>
- <What is on screen, interactions, navigation in and out.>

## Data

- Endpoint(s): `GET https://pokeapi.co/api/v2/<...>`
- Query key(s): `[...]`
- Fields used: <...>
- Stored in SQLite: <yes/no — what>

## States

- **Loading:** <...>
- **Error:** <... + retry?>
- **Empty:** <...>

## Code layout

- UI: `src/components/<...>`
- Data (API + queries): `src/api/<...>`, `src/hooks/<...>`
- Logic (pure functions): `src/lib/<...>`

## Out of scope

- <...>

## Open questions

- <...>
