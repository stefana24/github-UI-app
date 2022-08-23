import { Modal, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import fetchRepoFiles from "../features/reducers/fetchRepoFiles";
import { useNavigate, useParams } from "react-router";

function ReposTimeline({ modal, setModal }) {
  const { userRepos } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useParams();

  return (
    <Modal
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={modal}
      onClose={() => setModal(false)}
    >
      <Box sx={{ position: "relative" }}>
        <Box className="hideScrollbar">
          <FontAwesomeIcon
            onClick={() => setModal(false)}
            className="closeBtn"
            icon={faCircleXmark}
          />
          <Box className="timeline">
            {[...userRepos]
              .sort(
                (a, b) => Date.parse(a.created_at) - Date.parse(b.created_at)
              )
              .map((repo) => {
                return (
                  <Box key={repo.id} className="container">
                    <Box className="content">
                      <Box
                        onClick={() => {
                          dispatch(
                            fetchRepoFiles({
                              inputValue: user.login,
                              repoName: repo.name,
                            })
                          );
                          navigate(`/repoFiles?name=${repo.name}`);
                        }}
                        className="repoName"
                      >
                        {repo.name}
                      </Box>
                      <Box className="year">
                        {new Date(repo.created_at).toLocaleString([], {
                          month: "numeric",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </Box>
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default ReposTimeline;
