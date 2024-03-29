import React, { Component } from "react";
import Bars from "./Components/Bars";
import "./App.css";
import BubbleSort from "./Sorting-Algorithms/BubbleSort";
import InsertionSort from "./Sorting-Algorithms/InsertionSort";
import QuickSort from "./Sorting-Algorithms/QuickSort";
import MergeSort from "./Sorting-Algorithms/MergeSort";
import SelectionSort from "./Sorting-Algorithms/SelectionSort";

class App extends Component {
  constructor() {
    super();
    this.state = {
      arr: [],
      noofbars: 85,
      speed: 100,
    };
  }

  // Generating random number
  genreateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  // Generating random array
  getrandomArray() {
    let bararr = document.getElementsByClassName("bars"); // To change the color of the array
    for (let i = 0; i < bararr.length; i++)
      bararr[i].style.backgroundColor = "cyan";

    const myarr = [];
    for (let i = 0; i < this.state.noofbars; i++)
      myarr.push(this.genreateRandomNumber(10, 400));
    this.setState({ arr: myarr });
  }

  toggleSliderBars() {
    let elm = document.getElementById("slider-bar");
    this.setState({ noofbars: parseInt(elm.value) });
    this.getrandomArray();
  }

  // When the page renders first time
  componentDidMount() {
    this.getrandomArray();
  }

  // Checking if the initial array is sorted or not
  checkSorted(arr, sortedarr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== sortedarr[i]) return false;
    }
    return true;
  }

  // Animating the Algorithms
  animateSort(animation) {
    let arr = this.state.arr;
    let sortedarr = this.state.arr.slice(); //getting new copy of the arr
    sortedarr.sort((a, b) => {
      return a - b;
    });

    // console.log(animation);
    // console.log(arr);
    if (this.checkSorted(arr, sortedarr)) return;

    // Disabling the sidebar and buttons
    let elm = document.getElementsByClassName("btn");
    for (let i = 0; i < elm.length; i++) {
      elm[i].disabled = true;
    }
    elm = document.getElementById("slider-bar");
    elm.disabled = true;

    let bararr = document.getElementsByClassName("bars"); // To change the color of the array
    // console.log(sortedarr);

    let a, b, h1, h2;

    for (let i = 0; i < animation.length; i++) {
      a = animation[i][0];
      b = animation[i][1];
      // Getting there height
      h1 = arr[a];
      h2 = arr[b];
      let color = "white";

      if (h1 > h2 && a < b) color = "#ff4365";
      setTimeout(() => {
        // Getting the index to be swapped
        let a = animation[i][0];
        let b = animation[i][1];
        let c = animation[i];
        // Getting there height
        let h1 = arr[a];
        let h2 = arr[b];

        // Set the height and color of the bars currently being compared
        bararr[b].style.backgroundColor = color;
        bararr[a].style.backgroundColor = color;
        bararr[b].style.height = `${h1}px`;
        bararr[a].style.height = `${h2}px`;

        // For pivot element
        if (c.length === 3) bararr[c[2]].style.backgroundColor = "orange";

        // Swap the elements
        [arr[a], arr[b]] = [arr[b], arr[a]];

        // Change the color of previously selected values back
        if (i !== 0) {
          a = animation[i - 1][0];
          b = animation[i - 1][1];
          bararr[a].style.background = "cyan";
          bararr[b].style.background = "cyan";
        }

        // If this array is sorted change their color
        if (this.checkSorted(arr, sortedarr)) {
          // Enabling the buttons and sidebar

          let elm = document.getElementsByClassName("btn");
          for (let j = 0; j < elm.length; j++) {
            elm[j].disabled = false;
          }

          elm = document.getElementById("slider-bar");
          elm.disabled = false;

          for (let j = 0; j < arr.length; j++)
            bararr[j].style.backgroundColor = "white";

          setTimeout(() => {
            for (let j = 0; j < arr.length; j++) {
              setTimeout(() => {
                bararr[j].style.backgroundColor = "#53fc11";
              }, j * 15); // For changing the color after array is sorted
            }
          }, 85);
        }
      }, i * this.state.speed);
    }
  }

  // Algorithms being called
  bubbleSort() {
    let arr = this.state.arr.slice(); //Getting a new array
    const animation = BubbleSort(arr);
    this.animateSort(animation);
  }

  insertionSort() {
    let arr = this.state.arr.slice();
    const animation = InsertionSort(arr);
    this.animateSort(animation);
  }

  quickSort() {
    let arr = this.state.arr.slice();
    const animation = QuickSort(arr);
    this.animateSort(animation);
  }

  mergeSort() {
    let arr = this.state.arr.slice();
    const animation = MergeSort(arr);
    this.animateSort(animation);
  }

  selectionSort() {
    let arr = this.state.arr.slice();
    const animation = SelectionSort(arr);
    this.animateSort(animation);
  }
  //All the components that are being rendered
  render() {
    // Setting the Bar component setting their height
    const barsheight = this.state.arr.map((val, inx) => {
      return <Bars height={val} key={inx} myclass="bars" />;
    });

    return (
      <div>
        <div className="bars-container">{barsheight}</div>
        {/* Button Area */}
        <div className="buttons-container">
          <button
            onClick={() => {
              this.getrandomArray();
            }}
            type="button"
            className="btn btn-light"
          >
            Generate Array
          </button>
          <button
            onClick={() => {
              this.insertionSort();
            }}
            type="button"
            className="btn btn-light"
          >
            Insertion Sort
          </button>
          <button
            onClick={() => {
              this.bubbleSort();
            }}
            type="button"
            className="btn btn-light"
          >
            Bubble Sort
          </button>
          <button
            onClick={() => {
              this.quickSort();
            }}
            type="button"
            className="btn btn-light"
          >
            Quick Sort
          </button>
          <button
            onClick={() => {
              this.mergeSort();
            }}
            type="button"
            className="btn btn-light"
          >
            Merge Sort
          </button>
          <button
            onClick={() => {
              this.selectionSort();
            }}
            type="button"
            className="btn btn-light"
          >
            Selection Sort
          </button>
          <div className="slider">
            <input
              type="range"
              value={String(this.state.noofbars)}
              min="50"
              max="100"
              id="slider-bar"
              onInput={() => {
                this.toggleSliderBars();
              }}
            ></input>
          </div>
        </div>

        {/* Heading */}
        <div>
          <h1>|〡Sorting Visualizer〡|</h1>
        </div>
      </div>
    );
  }
}

export default App;
