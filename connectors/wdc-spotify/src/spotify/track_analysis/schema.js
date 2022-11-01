var cols = [{
    id: "trackId",
    alias: "Track ID",
    filterable: true,
    foreignKey: {
        "tableId": "playlists",
        "columnId": "trackid"
    },
    dataType: tableau.dataTypeEnum.string
},
{
    id: "acousticness",
    alias: "Acousticness",
    dataType: tableau.dataTypeEnum.float
},
{
    id: "danceability",
    alias: "Danceability",
    dataType: tableau.dataTypeEnum.float
},
{
    id: "energy",
    alias: "Energy",
    dataType: tableau.dataTypeEnum.float
},
{
    id: "instrumentalness",
    alias: "Instrumentalness",
    dataType: tableau.dataTypeEnum.float
},
{
    id: "key",
    alias: "Key",
    dataType: tableau.dataTypeEnum.string
},
{
    id: "liveness",
    alias: "Liveness",
    dataType: tableau.dataTypeEnum.float
},
{
    id: "loudness",
    alias: "Loudness",
    dataType: tableau.dataTypeEnum.float
},
{
    id: "mode",
    alias: "Mode",
    dataType: tableau.dataTypeEnum.int
},
{
    id: "speechiness",
    alias: "Speechiness",
    dataType: tableau.dataTypeEnum.float
},
{
    id: "tempo",
    alias: "Tempo",
    dataType: tableau.dataTypeEnum.float
},
{
    id: "valence",
    alias: "Valence",
    dataType: tableau.dataTypeEnum.float
}

]

var schema = {
    joinOnly: true,
    id: "trackAnalysis",
    alias: "Spotify Track Analysis",
    columns: cols
};

export {
    schema
}