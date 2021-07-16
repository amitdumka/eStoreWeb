import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import WarningIcon from "@material-ui/icons/Warning";
import {
  Snackbar,
  SnackbarContent,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
// eslint-disable-next-line no-restricted-imports
import { colors } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { SnackbarProvider, useSnackbar } from "notistack";

//const Modes=["success", "warning", "error", "info", ""];
const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles((theme) => ({
  success: {
    backgroundColor: colors.green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: colors.amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired,
};

const useStyles2 = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function InformSnackbars({ message, mode }) {
  const classes = useStyles2();
  const [open, setOpen] = React.useState(true);

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }
  return (
    <div>
      {message && (
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <MySnackbarContentWrapper
            onClose={handleClose}
            variant={mode}
            message={message}
          />
        </Snackbar>
      )}
    </div>
  );
}

export function ESMessage({message,mode}) {
  const { enqueueSnackbar } = useSnackbar();

  // const handleClick = () => {
  //   enqueueSnackbar(message);
  // };

 // const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar({message}, { mode });
 // };

  // return (
  //   <React.Fragment>
  //     <Button onClick={handleClick}>Show snackbar</Button>
  //     <Button onClick={handleClickVariant("success")}>
  //       Show success snackbar
  //     </Button>
  //   </React.Fragment>
  // );
}
