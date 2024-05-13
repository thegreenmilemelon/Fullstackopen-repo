interface ContentProps {
  parts: {
    name: string;
    exerciseCount: number;
  }[];
}

export default function Content(props: ContentProps) {
  return (
    <div>
      {props.parts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
}
