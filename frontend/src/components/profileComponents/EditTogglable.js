import { Button, Accordion, useAccordionButton, Card } from "react-bootstrap";

const EditTogglable = (props) => {
  const AccordionButton = ({ eventKey }) => {
    const handleClick = useAccordionButton(eventKey);

    return (
      <Button
        variant="outline-dark"
        className="text-nowrap"
        onClick={handleClick}
      >
        {props.buttonText}
      </Button>
    );
  };

  return (
    <Accordion>
      <Card className="border-0">
        <div className="w-25">
          <AccordionButton eventKey="0" />
        </div>
        <Accordion.Collapse eventKey="0">
          <Card.Body className="p-0 pt-4">{props.children}</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default EditTogglable;
