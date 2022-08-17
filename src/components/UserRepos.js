import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import fetchUserRepo from "../features/reducers/fetchUserRepo";
import { changeFilterInput } from "../features/data/usersSlice.js";
import { getFilteredRepos } from "../features/selectors/filterRepos";

const UserRepos = () => {
  const { filterInput, inputValue } = useSelector((state) => state);
  const dispatch = useDispatch();
  const repositories = useSelector((state) =>
    getFilteredRepos(state, filterInput)
  );
  useEffect(() => {
    dispatch(fetchUserRepo(inputValue));
  }, []);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => dispatch(changeFilterInput(e.target.value))}
        defaultValue={filterInput}
      />
      {
        <ul>
          {repositories.map((element) => (
            <li key={element.id}>{element.name}</li>
          ))}
        </ul>
      }
    </div>
  );
};

export default UserRepos;
