import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Section from "../components/Section.jsx";
import Loading from "../components/Loading.jsx";
import ErrorAlert from "../components/ErrorAlert.jsx";

export default function Home() {
  const { store, actions } = useGlobalReducer();

  useEffect(() => {
    // load only if empty (avoid spam reloads)
    if (store.people.length === 0 && store.planets.length === 0 && store.vehicles.length === 0) {
      actions.loadAll();
    }
  }, []);

  return (
    <div className="container py-4">
      {store.error && <ErrorAlert message={store.error} />}
      {store.loading && <Loading />}

      <Section title="Characters" type="people" items={store.people} />
      <Section title="Planets" type="planets" items={store.planets} />
      <Section title="Vehicles" type="vehicles" items={store.vehicles} />
    </div>
  );
}