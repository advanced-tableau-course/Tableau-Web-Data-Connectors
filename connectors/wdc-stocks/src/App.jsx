import { useEffect, useState } from 'react'

import { WithContext as ReactTags } from 'react-tag-input';

import './App.css'
import { Chip, InputLabel, TextField } from '@mui/material';
import { YahooLogo } from './yahoo_logo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment'

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

function App() {

  const [tags, setTags] = useState([]);
  const [value, setValue] = useState(moment());
  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
  };
  var submit = () => {
    console.log("click")
    tableau.connectionName = "Yahoo Finance Data"; // This will be the data source name in Tableau
    tableau.submit(); // This sends the connector object to Tableau
  };
  useEffect(() => {
    var myConnector = tableau.makeConnector();
    myConnector.getSchema = function (schemaCallback) {
      var cols = [{
        id: "id",
        dataType: tableau.dataTypeEnum.string
      }, {
        id: "mag",
        alias: "magnitude",
        dataType: tableau.dataTypeEnum.float
      }, {
        id: "title",
        alias: "title",
        dataType: tableau.dataTypeEnum.string
      }, {
        id: "location",
        dataType: tableau.dataTypeEnum.geometry
      }];

      var tableSchema = {
        id: "earthquakeFeed",
        alias: "Earthquakes with magnitude greater than 4.5 in the last seven days",
        columns: cols
      };

      schemaCallback([tableSchema]);
    };
    myConnector.getData = function(table,doneCallback){
      doneCallback()
    }
    tableau.registerConnector(myConnector);
  })
  return (
    <div className="App">
     <div className='card' >
      <YahooLogo width={"200px"}></YahooLogo>

      <div class="label">Stock Tickers to Pull</div>
        <ReactTags
          tags={tags}
          placeholder="Add Stock Ticker"
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          inputFieldPosition="bottom"
          autocomplete
        />
<div>
<div class="label">Granularity</div>
<Chip label="1 Day" />
<Chip label="1 Month" variant="outlined" />
<div class="label">Date Range</div>
<LocalizationProvider dateAdapter={AdapterMoment}>
  <div>
  <DatePicker
    label="From"
    value={value}
    onChange={(newValue) => {
      setValue(newValue);
    }}
    renderInput={(params) => <TextField {...params} />}
  />
  </div>
  <DatePicker
    label="To"
    value={value}
    onChange={(newValue) => {
      setValue(newValue);
    }}
    renderInput={(params) => <TextField {...params} />}
  />
</LocalizationProvider>
</div>
         <button onClick={submit}>
          Submit
        </button>
      </div>
    

    </div>
  )
}

export default App
