var cols = [{
    id: "playlistname",
    alias: "Playlist Name",
    dataType: tableau.dataTypeEnum.string
},
{
    id: "playlistid",
    alias: "Playlist ID",
    dataType: tableau.dataTypeEnum.string
},
{
    id: "playlisturi",
    alias: "Playlist uri",
    dataType: tableau.dataTypeEnum.string
},
{
    id: "playlistimage",
    alias: "Playlist Image",
    dataType: tableau.dataTypeEnum.string

},
{
    id: "trackalbum",
    alias: "Track Album",
    dataType: tableau.dataTypeEnum.string

},
{
    id: "trackname",
    alias: "Track Name",
    dataType: tableau.dataTypeEnum.string


},
{
    id: "trackid",
    alias: "Track ID",
    dataType: tableau.dataTypeEnum.string

},
{
    id: "trackduration",
    alias: "Track duration",
    dataType: tableau.dataTypeEnum.int

},
{
    id: "trackimage",
    alias: "Track Image",
    dataType: tableau.dataTypeEnum.string

}
]

var HistorySchema = {
    id: "History",
    alias: "Spotify Listening History",
    columns: cols
};

export {
    HistorySchema
}