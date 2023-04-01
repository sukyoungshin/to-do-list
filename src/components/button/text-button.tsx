import { COLORS } from 'components/@utils/style-util';
import styled from 'styled-components';
import { ButtonType, TextButtonProps } from 'components/@utils/type';

const unhandledButtonType = (type: never): never => {
  throw new Error('Unknown buttonType: ', type);
};

const getButton = (buttonType: ButtonType) => {
  switch (buttonType) {
    case 'edit':
      return EditButton;
    case 'deleteAll':
      return DeleteAllButton;
    case 'submit':
      return SubmitButton;
    default:
      unhandledButtonType(buttonType);
      return DefaultButton;
  }
};

const TextButton = ({ type, buttonType, textMessage, onClick }: TextButtonProps) => {
  const Button = getButton(buttonType);

  return (
    <Button type={type} onClick={onClick}>
      {textMessage}
    </Button>
  );
};

export default TextButton;

const ButtonWidth = '80px';
const DefaultButton = styled.button`
  height: 32px;
  border-radius: 4px;

  & > svg {
    pointer-events: none;
  }

  &:hover {
    background-color: ${COLORS.hoverBackground};
  }
`;

const EditButton = styled(DefaultButton)`
  width: 100%;
`;

const SubmitButton = styled(DefaultButton)`
  width: ${ButtonWidth};
`;

const DeleteAllButton = styled(DefaultButton)`
  margin-right: auto;
  width: ${ButtonWidth};
`;
