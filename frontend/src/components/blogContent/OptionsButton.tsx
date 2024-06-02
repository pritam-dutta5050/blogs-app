import { Dropdown, DropdownButton } from "react-bootstrap";

interface OptionButtonProps {
  btnArr: boolean[];
  onEditButtonClicked: () => void;
  onDeleteButtonClicked: () => void;
}
const OptionsButton = ({ btnArr, onEditButtonClicked, onDeleteButtonClicked }: OptionButtonProps) => {
  return (
    <DropdownButton id="dropdown-basic-button" title="" variant="outline-primary">
        {btnArr[0] && <Dropdown.Item onClick={onEditButtonClicked}>Edit</Dropdown.Item>}
        {btnArr[1] && <Dropdown.Item onClick={onDeleteButtonClicked}>Delete</Dropdown.Item>}
    </DropdownButton>
  );
};

export default OptionsButton;
