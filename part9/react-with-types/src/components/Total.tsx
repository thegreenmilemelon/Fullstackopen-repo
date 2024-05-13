interface totalProps {
  total: number;
}

export default function Total(props: totalProps) {
  return <p>Number of exercises {props.total}</p>;
}
