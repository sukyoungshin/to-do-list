import { AiOutlineClose, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { COLORS } from 'components/@utils/style-util';
import styled from 'styled-components';
import { IconName, SvgIconButtonProps } from 'components/@utils/type';

const unhandledIconType = (type: never): never => {
  throw new Error('Unknown iconType: ', type);
};

const getButton = (iconName: IconName) => {
  let Button = DefaultButton;
  if (iconName === 'close') {
    Button = CloseButton;
  }

  return Button;
};

const getSvgIcon = (iconName: IconName) => {
  switch (iconName) {
    case 'edit':
      return AiOutlineEdit;
    case 'delete':
      return AiOutlineDelete;
    case 'close':
      return AiOutlineClose;
    default:
      unhandledIconType(iconName);
      return false;
  }
};

const SvgIconButton = ({ type, size = 'full', id, iconName, onClick }: SvgIconButtonProps) => {
  const Button = getButton(iconName);
  const SvgIcon = getSvgIcon(iconName);

  return (
    <Button size={size} type={type} id={id} onClick={onClick}>
      {SvgIcon && <SvgIcon />}
    </Button>
  );
};

export default SvgIconButton;

const DefaultButton = styled.button<{
  size: SvgIconButtonProps['size'];
}>`
  ${({ size }) =>
    size === 'half' &&
    `
    width: 50%;
    background-color: ${COLORS.dimBackground};
    border-radius: 0;
  `};

  height: 32px;
  border-radius: ${({ size }) => (size === 'half' ? 0 : 4)}px;

  & > svg {
    pointer-events: none;
  }

  &:hover {
    background-color: ${COLORS.hoverBackground};
  }
`;

const CloseButton = styled(DefaultButton)`
  display: block;
  margin-left: auto;
  margin-bottom: 16px;
`;
