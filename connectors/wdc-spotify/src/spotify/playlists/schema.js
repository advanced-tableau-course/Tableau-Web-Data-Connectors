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
    id: "trackadded",
    alias: "Track Added",
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

},
{
    id: "trackalbumid",
    alias: "Track Album ID",
    dataType: tableau.dataTypeEnum.string
},
{
    id: "trackAlbumName",
    alias: "Track Album Name",
    dataType: tableau.dataTypeEnum.string
},
{
    id: "trackArtistId",
    alias: "Track Artist ID",
    dataType: tableau.dataTypeEnum.string
},
{
    id: "trackArtistName",
    alias: "Track Artist Name",
    dataType: tableau.dataTypeEnum.string
},
]

var schema = {
    id: "playlists",
    alias: "Spotify Playlists",
    columns: cols
};

export {
    schema
}