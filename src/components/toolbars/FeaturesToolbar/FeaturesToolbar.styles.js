import { makeStyles } from "@fluentui/react-components";

export const useStyles = makeStyles({
  toolbarTop: {
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(41, 41, 41, 0.7)",
    left: 0,
    right: 0,
    top: 0,
    position: "fixed",
    zIndex: 1,
  },
  toolbarLeft: {
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(41, 41, 41, 0.7)",
    left: 0,
    top: 0,
    bottom: 0,
    position: "fixed",
    zIndex: 1,
  },
});
