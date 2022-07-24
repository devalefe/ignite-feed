import { format, formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { HandsClapping, Trash } from "phosphor-react";
import { useState } from "react";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";

interface CommentType { 
  id: number;
  author: {
    id?: number;
    avatar: string;
    name: string;
  }
  publishedAt: string;
  comment: string;
  applauses: number;
  onDeleteComment: (commentToDelete: number) => void
}

export function Comment({ id, author, publishedAt, comment, applauses, onDeleteComment }: CommentType) {
  const [applauseCount, setApplauseCount] = useState(applauses);

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

  function handleDeleteComment() {
    onDeleteComment(id);
  }

  function handleAddApplause() {
    setApplauseCount(applauseCount + 1);
  }

  return (
    <div className={styles.comment}>
      <Avatar src={author.avatar} />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorInfo}>
              <strong>{author.name}</strong>
              <time
                title={publishedDateFormatted}
                dateTime={publishedAtToDate.toISOString()}
              >
                {publishedDateRelativeToNow}
              </time>
            </div>

            <button 
              onClick={handleDeleteComment} 
              title="Excluir comentário"
            >
              <Trash size={20} />
            </button>
          </header>
          <span>{comment}</span>
        </div>
        <footer>
          <button
            onClick={handleAddApplause}
            title="Aplaudir comentário"
            className={styles.applause}
          >
            <HandsClapping size={20} />
            Aplaudir
            <span>{applauseCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
