import "./global.css";

import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Post } from "./components/Post";
import styles from "./App.module.css";

import data from "./assets/fakeAPI.json";

export function App() {
  const { userData, posts } = data;

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar
          id={userData.id}
          background={userData.background}
          avatar={userData.avatar}
          name={userData.name}
          role={userData.role}
        />
        <main>
          {posts?.map(({ id, author, publishedAt, content, commentList }) => {
            return (
              <Post
                key={id}
                id={id}
                author={author}
                publishedAt={publishedAt}
                content={content}
                commentList={commentList}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}
