import { useState } from 'react';
import * as React from 'react';

import './App.css';
import SignIn from './signin';
import { TableauSchemas } from './tableau'
import { RefreshSpotifyToken, SpotifyPlaylist, SpotifyTrackAnalysis } from './spotify'

function App() {

  const triggerWDCInit = () => {
    const DOMContentLoaded_event = window.document.createEvent('Event')
    DOMContentLoaded_event.initEvent('DOMContentLoaded', true, true)
    window.document.dispatchEvent(DOMContentLoaded_event)
    console.log('loaded')
  }
  const registerConnector = () => {
    var myConnector = tableau.makeConnector();
    myConnector.getSchema = function (schemaCallback) {
      schemaCallback([SpotifyPlaylist.schema, TableauSchemas.HistorySchema, SpotifyTrackAnalysis.schema]);
    };

    myConnector.getData = async function (table, doneCallback) {

      await new Promise(resolve => setTimeout(resolve, 1000));
      var token = await RefreshSpotifyToken(tableau.password);

      await new Promise(resolve => setTimeout(resolve, 1000));

      switch (table.tableInfo?.id) {
        case SpotifyPlaylist.schema.id:
          //doneCallback()
  
          await new Promise(resolve => setTimeout(resolve, 1000));
          SpotifyPlaylist.getData(token, table, doneCallback);
          break;
        case SpotifyTrackAnalysis.schema.id:
          SpotifyTrackAnalysis.getData(token, table, doneCallback);
          break;
        default:
          doneCallback()
      }
    };
    myConnector.init = (initCallback) => {

      initCallback();
    }
    //triggerWDCInit();
    tableau.registerConnector(myConnector);
    triggerWDCInit();
    try {
      window._tableau?.triggerInitialization();
    } catch {
      console.log('simulator')
    }


  }
  registerConnector();

  return (
    <div className="App">
      <SignIn></SignIn>
    </div>
  )
}

export default App
