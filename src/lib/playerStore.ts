export type PlayerState = {
  src: string | null;
  title?: string;
  episodeNumber?: number;
  currentTime: number;
  duration?: number;
  playing: boolean;
};

type Listener = (state: PlayerState) => void;

export function createPlayerStore(initial?: Partial<PlayerState>) {
  let state: PlayerState = {
    src: null,
    currentTime: 0,
    playing: false,
    ...initial,
  };

  const listeners = new Set<Listener>();

  return {
    get() {
      return state;
    },
    set(next: Partial<PlayerState>) {
      state = { ...state, ...next };
      listeners.forEach((listener) => listener(state));
    },
    subscribe(listener: Listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
