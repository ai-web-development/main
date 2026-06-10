import { useEffect } from 'react';
import styles from './StarExplain.module.css';
import StarCard from '../../components/starCard/StarCard';
import starDescriptions from '../../data/starDescriptions.json';

const StarExplain = () => {
  useEffect(() => {
    document.title = 'another-star-explain';
  }, []);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>별에 대해</h1>
      <p className={styles.desc}>각각의 별이 어떤 답변을 드리는지 소개합니다.</p>
      <hr className={styles.divider} />
      <div className={styles.cardList}>
        {starDescriptions.map((star) => (
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
};

export default StarExplain;
