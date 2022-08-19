import { Tooltip, OverlayTrigger } from "react-bootstrap";

const OverlayToolTip = (props) => {
  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 150, hide: 250 }}
      overlay={
        <Tooltip id="button-tooltip">
          <strong>{props.toolTipText}</strong>
        </Tooltip>
      }
    >
      {props.children}
    </OverlayTrigger>
  );
};

export default OverlayToolTip;
