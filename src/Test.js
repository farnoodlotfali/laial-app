import './Test.css';
import logo from './assets/0.jpg';
const Test = (props) => {
  return (
    <div className='test'>
      <div className='cardfa'>
        <div className='circle'>
          <div className='content'>
            <h2>Franood lotfali</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Repellendus voluptatum dolorebus animi explicabo ullam est
              expedita dolore? Praesentium excepturi delectus illo culpa.
            </p>
            <a href='https://github.com/farnoodlotfali/laial-app'>see now</a>
          </div>
          <img src={logo} alt='' />
        </div>
      </div>
    </div>
  );
};

export default Test;
