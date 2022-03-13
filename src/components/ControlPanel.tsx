import Buttons from "./Buttons";
import { FaGraduationCap, FaCheck } from "react-icons/fa";
import validationService from "../services/validationService";
import utilsService from "../utils/mapper";

function ControlPanel(props: {
  state: { difficulty: string; status: string; board: any[][] };
  updateState: (arg0: any) => void;
  onLevelButtonClick: (arg0: any) => void;
  onClear: (arg0: any) => void;
}) {
  const handleDifficulty = () => {
    props.updateState({
      ...props.state,
      difficulty: validationService.grade(props.state),
    });
  };

  const handleValidation = () => {
    const isValid = validationService.validate(props.state);
    const isSolved = validationService.solve(props.state);
    console.log(isValid, isSolved);
    if (isValid && isSolved) {
      props.updateState({ ...props.state, status: "solved" });
    } else if (!isValid && isSolved) {
      props.updateState({ ...props.state, status: "broken" });
    } else {
      props.updateState({ ...props.state, status: "unsolved" });
    }
  };

  const handleSolve = async () => {
    const formatBoard = utilsService.formatBoard(props.state.board);
    console.log(formatBoard);

    const solvedPuzzle = await validationService.solvePuzzle({
      board: formatBoard,
    });
    if (solvedPuzzle) {
      console.log(solvedPuzzle);
      props.updateState({
        ...props.state,
        board: utilsService.makeArray(solvedPuzzle.solution),
        status: solvedPuzzle.status,
      });
    }
  };

  return (
    <div className="control-panel">
      <section>
        <h3> Generate: </h3>
        <Buttons
          onClick={props.onLevelButtonClick}
          onClear={props.onClear}
        ></Buttons>
      </section>
      <section>
        <div className="ui left labeled button right-float">
          <a className="ui basic right label value-box diff">
            {props.state.difficulty}
          </a>
          <div
            className="ui basic button button-label grade"
            onClick={handleDifficulty}
          >
            <FaGraduationCap /> &nbsp;Difficulty
          </div>
        </div>
        <div className="ui labeled button">
          <div
            className="ui basic button button-label validate"
            onClick={handleValidation}
          >
            <FaCheck /> &nbsp;Validate
          </div>
          <a className="ui basic label value-box status">
            {props.state.status}
          </a>
        </div>
      </section>
      <section>
        <button
          type="button"
          className="ui basic fluid large button solve"
          onClick={handleSolve}
        >
          Solve
        </button>
      </section>
    </div>
  );
}
export default ControlPanel;
