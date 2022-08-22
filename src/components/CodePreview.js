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
          minHeight: "70vh",
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
          sx={{ width: "50%" }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlCode) }}
        />
      </Box>
      <Button
        sx={{ marginTop: "2rem" }}
        variant={"outlined"}
        onClick={() => {
          dispatch(convertCode(inputValue));
        }}
      >
        Convert
      </Button>
    </>
  );
}

export default CodePreview;
