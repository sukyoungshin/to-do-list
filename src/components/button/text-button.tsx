import { COLORS } from 'components/@utils/style-util';
import styled from 'styled-components';
import { TextButtonProps } from 'components/@utils/type';

const TextButton = ({ type, buttonType, textMessage, onClick }: TextButtonProps) => {
  let Button;
  if (buttonType === 'edit') {
    Button = EditButton;
  } else if (buttonType === 'deleteAll') {
    Button = DeleteAllButton;
  } else if (buttonType === 'submit') {
    Button = SubmitButton;
  } else {
    Button = DefaultButton;
  }

  return (
    <Button type={type} onClick={onClick}>
      {textMessage}
    </Button>
  );
};

export default TextButton;

const DefaultButton = styled.button`
  height: 32px;
  border: none;
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
  width: 80px;
`;

const DeleteAllButton = styled(DefaultButton)`
  margin-right: auto;
  width: 80px;
`;
