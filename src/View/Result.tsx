import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import store from "../ModelView/store";

const Result = observer(() => {
    const [name, setName] = useState<string>('');

    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setName(value);
    }

    const onClick = () => {
        store.record.postRecord({name: name, score:store.timer.Score});
        store.record.getAllRecords();
        store.ui.moveToRank();
        // window.location.reload();
    }
    return (
        <div className="result-container">
            <div>score : <span className="result-score">{store.timer.Score/1000}</span> sec</div>
            <div><input type="text" placeholder="이름" onChange={onChange} value={name}/><button onClick={onClick}>등록</button></div>
            <button className="result-restart" onClick={()=>window.location.reload()}>Restart</button>
        </div>
    );
});

export default Result;