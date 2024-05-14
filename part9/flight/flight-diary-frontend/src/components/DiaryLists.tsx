import { DiaryEntry } from "../types";

const DiaryLists = ({ diaries }: { diaries: DiaryEntry[] }) => {
  return (
    <div>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>{diary.weather}</p>
          <p>{diary.visibility}</p>
        </div>
      ))}
    </div>
  );
};

export default DiaryLists;
