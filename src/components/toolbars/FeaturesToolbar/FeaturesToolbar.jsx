import { Toolbar, ToolbarButton, Tooltip } from "@fluentui/react-components";
import { CircleShadowRegular } from "@fluentui/react-icons";
import { useStyles } from "./FeaturesToolbar.styles";

export const FeaturesToolbar = ({ orientation }) => {
  const classes = useStyles();

  return (
    <Toolbar
      aria-label="Large"
      size="large"
      className={
        orientation.type === "landscape-primary"
          ? classes.toolbarLeft
          : classes.toolbarTop
      }
      vertical={orientation.type === "landscape-primary"}
    >
      <Tooltip content="Remove shadow" relationship="label">
        <ToolbarButton
          aria-label="Remove shadow"
          icon={<CircleShadowRegular />}
        />
      </Tooltip>
    </Toolbar>
  );
};
