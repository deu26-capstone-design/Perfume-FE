import type { Accord } from '@entities/accords/model/accordsType';
import './AccordsAbout.css';

type AccordsAboutProps = Pick<Accord, 'name' | 'description' | 'imageUrl'>;

const AccordsAbout = ({ name, description, imageUrl }: AccordsAboutProps) => {
  return (
    <section className="accords-about">
      <div className="image-wrapper">
        {imageUrl && <img src={imageUrl} alt={name} className="image" />}
        <div className="title-bar--mobile">{name}</div>
      </div>

      <div className="text-container">
        <h2 className="title">{name}</h2>
        <p className="content">{description}</p>
      </div>
    </section>
  );
};

export default AccordsAbout;
