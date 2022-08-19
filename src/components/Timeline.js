import { Modal, Typography, Box } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function ReposTimeline({ modal, setModal }) {
  const { userRepos } = useSelector((state) => state);
  console.log(userRepos);
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
