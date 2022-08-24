import { Button } from "@mui/material";
import { Box } from "@mui/system";
import DOMPurify from "dompurify";
import { useDispatch, useSelector } from "react-redux";
import convertCode from "../features/reducers/convertCode";
import { changeTextareaInput } from "../features/data/usersSlice.js";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { useStyles } from "./styles/codePreviewStyles";

function CodePreview() {
  const dispatch = useDispatch();
  const {
    codeConvert: { inputValue, htmlCode },
  } = useSelector((state) => state);
  const textAreaInput = useRef("");
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <>
      <Button
        sx={{ margin: "auto", display: "block", marginTop: "1rem" }}
        variant="outlined"
        onClick={() => {
          localStorage.removeItem("Auth Token");
          navigate("/login");
        }}
      >
        Logout
        <FontAwesomeIcon
          style={{ marginLeft: "0.5rem" }}
          icon={faRightFromBracket}
        />
      </Button>
      <Box className={classes.previewContainer}>
        <textarea
          defaultValue={inputValue}
          ref={textAreaInput}
          className="codeContainer"
        ></textarea>
        <Box
          className={classes.htmlContainer}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlCode) }}
        />
      </Box>
      <Box className={classes.btnsContainer}>
        <Button
          variant={"outlined"}
          onClick={() => {
            dispatch(changeTextareaInput(textAreaInput.current.value));
            dispatch(convertCode(textAreaInput.current.value));
          }}
        >
          Convert Code
        </Button>
        <Button
          variant={"outlined"}
          onClick={() => {
            navigator.clipboard.writeText(htmlCode);
          }}
        >
          Copy HTML
        </Button>
      </Box>
    </>
  );
}

export default CodePreview;
