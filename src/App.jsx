import BillTracker from "./components/BillTracker";
import ProjectRationale from "./components/ProjectRationale";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BillTracker />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProjectRationale />
      </div>
    </div>
  );
}

export default App;
