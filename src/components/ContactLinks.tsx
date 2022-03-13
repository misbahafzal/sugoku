import { FaGithub, FaCopyright } from "react-icons/fa";

function ContactLinks() {
  return (
    <div className="contact-links">
      <a href="http://bertoort.com">
        <FaCopyright />
        &nbsp; bertoort
      </a>
      <a
        className="right-float github-icon"
        href="https://github.com/bertoort/sugoku"
      >
        Sudoku Api Docs &nbsp;
        <FaGithub />
      </a>
    </div>
  );
}
export default ContactLinks;
