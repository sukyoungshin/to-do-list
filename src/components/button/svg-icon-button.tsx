import { AiOutlineClose, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { COLORS } from 'style-util';
import styled from 'styled-components';

type Props = {
  type: 'button';
  size: 'half' | 'full';
  id?: string;
  iconName: 'edit' | 'delete' | 'close';
  onClick?: (e: any) => void;
};

const SvgIconButton = ({ type, size = 'full', id, iconName, onClick }: Props) => {
  let Button: any;
  if (size === 'half') {
    Button = HalfButton;
  } else if (size === 'full') {
    Button = DefaultButton;
  }

  let SvgIcon: any;
  if (iconName === 'edit') {
    SvgIcon = AiOutlineEdit;
  } else if (iconName === 'delete') {
    SvgIcon = AiOutlineDelete;
  } else if (iconName === 'close') {
    Button = CloseButton; // FIXME
    SvgIcon = AiOutlineClose;
  }

  return (
    <Button type={type} id={id} onClick={onClick}>
      <SvgIcon />
    </Button>
  );
};

export default SvgIconButton;

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

const HalfButton = styled(DefaultButton)`
  width: 50%;
  background-color: ${COLORS.dimBackground};
  border-radius: 0;
`;

const CloseButton = styled(DefaultButton)`
  display: block;
  margin-left: auto;
  margin-bottom: 16px;
`;