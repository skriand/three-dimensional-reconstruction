import { makeStyles } from "@fluentui/react-components";

export const useStyles = makeStyles({
  root: {
    minHeight: "100dvh",
    minWidth: "100dvw",
    display: "flex",
    justifyContent: "center",
  },
  toolbarBottom: {
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(41, 41, 41, 0.7)",
    left: 0,
    right: 0,
    bottom: 0,
    position: "fixed",
    zIndex: 1,
  },
  toolbarRight: {
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(41, 41, 41, 0.7)",
    right: 0,
    top: 0,
    bottom: 0,
    position: "fixed",
    zIndex: 1,
    flexDirection: "row",
    display: "flex",
  },
  webCamPortrait: {
    width: "100%",
  },
  webCamLandscape: {
    height: "100dvh",
  },
  toolbar: {
    justifyContent: "space-between",
  },
  tablist: {
    justifyContent: "center",
  },
  toast: {
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(41, 41, 41, 0.7)",
  },
  badgeDiv: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: "-10px",
    right: "-10px",
  },
  imageButton: {
    padding: 0,
    height: "40px",
    width: "40px",
    minWidth: "40px",
  },
});
