import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Test.css";
const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

const Test = () => {
  const [state, setState] = useState({
    items: Array.from({ length: 20 }),
  });

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      setState({
        items: state.items.concat(Array.from({ length: 20 })),
      });
    }, 1500);
  };
  return (
    <div className="">
      <div className="test  ">
        <InfiniteScroll
          dataLength={state.items.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          height={274}
        >
          {state.items.map((i, index) => (
            <div style={style} key={index}>
              div - #{index}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Test;
