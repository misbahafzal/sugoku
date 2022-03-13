function Buttons(props: {
  onClick: (arg0: any) => void;
  onClear: (arg0: any) => void;
}) {
  const handleGetPuzzle = (e: string) => {
    props.onClick(e);
  };
  const clearBoard = (e: any) => {
    props.onClear(e);
  };
  return (
    <div className="right-float">
      <div className="ui buttons">
        <button
          className="ui basic difficulty button"
          onClick={() => handleGetPuzzle("easy")}
        >
          Easy
        </button>
        <button
          className="ui basic difficulty button"
          onClick={() => handleGetPuzzle("medium")}
        >
          Medium
        </button>
        <button
          className="ui basic difficulty button"
          onClick={() => handleGetPuzzle("hard")}
        >
          Hard
        </button>
        <button
          className="ui basic difficulty button"
          onClick={() => handleGetPuzzle("random")}
        >
          Random
        </button>
      </div>
      <button className="ui basic button clear" onClick={clearBoard}>
        Clear
      </button>
    </div>
  );
}
export default Buttons;
