import React from "react";
// import { Gitgraph } from "@gitgraph/react";
import { createGitgraph, Orientation, BranchOptions } from "@gitgraph/js";
import "./App.css";

function App() {
  // Get the graph container HTML element.
  const graphContainer = document.getElementById("root");
  if (graphContainer == null) throw new Error("Graph container is null");
  // Instantiate the graph.
  const gitgraph = createGitgraph(graphContainer, {
    orientation: Orientation.VerticalReverse,
    branchLabelOnEveryCommit: true,
  });

  // Simulate git commands with Gitgraph API.
  const master = gitgraph.branch(GetBranchOptions("master"));
  master.commit("init");

  const develop = gitgraph.branch(GetBranchOptions("lsr"));
  develop.commit("Make first LSR change").commit("Make another LSR change");
  master.commit("Make a BAU change");
  develop.merge(master, "Merge master into lsr");
  develop.commit("Make last LSR Change");

  master.merge(develop);
  return <div></div>;
  //The react version is broken right now
  // return (
  //   <Gitgraph>
  //     {(gitgraph) => {
  //       // Simulate git commands with Gitgraph API.
  //       const master = gitgraph.branch("master");
  //       master.commit("Initial commit");

  //       const develop = gitgraph.branch("develop");
  //       develop.commit("Add TypeScript");

  //       const aFeature = gitgraph.branch("a-feature");
  //       aFeature
  //         .commit("Make it work")
  //         .commit("Make it right")
  //         .commit("Make it fast");

  //       develop.merge(aFeature);
  //       develop.commit("Prepare v1");

  //       master.merge(develop).tag("v1.0.0");
  //     }}
  //   </Gitgraph>
  // );
}

function GetBranchOptions(name: string): BranchOptions {
  return {
    name,
    commitDefaultOptions: {
      style: {
        message: {
          displayAuthor: false,
          displayHash: false,
        },
      },
    },
  };
}

export default App;
