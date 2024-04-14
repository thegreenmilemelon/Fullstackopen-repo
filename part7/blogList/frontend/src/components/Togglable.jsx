import PropTypes from "prop-types";
import { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Box } from "@mui/material";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <Box>
      {!visible && (
        <Button variant="contained" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      )}
      {visible && (
        <Box>
          {props.children}
          <Button
            variant="contained"
            color="secondary"
            onClick={toggleVisibility}
          >
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
