import Row from "./components/Row";
import requests from "./request";
import "./App.css";
import Banner from "./components/Banner";
import Nav from "./components/Nav";
import Footer from "./components/Footer"

const App = () => {
  const {
    fetchNetflixOriginals,
    fetchTrending,
    fetchTopRated,
    fetchActionMovies,
    fetchComedyMovies,
    fetchHorrorMovies,
    fetchRomanceMovies,
    fetchDocumantaries,
  } = requests;

  return (
    <div className="app">
      <Nav />
      <Banner fetchUrl={fetchNetflixOriginals} />
      <Row
        title="Netflix Originals"
        fetchUrl={fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={fetchTrending} />
      <Row title="Top Rated" fetchUrl={fetchTopRated} />
      <Row title="Action Movies" fetchUrl={fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={fetchDocumantaries} />

      <Footer/>
    </div>
  );
};

export default App;
