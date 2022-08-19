import { Modal, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function ReposTimeline({ modal, setModal }) {
  const { userReposContent, loading } = useSelector((state) => state.userRepos);

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
            {[...userReposContent]
              .sort(
                (a, b) => Date.parse(a.created_at) - Date.parse(b.created_at)
              )
              .map((repo) => {
                return (
                  <Box key={repo.id} className="container">
                    <Box className="content">
                      <Box className="repoName">{repo.name}</Box>
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
