const API_BASE = "https://www.swapi.tech/api";

export const initialStore = () => ({
  people: [],
  planets: [],
  vehicles: [],
  favorites: [], // { type: "people"|"planets"|"vehicles", uid: "1", name: "Luke..." }

  loading: false,
  error: null
});

export default function storeReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_LIST":
      return { ...state, [action.payload.key]: action.payload.items, error: null };
    case "SET_FAVORITES":
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
}

async function jsonFetch(url, options = {}) {
  const resp = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  return resp.json();
}

export const storeActions = (dispatch) => {
  const actions = {
    loadList: async (type) => {
      // type: "people" | "planets" | "vehicles"
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const data = await jsonFetch(`${API_BASE}/${type}`);
        const items = (data?.results || []).map((it) => ({
          uid: String(it.uid),
          name: it.name
        }));
        dispatch({ type: "SET_LIST", payload: { key: type, items } });
      } catch (e) {
        dispatch({ type: "SET_ERROR", payload: e.message });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },

    loadAll: async () => {
      await Promise.all([actions.loadList("people"), actions.loadList("planets"), actions.loadList("vehicles")]);
    },

    getDetails: async (type, uid) => {
      // returns only the properties object
      const data = await jsonFetch(`${API_BASE}/${type}/${uid}`);
      return data?.result?.properties || null;
    },

    toggleFavorite: (fav) => {
      // fav: {type, uid, name}
      dispatch((prev) => prev); // no-op agar  reducer doesn't support function dispatch, oke ke ignore konim
      
    },

    addFavorite: (fav, getStore) => {
      const store = getStore();
      const exists = store.favorites.some((f) => f.type === fav.type && String(f.uid) === String(fav.uid));
      if (exists) return;

      const next = [...store.favorites, { ...fav, uid: String(fav.uid) }];
      dispatch({ type: "SET_FAVORITES", payload: next });
    },

    removeFavorite: (type, uid, getStore) => {
      const store = getStore();
      const next = store.favorites.filter((f) => !(f.type === type && String(f.uid) === String(uid)));
      dispatch({ type: "SET_FAVORITES", payload: next });
    },

    toggleFavoriteSafe: (fav, getStore) => {
      const store = getStore();
      const exists = store.favorites.some((f) => f.type === fav.type && String(f.uid) === String(fav.uid));
      if (exists) actions.removeFavorite(fav.type, fav.uid, getStore);
      else actions.addFavorite(fav, getStore);
    }
  };

  return actions;
};