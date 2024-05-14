import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import diaryService from "./services/diaries";
import DiaryLists from "./components/DiaryLists";
import DiaryForm from "./components/DiaryForm";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then((data) => setDiaries(data));
  }, []);

  return (
    <>
      <h1>Diary entries</h1>
      <DiaryForm setDiaries={setDiaries} />
      <DiaryLists diaries={diaries} />
    </>
  );
}

export default App;

