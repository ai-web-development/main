import styles from './StarExplain.module.css';
import StarCard from '../../components/starCard/StarCard';
import starDescriptions from '../../data/starDescriptions.json';

const StarExplain = () => (
  <div className={styles.page}>
    <h1 className={styles.title}>별에 대해</h1>
    <p className={styles.desc}>각각의 별이 어떤 답변을 드리는지 소개합니다.</p>
    <hr className={styles.divider} />
    <div className={styles.cardList}>
      {starDescriptions.map((star) => ( // Array.map() 메서드를 사용하여 starDescriptions 배열의 각 요소에 대해 StarCard 컴포넌트를 렌더링합니다. (컴포넌트 재사용)
        <StarCard
          key={star.id}
          emoji={star.emoji}
          name={star.name}
          description={star.description}
        />
      ))}
    </div>
  </div>
);

export default StarExplain;
