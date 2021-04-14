import "./UserInterests.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useContext, useEffect, useState } from "react";
import axios from "./axios/axios";
import authContext from "./auth/authContext";
import { useHistory } from "react-router";

const UserInterests = () => {
  const {
    getTags,
    tags,
    tagsUrls,
    saveChosenTags,
    isUserChooseTags,
    user,
  } = useContext(authContext);
  const [chosenTagsList, setChosenTagsList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();
  const [next, setNext] = useState({
    next: "",
    listResults: null,
    hasMore: false,
    page: 2,
  });
  useEffect(() => {
    if (isUserChooseTags || user === null) {
      history.push("/");
    }
    if (tags === null) {
      getTags();
    }
    setNext({
      ...next,
      listResults: tags,
      next: tagsUrls.next,
      hasMore: tagsUrls.next ? true : false,
    });
    // eslint-disable-next-line
  }, [tags, isUserChooseTags, user]);
  const infiniteList = async () => {
    try {
      const res = await axios.simpleApi.get(`/tags/?page=${next.page}`);
      setNext({
        next: res.data.next,
        hasMore: res.data.next ? true : false,
        listResults: next.listResults.concat(res.data.results),
        page: ++next.page,
      });
      // console.log(next.page);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (id) => {
    if (chosenTagsList?.includes(id)) {
      setChosenTagsList(chosenTagsList.filter((idItem) => idItem !== id));
    } else {
      setChosenTagsList(chosenTagsList.concat(id));
    }
    // console.log(chosenTagsList);
  };

  const sendTags = () => {
    if (chosenTagsList.length === 0) {
      showErrorMsg();
    } else {
      let sendListTags = [];
      chosenTagsList.forEach((item) =>
        sendListTags.push({
          tag: item,
        })
      );
      saveChosenTags(sendListTags);
    }
    // console.log(sendListTags);
  };

  const showErrorMsg = () => {
    setErrorMsg(" لطفا یک یا چند موضوع را انتخاب کنید");
    setTimeout(() => {
      setErrorMsg("");
    }, 7000);
  };
  return (
    <div className="userInterests">
      <div className="userInterests__top">
        <div className="userInterests__info">
          <span className="userInterests__info__title">
            .لطفا یک یا چند موضوع که به آن‌ها علاقه دارید را انتخاب کنید تا وارد
            سایت شوید
          </span>
          <span className="userInterests__info__desc">
            به کمک این اطلاعات، پست‌هایی که بیشتر دوست دارید به شما پیشنهاد داده
            می‌شود
          </span>
        </div>
      </div>
      <div className="userInterests__bottom">
        <div className="userInterests__list ">
          {next?.listResults && (
            <InfiniteScroll
              dataLength={next?.listResults?.length}
              // dataLength={10}
              next={() => infiniteList()}
              hasMore={next.hasMore}
            >
              {next.listResults &&
                next.listResults?.map((item, i) => {
                  return (
                    <div
                      onClick={() => handleClick(item.id)}
                      key={item.id}
                      className={`   
                      ${
                        chosenTagsList?.includes(item.id)
                          ? "userInterests__option__selected"
                          : "userInterests__option"
                      }
                      `}
                    >
                      <span>{item.name}</span>
                    </div>
                  );
                })}
            </InfiniteScroll>
          )}
        </div>
        <div className="userInterests__errorMsg">{errorMsg}</div>
        <div className="userInterests__saveChosenTags">
          <span onClick={sendTags} className="saveChosenTags__btn">
            ثبت
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserInterests;
