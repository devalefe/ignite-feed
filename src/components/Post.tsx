import { format, formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChangeEvent, FormEvent, useState } from "react";
import { Comment } from "./Comment";
import { Avatar } from "./Avatar";
import styles from "./Post.module.css";

interface PostType {
  id: number;
  author: {
    id: number;
    avatar: string;
    name: string;
    role: string;
  };
  publishedAt: string;
  content: ContentType[];
  commentList: CommentList[]
}

interface CommentList {
  id: number;
  author: {
    avatar: string;
    name: string;
  };
  comment: string;
  applauses: number;
  publishedAt: string;
}

interface ContentType {
  type: string;
  data: any;
}

export function Post({ id, author, publishedAt, content, commentList }:PostType) {
  const { avatar, name, role } = author;

  const [comments, setComments] = useState<CommentList[]>(commentList);

  const [newComment, setNewComment] = useState("");

  const publishedAtToDate = new Date(publishedAt);

  const publishedDateFormatted = format(
    publishedAtToDate,
    "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR }
  );

  const publishedDateRelativeToNow = formatDistance(
    publishedAtToDate,
    new Date(),
    {
      addSuffix: true,
      locale: ptBR,
    }
  );

  function handleNewCommentChange(event:ChangeEvent<HTMLTextAreaElement>) {
    setNewComment(event.target.value);
  }

  function handleCreateNewComment(event:FormEvent) {
    event.preventDefault();
    let date = new Date()
    let comment = {
      id: comments.length + 1,
      author: {
        avatar: "https://github.com/devalefe.png",
        name: "Álefe C Oliveira",
      },
      comment: newComment,
      applauses: 0,
      publishedAt: date.toDateString(),
    };
    setComments([comment, ...comments]);
    setNewComment("");
  }

  function onDeleteComment(commentToDelete:number) {
    const commentsWithoutDeletedOne = comments
    .filter(comment => {
      if (comment.id !== commentToDelete) {
        return comment
      }
    })
    setComments(commentsWithoutDeletedOne)
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={avatar} hasBorder />
          <div className={styles.authorInfo}>
            <strong>{name}</strong>
            <span>{role}</span>
          </div>
        </div>
        <time
          title={publishedDateFormatted}
          dateTime={publishedAtToDate.toISOString()}
        >
          Publicado {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content?.map(({ type, data }:ContentType) => {
          if (type === "link") {
            return (
              <p key={data} className={styles.link}>
                <a href="">{data}</a>
              </p>
            );
          }
          if (type === "hashtag") {
            return (
              <p key={data} className={styles.hashtag}>
                {data?.map((d: string) => (
                  <a key={d} href="">
                    {d}
                  </a>
                ))}
              </p>
            );
          }
          return <p key={data}>{data}</p>;
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          value={newComment}
          onChange={handleNewCommentChange}
          placeholder="Escreva um comentário..."
        />
        <footer>
          <button 
            type="submit"
            disabled={!newComment}
          >
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(({id, author, publishedAt, comment, applauses}) => {
          return (
            <Comment 
              key={id}
              id={id}
              author={author}
              publishedAt={publishedAt}
              comment={comment}
              applauses={applauses}
              onDeleteComment={onDeleteComment}
            />
          )
        })}
      </div>
    </article>
  );
}
