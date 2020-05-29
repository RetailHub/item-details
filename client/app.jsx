import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Producer from './components/Producer';
import ItemName from './components/ItemName';
import NumberOfRatings from './components/NumberOfRatings';
import Price from './components/Price';
import ItemDetails from './components/ItemDetails';
import PurchaseColumn from './components/PurchaseColumn';
import style from './css/app.css';

const handleStarsMouseEnter = () => {
  setTimeout(() => {
    document.getElementById('Star-Modal').style.display = 'block';
  }, 250);
};

const handleStarsMouseLeave = () => {
  setTimeout(() => {
    document.getElementById('Star-Modal').style.display = 'none';
  }, 250000);
};

const handleStarModalMouseEnter = () => {
  setTimeout(() => {
    document.getElementById('Star-Modal').style.display = 'block';
  }, 25);
};

const handleStarModalMouseLeave = () => {
  setTimeout(() => {
    document.getElementById('Star-Modal').style.display = 'none';
  }, 200);
};

const id = window.location.search.substring(2);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        id: 0,
        productName: '',
        producer: '',
        answeredQuestions: '',
        numberOfRatings: '',
        starPercentages: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        price: 0,
        inStock: true,
        productInfo: ['', '', '', '', ''],
      },
      starRating: 5,
    };

    this.getData = this.getData.bind(this);
    this.getStarPosition = this.getStarPosition.bind(this);
    this.getStarRating = this.getStarRating.bind(this);
  }

  componentDidMount() {
    this.getData(id);
  }

  getData(itemId) {
    $.ajax({
      url: `/items/${itemId}`,
      type: 'GET',
      success: (data) => {
        this.setState({
          data,
        });
        this.getStarPosition();
        this.getStarRating();
      },
    });
  }

  getStarPosition() {
    let position;
    const { data } = this.state;
    const starRating = (data.starPercentages.one
      + 2 * data.starPercentages.two
      + 3 * data.starPercentages.three
      + 4 * data.starPercentages.four
      + 5 * data.starPercentages.five)
      / data.numberOfRatings;
    if (starRating < 0.25) {
      position = 85;
    } else if (starRating >= 0.25 && starRating < 0.75) {
      position = 238;
    } else if (starRating >= 0.75 && starRating < 1.25) {
      position = 68;
    } else if (starRating >= 1.25 && starRating < 1.75) {
      position = 222;
    } else if (starRating >= 1.75 && starRating < 2.25) {
      position = 53;
    } else if (starRating >= 2.25 && starRating < 2.75) {
      position = 206;
    } else if (starRating >= 2.75 && starRating < 3.25) {
      position = 36;
    } else if (starRating >= 3.25 && starRating < 3.75) {
      position = 190;
    } else if (starRating >= 3.75 && starRating < 4.25) {
      position = 20;
    } else if (starRating >= 4.25 && starRating < 4.75) {
      position = 174;
    } else if (starRating >= 4.75 && starRating <= 5) {
      position = 4;
    }
    this.setState({
      position,
    });
  }

  getStarRating() {
    const { data } = this.state;
    let starRating = (data.starPercentages.one
      + 2 * data.starPercentages.two
      + 3 * data.starPercentages.three
      + 4 * data.starPercentages.four
      + 5 * data.starPercentages.five)
      / data.numberOfRatings;
    starRating = starRating.toFixed(2);
    this.setState({
      starRating,
    });
  }

  render() {
    const { data } = this.state;
    const { starRating } = this.state;
    const { position } = this.state;
    return (
      <div id={style['Main-Container']}>
        <div className={style['Left-Col-Container']}>
          <div>
            <ItemName name={data.productName} />
            <Producer producer={data.producer} />
            <NumberOfRatings
              starModalMouseEnter={handleStarModalMouseEnter}
              starModalMouseLeave={handleStarModalMouseLeave}
              onMouseOver={handleStarsMouseEnter}
              onFocus={handleStarsMouseEnter}
              onMouseLeave={handleStarsMouseLeave}
              starRating={starRating}
              stars={data.starPercentages}
              starPosition={position}
              numberOfRatings={data.numberOfRatings}
            />
            <hr className={style['Basic-hr']} />
            <Price price={data.price} />
            <ItemDetails details={data.productInfo} />
          </div>
        </div>
        <div className={style['Right-Col-Container']}>
          <PurchaseColumn price={data.price.toFixed(2)} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('item-details'));

export default App;
