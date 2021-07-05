import { Snackbar } from "@material-ui/core";
import React from "react";
import "./SnackBarComponent.css";

const SnackBarComponent = ({
  vertical = "top",
  horizontal = "center",
  msg,
  showMsg,
  setShowMsg,
  isSuccess,
}) => {
  return (
    <Snackbar
      className={` ${isSuccess ? "snackbar_success" : "snackbar_error"}  `}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
      open={showMsg}
      onClose={(event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setShowMsg({ ...showMsg, showMsg: false });
      }}
      message={msg}

      // message="! کاربری با این مشخصات یافت نشد"
    />
  );
};

export default SnackBarComponent;
