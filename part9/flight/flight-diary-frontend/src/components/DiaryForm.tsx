import { useState, SyntheticEvent } from "react";
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from "../types";
import diaryService from "../services/diaries";
import axios from "axios";
import { apiBaseUrl } from "../constants";

interface Props {
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}

const DiaryForm = ({ setDiaries }: Props) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather>(Weather.Cloudy);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [comment, setComment] = useState("");

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(date, weather, visibility, comment);

    const newDiaryEntry: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    diaryService.create(newDiaryEntry).then(() => {
      axios.get<DiaryEntry[]>(`${apiBaseUrl}/diaries`).then((response) => {
        setDiaries(response.data);
      });
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add new entry</h2>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          <label htmlFor="weather">
            <strong>Weather</strong>
          </label>
          <div>
            {Object.values(Weather).map((w) => (
              <label key={w}>
                <input
                  type="radio"
                  id={w}
                  name="weather"
                  value={w}
                  onChange={({ target }) => setWeather(target.value as Weather)}
                />
                {w}
              </label>
            ))}
          </div>
        </div>

        <br />
        <div>
          <label htmlFor="visibility">
            <strong>Visibility</strong>
          </label>
          <div>
            <label>
              {Object.values(Visibility).map((v) => (
                <span key={v}>
                  <input
                    type="radio"
                    id={v}
                    name="visibility"
                    value={v}
                    onChange={({ target }) =>
                      setVisibility(target.value as Visibility)
                    }
                  />
                  {v}
                </span>
              ))}
            </label>
          </div>
        </div>
        <br />
        <div>
          <label htmlFor="comment">
            <strong>Comment</strong>
          </label>
          <br />
          <textarea
            id="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
