import React from "react";

const Content = ({ jokeType, jokeSetup, jokePunchline }) => {
  return (
    <div>
      {jokeType && (
        <div className="row my-5">
          <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                joke about {jokeType}
              </div>
              <div className="card-body bg-warning">
                <h3>{jokeSetup}</h3>
                <h4 className="text-danger">{jokePunchline}</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
