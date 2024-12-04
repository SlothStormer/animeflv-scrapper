import         { getLatestAnimes, searchAnime, getAnimeInfo, getEpisodeInfo, getOnAirAnimes } from "./lib/utils";
export default { getLatestAnimes, searchAnime, getAnimeInfo, getEpisodeInfo, getOnAirAnimes };

// Function for testing purposes
async function main() {
    //console.log(await getLatestAnimes());    
    //console.log(await searchAnime("tengoku"));
    //console.log(await getAnimeInfo("blue-lock"));
    //console.log(await getEpisodeInfo("blue-lock-1"));
    //console.log(await getOnAirAnimes())
}
main();