import Header from "./View/Header";
import { Board } from "./View/Board";
import './style.css';
import store from "./ModelView/store";
import Result from "./View/Result";
import { observer } from "mobx-react-lite";
import Rank from "./View/Rank";
import { useEffect } from "react";

const App = observer(() => {
  useEffect(()=>{
    store.record.getAllRecords();
  },[]);
  switch (store.ui.getCurView) {
    case 'Rank':
      return (
        <Rank></Rank>
      );
    case 'Result':
      return (
        <Result></Result>
      );
    case 'Home':
      return (
        <div>
          <Header></Header>
          <Board></Board>
        </div>
      );


  }
});

export default App;
