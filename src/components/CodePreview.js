import { Button } from "@mui/material";
import { Box } from "@mui/system";
import DOMPurify from "dompurify";
import { useDispatch, useSelector } from "react-redux";
import convertCode from "../features/reducers/convertCode";
import { changeTextareaInput } from "../features/data/usersSlice.js";

function CodePreview() {
  const dispatch = useDispatch();
  const {
    codeConvert: { inputValue, htmlCode },
  } = useSelector((state) => state);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: "600px",
          display: "flex",
        }}
      >
        <textarea
          defaultValue={inputValue}
          onChange={(e) => {
            dispatch(changeTextareaInput(e.target.value));
          }}
          className="codeContainer"
        ></textarea>
        <Box
          sx={{
            width: "50%",
            fontFamily: "Open Sans",
            padding: "10px",
            border: "1px solid black",
            height: "600px",
            overflowY: "scroll",
            paddingLeft: "2rem",
          }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlCode) }}
        />
      </Box>
      <Box sx={{ marginTop: "2rem", textAlign: "center" }}>
        <Button
          variant={"outlined"}
          onClick={() => {
            dispatch(convertCode(inputValue));
          }}
        >
          Convert Code
        </Button>
        <Button
          variant={"outlined"}
          sx={{ marginLeft: "2rem" }}
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
