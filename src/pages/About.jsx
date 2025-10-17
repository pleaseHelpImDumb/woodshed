function About() {
  const test = {
    padding: "3px",
    borderStyle: "none",
    textDecoration: "underline",
  };
  return (
    <>
      <h2>About</h2>
      <p className="general-msg">
        Woodshed is practice tracking application for musicians to manage their
        repertoire and track progress on songs. You can add songs to the library
        as you practice them, adding notes and updating your progress until you
        master it. Once mastered, songs can be noved to the 'Compeleted' page
        where you can see the date you mastered it, as well as a video if
        provided.
        <br />
        <br />
        This project was built as a final project for Code the Dream's React
        course.
      </p>
      <hr />
      <span className="general-msg">See the project on </span>
      <a
        style={test}
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.github.com/pleaseHelpImDumb/woodshed"
      >
        GitHub
      </a>
    </>
  );
}
export default About;
