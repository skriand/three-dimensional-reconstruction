import {
  Button,
  CompoundButton,
  Toolbar,
  Tooltip,
} from "@fluentui/react-components";
import { CameraRegular, CameraSwitchRegular } from "@fluentui/react-icons";
import { useStyles } from "./CaptureToolbar.styles";
import { useOrientation } from "@uidotdev/usehooks";

export const CaptureToolbar = ({ capture, handleClick }) => {
  const classes = useStyles();
  const orientation = useOrientation();

  return (
    <Toolbar
      aria-label="Large"
      size="large"
      vertical={orientation.type === "landscape-primary"}
    >
      <Tooltip content="Capture" relationship="label">
        <CompoundButton
          onClick={capture}
          icon={<CameraRegular />}
          appearance="primary"
          shape="circular"
          size="large"
          className={
            orientation.type === "landscape-primary"
              ? classes.camButtonLandscape
              : classes.camButtonPortrait
          }
        />
      </Tooltip>
      <Button
        size="large"
        appearance="transparent"
        aria-label="Switch camera"
        icon={<CameraSwitchRegular />}
        onClick={handleClick}
      />
    </Toolbar>
  );
};
