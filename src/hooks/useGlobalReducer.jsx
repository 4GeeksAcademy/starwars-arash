import { useContext, useMemo } from "react";
import { Context } from "../main.jsx";
import { storeActions } from "../store.js";

export default function useGlobalReducer() {
  const { store, dispatch } = useContext(Context);

  const actions = useMemo(() => {
    const getStore = () => store;
    const base = storeActions(dispatch);

    return {
      ...base,
      addFavorite: (fav) => base.addFavorite(fav, getStore),
      removeFavorite: (type, uid) => base.removeFavorite(type, uid, getStore),
      toggleFavorite: (fav) => base.toggleFavoriteSafe(fav, getStore)
    };
  }, [dispatch, store]);

  return { store, actions };
}