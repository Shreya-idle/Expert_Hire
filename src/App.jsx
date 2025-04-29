import { Route, Switch } from "wouter";
import Home from "./pages/Home.jsx";
import ArticleDetail from "./pages/ArticleDetail.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/articles/:id" component={ArticleDetail} />
          <Route>
            <div className="container mx-auto px-4 py-8 text-center">
              <h1 className="text-2xl font-bold mb-4">404 - Page Not Found</h1>
              <p>The page you are looking for does not exist.</p>
            </div>
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;