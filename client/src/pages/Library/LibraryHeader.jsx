export const LibraryHeader = () => {
  return (
    <div className="library-page-header">
      <div className="library-user">
        <img
          className="library-user-prof-pic"
          src="https://lh3.googleusercontent.com/a/AAcHTtcr1LBpHf5N5itc--qbSwRpH4yb7kx1ym5osFZjVUIx=s96-c?sz=150"
        />
        <h2>{localStorage.getItem("username")}</h2>
      </div>
      <div className="library-page-tabs">
        <button className="page-tab" style={{ marginLeft: "0" }}>
          Achievements
        </button>
        <button className="page-tab">Study Sets</button>
        <button className="page-tab">Expert Solutions</button>
        <button className="page-tab">Subjects</button>
        <button className="page-tab">classNamees</button>
      </div>
    </div>
  );
};
