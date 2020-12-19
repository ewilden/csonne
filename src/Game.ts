import type { Game, Ctx, PlayerID } from 'boardgame.io';
import { INVALID_MOVE } from 'boardgame.io/core';
import { Map, Record } from 'immutable';

enum Terrain {
  FIELD,
  ROAD,
  CITY
}

type Middle = Terrain.FIELD | Terrain.CITY;

const { FIELD, ROAD, CITY } = Terrain;

const MkLoc = Record({ x: 0, y: 0 });
type Loc = ReturnType<typeof MkLoc>;
const MkCell = Record({
  n: FIELD,
  s: FIELD,
  w: FIELD,
  e: FIELD,
  middle: FIELD
});
type Cell = ReturnType<typeof MkCell>;
const cell: Cell = MkCell({ n: ROAD, e: ROAD });

interface State {
  cells: Map<Loc, Cell>;
}

export const TicTacToe: Game<State> = {
  setup: () => ({ cells: Map() }),
  turn: {
    moveLimit: 1
  },
  //   endIf: (G, ctx) => {
  //     if (isVictory(G)) {
  //       return { winner: ctx.currentPlayer };
  //     }
  //     if (isDraw(G)) {
  //       return { draw: true };
  //     }
  //   },
  moves: {
    clickCell: (
      G: State,
      ctx: Ctx,
      { id, loc }: { id: PlayerID; loc: Loc }
    ) => {
      if (!G.cells.get(loc) == null) {
        return INVALID_MOVE;
      }
      const xcoord = loc.x;
      G.cells = G.cells.set(loc, MkCell({ e: CITY }));
    }
  }
};
