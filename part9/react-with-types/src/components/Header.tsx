interface HeaderProps {
  name: string;
}

export default function Header(props: HeaderProps) {
  return <div>{props.name}</div>;
}
