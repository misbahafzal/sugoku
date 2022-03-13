import "../src/assets/css/style.css";
import MainTitle from "./components/MainTitle";
import ContactLinks from "./components/ContactLinks";
import SudokuBoard from "./components/SudokuBoard";

function App() {
  return (
    <html>
      <head className="App-header">
        <title>Sugoku</title>
      </head>
      <body>
        <a href="https://github.com/bertoort/sugoku" className="main-img">
          <img
            src="https://camo.githubusercontent.com/a6677b08c955af8400f44c6298f40e7d19cc5b2d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67"
            alt="Fork me on GitHub"
          />
        </a>
        <MainTitle></MainTitle>
        <SudokuBoard></SudokuBoard>
        <ContactLinks></ContactLinks>
      </body>
    </html>
  );
}

export default App;
