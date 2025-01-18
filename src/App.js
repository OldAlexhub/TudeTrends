import Footer from "./components/Footer";
import RouteManager from "./routeManager/RouteManager";

function App() {
  return (
    <div>
      <main>
        <RouteManager />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
