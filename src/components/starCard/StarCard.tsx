import styles from './StarCard.module.css';

interface StarCardProps {
  emoji: string;
  name: string;
  description: string;
}

const StarCard = ({ emoji, name, description }: StarCardProps) => (
  <div className={styles.card}>
    <span className={styles.emoji}>{emoji}</span>
    <h2 className={styles.name}>{name}</h2>
    <hr className={styles.divider} />
    <p className={styles.description}>{description}</p>
  </div>
);

export default StarCard;
