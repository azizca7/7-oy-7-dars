import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import PostList from "./components/PostList";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-4xl font-bold text-center mb-4">Postlar</h1>

        <PostList searchTerm={searchTerm} />
      </div>
    </Provider>
  );
}

export default App;
