import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRepo } from "../features/reducers/fetchUserRepo";
import { createSelector } from "@reduxjs/toolkit";

const getFilteredRepos = createSelector(
  (state) => state.repos,
  (state, input) => input,
  (repos, input) => {
    return repos.filter((item) => item.name.includes(input));
  }
);

function FilterUsers() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const repositories = useSelector((state) => getFilteredRepos(state, input));

  useEffect(() => {
    dispatch(fetchUserRepo());
  }, []);

  function changeInput(e) {
    setInput(e.target.value);
  }
  return (
    <div>
      <input
        type="text"
        defaultValue={input}
        onChange={(e) => changeInput(e)}
      />
      {repositories.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

export default FilterUsers;
