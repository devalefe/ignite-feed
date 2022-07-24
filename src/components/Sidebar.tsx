import { PencilSimpleLine } from 'phosphor-react';
import { Avatar } from './Avatar';
import styles from './Sidebar.module.css';

interface UserDataType {
    id: number;
    background: string;
    avatar: string;
    name: string;
    role: string;
}

export function Sidebar({id, background, avatar, name, role}: UserDataType) {
    return (
        <aside className={styles.sidebar}>
            <img 
                className={styles.cover}
                src={background}
            />

            <div className={styles.profile}>
                <Avatar src={avatar} hasBorder />
                <strong>{name}</strong>
                <span>{role}</span>
            </div>

            <div className={styles.footer}>
                <a href="#">
                    <PencilSimpleLine size={20} />
                    Editar Perfil
                </a>
            </div>
        </aside>
    )
}
