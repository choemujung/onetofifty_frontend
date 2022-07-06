import axios from "axios";
import { makeAutoObservable } from "mobx";

class Root {
    timer;
    block;
    record;
    ui;
    root: any;

    constructor() {
        this.timer = new Timer(this);
        this.block = new Block(this);
        this.record = new Record(this);
        this.ui = new UI(this);
    }
}

class Timer {
    private root: Root;
    private startMilli?: number;
    private intervalId?: NodeJS.Timer;
    private score: number = 0;

    constructor(root: Root) {
        makeAutoObservable(this);
        this.root = root;
    }

    start = () => {
        this.startMilli = new Date().getTime();
        this.intervalId = setInterval(this.setScore, 1);
    };

    stop = () => {
        this.intervalId && clearInterval(this.intervalId);
    };

    setScore = () => {
        this.startMilli && (this.score = new Date().getTime() - this.startMilli);
    };

    get Score() {
        return this.score;
    }
}

class Block {
    // observable
    // private arrTo25: number[] = Array.from({ length: 25 }, (v, i) => i + 1).sort(() => Math.random() - 0.5);
    // private arrTo50: number[] = Array.from({ length: 25 }, (v, i) => i + 26).sort(() => Math.random() - 0.5);
    private arrTo25: number[] = Array.from({ length: 5 }, (v, i) => i + 1);
    private arrTo50: number[] = Array.from({ length: 5 }, (v, i) => i + 6);
    private targetNumber: number = 1;
    private isEnd = false;
    root: Root;

    constructor(root: Root) {
        makeAutoObservable(this);
        this.root = root;
    }

    // computed
    get getIsEnd() {
        return this.isEnd;
    }

    get getArrTo25() {
        return this.arrTo25;
    }

    get getArrTo50() {
        return this.arrTo50;
    }

    get targetLabel() {
        return `target: ${this.targetNumber}`;
    }

    // action
    gameEnd = () => {
        this.root.ui.moveToResult();
    };

    changeUnit = (num: number) => {
        if (num === this.targetNumber) {
            if (num === 1) {
                this.root.timer.start();
            }
            if (num === this.arrTo25.length * 2) {
                this.root.timer.stop();
                this.gameEnd();
            } else {
                this.targetNumber += 1;
            }
            return this.arrTo50.pop(); //<div>{number}</div> - 25이하 눌렀을때 숫자 바꾸기 숫자 or undefined

        } else {
            return -1; //예외 - 타겟 안눌렀을때 동작 x
        }
    };
}

export interface IRecord {
    id?: number;
    name: string;
    score: number;
}

class Record {
    private records: IRecord[] = [];
    root: Root;

    constructor(root: Root) {
        makeAutoObservable(this);
        this.root = root;
    }

    get Rank() {
        return this.records.slice().sort((a, b) => a.score - b.score);
    }

    async getAllRecords() {
        try {
            this.records = (await axios.get('/Record/getAllRecords')).data;
            console.log(this.records);
        }
        catch (error) {
            alert(error);
        }
    }

    postRecord(record: IRecord) {
        console.log(`${record.name}, ${record.score}`);
        axios.post('/Record/PostRecord',
            {
                name: record.name,
                score: record.score
            }
        )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

type View = 'Home' | 'Result'|'Rank';

class UI {
    curView: View;
    root: Root;

    constructor(root: Root) {
        makeAutoObservable(this);
        this.root = root;
        this.curView = 'Home';
    }

    get getCurView() {
        return this.curView;
    }

    moveToResult() {
        this.curView = 'Result';
    }

    moveToRank() {
        this.curView = 'Rank';
    }
}
const store = new Root();
export default store;

