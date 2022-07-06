import { observer } from "mobx-react-lite";
import { useState } from "react";
import store from "../ModelView/store";

export const Board = observer(() => {
    return (
        <div className="board">
            {store.block.getArrTo25.map(num => <Unit key={num} num={num}></Unit>)}
        </div>
    );
});

interface Props {
    num: number;
}

const Unit = observer(({ num }: Props) => {
    const [curNum, setCurNum] = useState<number>(num);
    const [clear, setClear] = useState<boolean>(false);


    const handleClickUnit = () => {
        const response = store.block.changeUnit(curNum);
        if (response !== -1) {
            if (response) {
                setCurNum(response);
            } else {
                setClear(true);
            }
        }
    }

    return (
        <div className="unit-wrapper">
            {!clear ?
                <div className="unit-item" onClick={handleClickUnit} style={{ backgroundColor: curNum > 25 ? '#6A5ACD' : '#7B68EE' }}>
                    {curNum}
                </div> :
                <div className="unit-item">
                    {null}
                </div>}
        </div>
    );
});
