import { h } from 'preact';
import Image from '../../components/image';
import Hero from '../Hero';
import './style.scss';

const SinglePage = props => {
  const item = props.data[props.id];
  return (
    <div>
      <Hero
        data={props.heroData}
        bgImage={props.location === 'mentors' ? `${props.id}-color` : props.bgImage}
        removeText
        removeBgOverlay={props.location === 'mentors'}
        mentorName={props.location === 'mentors' && item.name}
      />
      <div className={`block w-100 single-page ${props.location === 'mentors' ? 'my-1' : 'my-5'} mx-auto pb-5`}>
        {props.location !== 'mentors' &&
        <div className="block float-left w-50 pr-3">
          <Image name={item.image} location={props.location} class="mentors-image" />
          <div className="flex flex-ycenter pt-2 felx-start">
            <h5>{item.name} </h5><div> &nbsp; - {item.position}</div>
          </div>
        </div>
        }
        {props.location === 'mentors' && <h5 className="py-2">{item.name} </h5>}
        {item.text}

      </div>
    </div>

  );
};

export default SinglePage;
