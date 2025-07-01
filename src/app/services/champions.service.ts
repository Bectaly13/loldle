import { Injectable } from '@angular/core';

export interface Champion {
  name: Name;
  gender: Gender;
  role: Role[];
  species: Species[];
  resource: Resource;
  range: Range[];
  region: Region[];
  year: Year;
}

export type Name =
  "Aatrox" | "Ahri" | "Akali" | "Akshan" | "Alistar" | "Ambessa" | "Amumu" | "Anivia" | "Annie" | "Aphelios" | "Ashe" | "Aurelion Sol" | "Aurora" | "Azir"
  | "Bard" | "Bel'Veth" | "Blitzcrank" | "Brand" | "Braum" | "Briar"
  | "Caitlyn" | "Camille" | "Cassiopeia" | "Cho'Gath" | "Corki"
  | "Darius" | "Diana" | "Dr. Mundo" | "Draven"
  | "Ekko" | "Elise" | "Evelynn" | "Ezreal"
  | "Fiddlesticks" | "Fiora" | "Fizz"
  | "Galio" | "Gangplank" | "Garen" | "Gnar" | "Gragas" | "Graves" | "Gwen"
  | "Hecarim" | "Heimerdinger" | "Hwei"
  | "Illaoi" | "Irelia" | "Ivern"
  | "Janna" | "Jarvan IV" | "Jax" | "Jayce" | "Jhin" | "Jinx"
  | "K'Santé" | "Kai'Sa" | "Kalista" | "Karma" | "Karthus" | "Kassadin" | "Katarina" | "Kayle" | "Kayn" | "Kennen" | "Kha'Zix" | "Kindred" | "Kled" | "Kog'Maw"
  | "Lillia" | "LeBlanc" | "Lee Sin" | "Leona" | "Lissandra" | "Lucian" | "Lulu" | "Lux"
  | "Malphite" | "Malzahar" | "Maokai" | "Maître Yi" | "Mel" | "Milio" | "Miss Fortune" | "Mordekaiser" | "Morgana"
  | "Naafiri" | "Nami" | "Nasus" | "Nautilus" | "Neeko" | "Nidalee" | "Nilah" | "Nocturne" | "Nunu et Willump"
  | "Olaf" | "Orianna" | "Ornn"
  | "Pantheon" | "Poppy" | "Pyke"
  | "Qiyana" | "Quinn"
  | "Rakan" | "Rammus" | "Rek'Sai" | "Rell" | "Renata Glasc" | "Renekton" | "Rengar" | "Riven" | "Rumble" | "Ryze"
  | "Samira" | "Sejuani" | "Senna" | "Séraphine" | "Sett" | "Shaco" | "Shen" | "Shyvana" | "Singed" | "Sion" | "Sivir" | "Skarner" | "Smolder" | "Sona" | "Soraka" | "Swain" | "Sylas" | "Syndra"
  | "Tahm Kench" | "Taliyah" | "Talon" | "Taric" | "Teemo" | "Thresh" | "Tristana" | "Trundle" | "Tryndamere" | "Twisted Fate" | "Twitch"
  | "Udyr" | "Urgot"
  | "Varus" | "Vayne" | "Veigar" | "Vel'Koz" | "Vex" | "Vi" | "Viego" | "Viktor" | "Vladimir" | "Volibear"
  | "Warwick" | "Wukong"
  | "Xayah" | "Xerath" | "Xin Zhao"
  | "Yasuo" | "Yone" | "Yorick" | "Yuumi"
  | "Zac" | "Zed" | "Zeri" | "Ziggs" | "Zilean" | "Zoé" | "Zyra";

export type Gender = "Autre" | "Féminin" | "Masculin";

export type Role = "Top" | "Jungle" | "Mid" | "ADC" | "Support";

export type Species =
  "Altéré Chimiquement" | "Altéré Magiquement"
  | "Baccai" | "Brackern"
  | "Céleste" | "Chat" | "Chien" | "Cyborg"
  | "Être du néant"
  | "Darkin" | "Démon" | "Dieu" | "Dieu-Guerrier" | "Dragon"
  | "Esprit"
  | "Golem"
  | "Hôte" | "Humain"
  | "Inconnu"
  | "Minotaure" | "Mort-vivant"
  | "Né de glace" | "Né magique"
  | "Plante"
  | "Rat" | "Revenant"
  | "Spiritualiste"
  | "Troll"
  | "Vastaya"
  | "Yéti" | "Yordle";

export type Resource =
  "Agressivité"
  | "Bouclier"
  | "Courage" | "Coûts de santé"
  | "Énergie"
  | "Férocité" | "Furie"
  | "Mana"
  | "Rage"
  | "Sans mana" | "Soif de sang"
  | "Vapeur" | "Vent";

export type Range = "Mêlée" | "À distance";

export type Region =
  "Bandle" | "Bilgewater"
  | "Camavor"
  | "Demacia"
  | "Freljord"
  | "Icathia" | "Îles Obscures" | "Ionia" | "Ixtal"
  | "Le Néant"
  | "Noxus"
  | "Piltover"
  | "Runeterra"
  | "Shurima"
  | "Targon"
  | "Zaun";

export type Year = 2009 | 2010 | 2011 | 2012 | 2013 | 2014 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025;

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {
  champions: Champion[] = [
    {name: "Aatrox", gender: "Masculin", role: ["Top"], species: ["Darkin"], resource: "Sans mana", range: ["Mêlée"], region: ["Runeterra", "Shurima"], year: 2013},
    {name: "Ahri", gender: "Féminin", role: ["Mid"], species: ["Vastaya"], resource: "Mana", range: ["À distance"], region: ["Ionia"], year: 2011},
    {name: "Akali", gender: "Féminin", role: ["Mid"], species: ["Humain"], resource: "Énergie", range: ["Mêlée"], region: ["Ionia"], year: 2010},
    {name: "Akshan", gender: "Masculin", role: ["Mid"], species: ["Humain"], resource: "Mana", range: ["À distance"], region: ["Shurima"], year: 2021},
    {name: "Alistar", gender: "Masculin", role: ["Support"], species: ["Minotaure"], resource: "Mana", range: ["Mêlée"], region: ["Noxus", "Runeterra"], year: 2009},
    {name: "Ambessa", gender: "Féminin", role: ["Top"], species: ["Humain"], resource: "Énergie", range: ["Mêlée"], region: ["Noxus", "Piltover"], year: 2024},
    {name: "Amumu", gender: "Masculin", role: ["Jungle"], species: ["Mort-vivant", "Yordle"], resource: "Mana", range: ["Mêlée"], region: ["Shurima"], year: 2009},
    {name: "Anivia", gender: "Féminin", role: ["Mid"], species: ["Dieu", "Esprit"], resource: "Mana", range: ["À distance"], region: ["Freljord"], year: 2009},
    {name: "Annie", gender: "Féminin", role: ["Mid"], species: ["Humain", "Né magique"], resource: "Mana", range: ["À distance"], region: ["Noxus", "Runeterra"], year: 2009},
    {name: "Aphelios", gender: "Masculin", role: ["ADC"], species: ["Humain", "Spiritualiste"], resource: "Mana", range: ["À distance"], region: ["Targon"], year: 2019},
    {name: "Ashe", gender: "Féminin", role: ["ADC"], species: ["Humain", "Né de glace"], resource: "Mana", range: ["À distance"], region: ["Freljord"], year: 2009},
    {name: "Aurelion Sol", gender: "Masculin", role: ["Mid"], species: ["Céleste", "Dragon"], resource: "Mana", range: ["À distance"], region: ["Runeterra", "Targon"], year: 2016},
    {name: "Aurora", gender: "Féminin", role: ["Mid"], species: ["Vastaya"], resource: "Mana", range: ["À distance"], region: ["Freljord"], year: 2024},
    {name: "Azir", gender: "Masculin", role: ["Mid"], species: ["Dieu-Guerrier"], resource: "Mana", range: ["À distance"], region: ["Shurima"], year: 2014},
    {name: "Bard", gender: "Masculin", role: ["Support"], species: ["Céleste"], resource: "Mana", range: ["À distance"], region: ["Runeterra"], year: 2015},
    {name: "Bel'Veth", gender: "Féminin", role: ["Jungle"], species: ["Être du néant"], resource: "Sans mana", range: ["Mêlée"], region: ["Le Néant"], year: 2022},
    {name: "Blitzcrank", gender: "Autre", role: ["Support"], species: ["Golem"], resource: "Mana", range: ["Mêlée"], region: ["Zaun"], year: 2009},
    {name: "Brand", gender: "Masculin", role: ["Support"], species: ["Humain", "Altéré Magiquement"], resource: "Mana", range: ["À distance"], region: ["Freljord", "Runeterra"], year: 2011},
    {name: "Braum", gender: "Masculin", role: ["Support"], species: ["Humain", "Né de glace"], resource: "Mana", range: ["Mêlée"], region: ["Freljord"], year: 2014},
    {name: "Briar", gender: "Féminin", role: ["Jungle"], species: ["Golem"], resource: "Coûts de santé", range: ["Mêlée"], region: ["Noxus"], year: 2023},
    {name: "Caitlyn", gender: "Féminin", role: ["ADC"], species: ["Humain"], resource: "Mana", range: ["À distance"], region: ["Piltover"], year: 2011},
    {name: "Camille", gender: "Féminin", role: ["Top"], species: ["Cyborg", "Humain"], resource: "Mana", range: ["Mêlée"], region: ["Piltover"], year: 2016},
    {name: "Cassiopeia", gender: "Féminin", role: ["Mid", "Top"], species: ["Humain", "Altéré Magiquement"], resource: "Mana", range: ["À distance"], region: ["Noxus", "Shurima"], year: 2010},
    {name: "Cho'Gath", gender: "Masculin", role: ["Top", "Mid"], species: ["Être du néant"], resource: "Mana", range: ["Mêlée"], region: ["Le Néant"], year: 2009},
    {name: "Corki", gender: "Masculin", role: ["ADC", "Mid"], species: ["Yordle"], resource: "Mana", range: ["À distance"], region: ["Bandle", "Piltover"], year: 2009},
    {name: "Darius", gender: "Masculin", role: ["Top", "Jungle"], species: ["Humain"], resource: "Mana", range: ["Mêlée"], region: ["Noxus"], year: 2012},
    {name: "Diana", gender: "Féminin", role: ["Jungle", "Mid"], species: ["Hôte", "Humain"], resource: "Mana", range: ["Mêlée"], region: ["Targon"], year: 2012},
    {name: "Dr. Mundo", gender: "Masculin", role: ["Top"], species: ["Altéré Chimiquement", "Humain"], resource: "Coûts de santé", range: ["Mêlée"], region: ["Zaun"], year: 2009},
    {name: "Draven", gender: "Masculin", role: ["ADC"], species: ["Humain"], resource: "Mana", range: ["À distance"], region: ["Noxus"], year: 2012},
    {name: "Ekko", gender: "Masculin", role: ["Jungle", "Mid"], species: ["Humain"], resource: "Mana", range: ["Mêlée"], region: ["Zaun"], year: 2015},
    {name: "Elise", gender: "Féminin", role: ["Jungle", "Support"], species: ["Humain", "Altéré Magiquement"], resource: "Mana", range: ["Mêlée", "À distance"], region: ["Noxus", "Îles Obscures"], year: 2012},
    {name: "Evelynn", gender: "Féminin", role: ["Jungle"], species: ["Démon", "Esprit"], resource: "Mana", range: ["Mêlée"], region: ["Runeterra"], year: 2009},
    {name: "Ezreal", gender: "Masculin", role: ["ADC"], species: ["Humain", "Né magique"], resource: "Mana", range: ["À distance"], region: ["Piltover"], year: 2010},
    {name: "Fiddlesticks", gender: "Autre", role: ["Jungle", "Support"], species: ["Démon", "Esprit"], resource: "Mana", range: ["À distance"], region: ["Runeterra"], year: 2009},
    {name: "Fiora", gender: "Féminin", role: ["Top"], species: ["Humain"], resource: "Mana", range: ["Mêlée"], region: ["Demacia"], year: 2012},
    {name: "Fizz", gender: "Masculin", role: ["Mid"], species: ["Yordle"], resource: "Mana", range: ["Mêlée"], region: ["Bilgewater"], year: 2011},
    {name: "Galio", gender: "Masculin", role: ["Mid"], species: ["Golem"], resource: "Mana", range: ["Mêlée"], region: ["Demacia"], year: 2010},
    {name: "Gangplank", gender: "Masculin", role: ["Top"], species: ["Humain"], resource: "Mana", range: ["Mêlée"], region: ["Bilgewater"], year: 2009},
    {name: "Garen", gender: "Masculin", role: ["Top"], species: ["Humain"], resource: "Sans mana", range: ["Mêlée"], region: ["Demacia"], year: 2010},
    {name: "Gnar", gender: "Masculin", role: ["Top"], species: ["Yordle"], resource: "Rage", range: ["Mêlée", "À distance"], region: ["Freljord"], year: 2014},
    {name: "Gragas", gender: "Masculin", role: ["Jungle", "Top"], species: ["Humain", "Né de glace"], resource: "Mana", range: ["Mêlée"], region: ["Freljord"], year: 2010},
    {name: "Graves", gender: "Masculin", role: ["Jungle"], species: ["Humain"], resource: "Mana", range: ["À distance"], region: ["Bilgewater"], year: 2011},
    {name: "Gwen", gender: "Féminin", role: ["Jungle", "Top"], species: ["Humain", "Altéré Magiquement"], resource: "Mana", range: ["Mêlée"], region: ["Camavor", "Îles Obscures"], year: 2021},
    {name: "Hecarim", gender: "Masculin", role: ["Jungle"], species: ["Mort-vivant"], resource: "Mana", range: ["Mêlée"], region: ["Camavor", "Îles Obscures"], year: 2012},
    {name: "Heimerdinger", gender: "Masculin", role: ["Mid", "Top"], species: ["Yordle"], resource: "Mana", range: ["À distance"], region: ["Piltover"], year: 2009},
    {name: "Hwei", gender: "Masculin", role: ["Mid"], species: ["Humain", "Né magique"], resource: "Mana", range: ["À distance"], region: ["Ionia"], year: 2023},
    {name: "Illaoi", gender: "Féminin", role: ["Top"], species: ["Humain", "Spiritualiste"], resource: "Mana", range: ["Mêlée"], region: ["Bilgewater"], year: 2015},
    {name: "Irelia", gender: "Féminin", role: ["Mid", "Top"], species: ["Humain", "Spiritualiste"], resource: "Mana", range: ["Mêlée"], region: ["Ionia"], year: 2010},
    {name: "Ivern", gender: "Masculin", role: ["Jungle"], species: ["Humain", "Altéré Magiquement"], resource: "Mana", range: ["À distance"], region: ["Freljord", "Ionia"], year: 2016},
    {name: "Janna", gender: "Féminin", role: ["Support"], species: ["Dieu", "Esprit"], resource: "Mana", range: ["À distance"], region: ["Shurima", "Zaun"], year: 2009},
    {name: "Jarvan IV", gender: "Masculin", role: ["Jungle"], species: ["Humain"], resource: "Mana", range: ["Mêlée"], region: ["Demacia"], year: 2011},
    {name: "Jax", gender: "Masculin", role: ["Jungle", "Top"], species: ["Inconnu"], resource: "Mana", range: ["Mêlée"], region: ["Icathia", "Runeterra", "Shurima"], year: 2009},
    {name: "Jayce", gender: "Masculin", role: ["Top"], species: ["Humain"], resource: "Mana", range: ["Mêlée", "À distance"], region: ["Piltover"], year: 2012},
    {name: "Jhin", gender: "Masculin", role: ["ADC"], species: ["Humain", "Spiritualiste"], resource: "Mana", range: ["À distance"], region: ["Ionia"], year: 2016},
    {name: "Jinx", gender: "Féminin", role: ["ADC"], species: ["Altéré Chimiquement", "Humain"], resource: "Mana", range: ["À distance"], region: ["Zaun"], year: 2013},
    {name: "K'Santé", gender: "Masculin", role: ["Top"], species: ["Humain"], resource: "Mana", range: ["Mêlée"], region: ["Shurima"], year: 2022},
    {name: "Kai'Sa", gender: "Féminin", role: ["ADC"], species: ["Humain", "Être du néant"], resource: "Mana", range: ["À distance"], region: ["Shurima", "Le Néant"], year: 2018},
    {name: "Kalista", gender: "Féminin", role: ["ADC"], species: ["Mort-vivant"], resource: "Mana", range: ["À distance"], region: ["Camavor" ,"Îles Obscures"], year: 2014},
    {name: "Karma", gender: "Féminin", role: ["Support"], species: ["Humain", "Spiritualiste"], resource: "Mana", range: ["À distance"], region: ["Ionia"], year: 2011},
    {name: "Karthus", gender: "Masculin", role: ["Jungle"], species: ["Mort-vivant"], resource: "Mana", range: ["À distance"], region: ["Noxus", "Îles Obscures"], year: 2009},
    {name: "Kassadin", gender: "Masculin", role: ["Mid"], species: ["Humain", "Être du néant"], resource: "Mana", range: ["Mêlée"], region: ["Shurima", "Le Néant"], year: 2009},
    {name: "Katarina", gender: "Féminin", role: ["Mid"], species: ["Humain"], resource: "Sans mana", range: ["Mêlée"], region: ["Noxus"], year: 2009},
    {name: "Kayle", gender: "Féminin", role: ["Top"], species: ["Hôte", "Humain", "Altéré Magiquement"], resource: "Mana", range: ["Mêlée", "À distance"], region: ["Demacia", "Targon"], year: 2009},
    {name: "Kayn", gender: "Masculin", role: ["Jungle"], species: ["Darkin", "Humain", "Altéré Magiquement"], resource: "Mana", range: ["Mêlée"], region: ["Ionia", "Noxus", "Runeterra", "Shurima"], year: 2017},
    {name: "Kennen", gender: "Masculin", role: ["Top", "Mid"], species: ["Yordle"], resource: "Énergie", range: ["À distance"], region: ["Ionia"], year: 2010},
    {name: "Kha'Zix", gender: "Masculin", role: ["Jungle"], species: ["Être du néant"], resource: "Mana", range: ["Mêlée"], region: ["Le Néant"], year: 2012},
    {name: "Kindred", gender: "Autre", role: ["Jungle"], species: ["Dieu", "Esprit"], resource: "Mana", range: ["À distance"], region: ["Runeterra"], year: 2015},
    {name: "Kled", gender: "Masculin", role: ["Top"], species: ["Yordle"], resource: "Courage", range: ["Mêlée"], region: ["Noxus"], year: 2016},
    {name: "Kog'Maw", gender: "Masculin", role: ["ADC"], species: ["Être du néant"], resource: "Mana", range: ["À distance"], region: ["Le Néant"], year: 2010},
    {name: "LeBlanc", gender: "Féminin", role: ["Mid"], species: ["Humain", "Altéré Magiquement"], resource: "Mana", range: ["À distance"], region: ["Noxus"], year: 2010},
    {name: "Lee Sin", gender: "Masculin", role: ["Jungle"], species: ["Humain", "Spiritualiste"], resource: "Énergie", range: ["Mêlée"], region: ["Ionia"], year: 2011},
    {name: "Leona", gender: "Féminin", role: ["Support"], species: ["Hôte", "Humain"], resource: "Mana", range: ["Mêlée"], region: ["Targon"], year: 2011},
    {name: "Lillia", gender: "Féminin", role: ["Jungle"], species: ["Esprit"], resource: "Mana", range: ["Mêlée"], region: ["Ionia"], year: 2020},
    {name: "Lissandra", gender: "Féminin", role: ["Mid"], species: ["Humain", "Né de glace"], resource: "Mana", range: ["À distance"], region: ["Freljord"], year: 2013},
    {name: "Lucian", gender: "Masculin", role: ["ADC"], species: ["Humain"], resource: "Mana", range: ["À distance"], region: ["Demacia", "Îles Obscures"], year: 2013},
    {name: "Lulu", gender: "Féminin", role: ["Support"], species: ["Yordle"], resource: "Mana", range: ["À distance"], region: ["Bandle"], year: 2012},
    {name: "Lux", gender: "Féminin", role: ["Mid", "Support"], species: ["Humain", "Né magique"], resource: "Mana", range: ["À distance"], region: ["Demacia"], year: 2010},
    {name: "Malphite", gender: "Masculin", role: ["Top"], species: ["Golem"], resource: "Mana", range: ["Mêlée"], region: ["Ixtal", "Shurima"], year: 2009},
    {name: "Malzahar", gender: "Masculin", role: ["Mid"], species: ["Humain", "Être du néant"], resource: "Mana", range: ["À distance"], region: ["Shurima", "Le Néant"], year: 2010},
    {name: "Maokai", gender: "Masculin", role: ["Support"], species: ["Esprit"], resource: "Mana", range: ["Mêlée"], region: ["Îles Obscures"], year: 2011},
    {name: "Maître Yi", gender: "Masculin", role: ["Jungle"], species: ["Humain", "Spiritualiste"], resource: "Mana", range: ["Mêlée"], region: ["Ionia"], year: 2009},
    {name: "Mel", gender: "Féminin", role: ["Mid", "Support"], species: ["Humain", "Altéré Magiquement"], resource: "Mana", range: ["À distance"], region: ["Noxus", "Piltover"], year: 2025},
    {name: "Milio", gender: "Masculin", role: ["Support"], species: ["Humain", "Né magique"], resource: "Mana", range: ["À distance"], region: ["Ixtal"], year: 2023},
    {name: "Miss Fortune", gender: "Féminin", role: ["ADC"], species: ["Humain"], resource: "Mana", range: ["À distance"], region: ["Bilgewater"], year: 2010},
    {name: "Mordekaiser", gender: "Masculin", role: ["Top"], species: ["Revenant"], resource: "Bouclier", range: ["Mêlée"], region: ["Noxus", "Îles Obscures"], year: 2010},
    {name: "Morgana", gender: "Féminin", role: ["Support"], species: ["Hôte", "Humain", "Altéré Magiquement"], resource: "Mana", range: ["À distance"], region: ["Demacia", "Targon"], year: 2009},
    {name: "Naafiri", gender: "Féminin", role: ["Jungle", "Mid"], species: ["Darkin", "Chien"], resource: "Mana", range: ["Mêlée"], region: ["Shurima"], year: 2023},
    {name: "Nami", gender: "Féminin", role: ["Support"], species: ["Vastaya"], resource: "Mana", range: ["À distance"], region: ["Bilgewater", "Runeterra"], year: 2012},
    {name: "Nasus", gender: "Masculin", role: ["Top"], species: ["Dieu-Guerrier"], resource: "Mana", range: ["Mêlée"], region: ["Shurima"], year: 2009},
    {name: "Nautilus", gender: "Masculin", role: ["Support"], species: ["Revenant"], resource: "Mana", range: ["Mêlée"], region: ["Bilgewater"], year: 2012},
    {name: "Neeko", gender: "Féminin", role: ["Mid", "Support"], species: ["Vastaya"], resource: "Mana", range: ["À distance"], region: ["Ixtal"], year: 2018},
    {name: "Nidalee", gender: "Féminin", role: ["Jungle"], species: ["Humain", "Spiritualiste"], resource: "Mana", range: ["Mêlée", "À distance"], region: ["Ixtal"], year: 2010},
    {name: "Nilah", gender: "Féminin", role: ["ADC"], species: ["Humain", "Altéré Magiquement"], resource: "Mana", range: ["Mêlée"], region: ["Bilgewater"], year: 2022},
    {name: "Nocturne", gender: "Masculin", role: ["Jungle"], species: ["Démon", "Esprit"], resource: "Mana", range: ["Mêlée"], region: ["Runeterra"], year: 2011},
    {name: "Nunu et Willump", gender: "Masculin", role: ["Jungle"], species: ["Humain", "Yéti"], resource: "Mana", range: ["Mêlée"], region: ["Freljord"], year: 2009},
    {name: "Olaf", gender: "Masculin", role: ["Top"], species: ["Humain", "Né de glace"], resource: "Mana", range: ["Mêlée"], region: ["Freljord"], year: 2010},
    {name: "Orianna", gender: "Féminin", role: ["Mid"], species: ["Golem"], resource: "Mana", range: ["À distance"], region: ["Piltover"], year: 2011},
    {name: "Ornn", gender: "Masculin", role: ["Top"], species: ["Dieu", "Esprit"], resource: "Mana", range: ["Mêlée"], region: ["Freljord"], year: 2017},
    {name: "Pantheon", gender: "Masculin", role: ["Support", "Top", "Jungle"], species: ["Hôte", "Humain"], resource: "Mana", range: ["Mêlée"], region: ["Targon"], year: 2010},
    {name: "Poppy", gender: "Féminin", role: ["Support", "Top", "Jungle"], species: ["Yordle"], resource: "Mana", range: ["Mêlée"], region: ["Demacia"], year: 2010},
    {name: "Pyke", gender: "Masculin", role: ["Support"], species: ["Revenant"], resource: "Mana", range: ["Mêlée"], region: ["Bilgewater"], year: 2018},
    {name: "Qiyana", gender: "Féminin", role: ["Mid"], species: ["Humain", "Né magique"], resource: "Mana", range: ["Mêlée"], region: ["Ixtal"], year: 2019},
    {name: "Quinn", gender: "Féminin", role: ["Top", "Mid"], species: ["Humain"], resource: "Mana", range: ["À distance"], region: ["Demacia"], year: 2013},
    {name: "Rakan", gender: "Masculin", role: ["Support"], species: ["Vastaya"], resource: "Mana", range: ["Mêlée"], region: ["Ionia"], year: 2017},
    {name: "Rammus", gender: "Masculin", role: ["Jungle"], species: ["Inconnu"], resource: "Mana", range: ["Mêlée"], region: ["Shurima"], year: 2009},
    {name: "Rek'Sai", gender: "Féminin", role: ["Jungle"], species: ["Être du néant"], resource: "Rage", range: ["Mêlée"], region: ["Shurima", "Le Néant"], year: 2014},
    {name: "Rell", gender: "Féminin", role: ["Support"], species: ["Humain", "Altéré Magiquement", "Né magique"], resource: "Mana", range: ["Mêlée"], region: ["Noxus"], year: 2020},
    {name: "Renata Glasc", gender: "Féminin", role: ["Support"], species: ["Altéré Chimiquement", "Humain"], resource: "Mana", range: ["À distance"], region: ["Zaun"], year: 2010},
    {name: "Renekton", gender: "Masculin", role: ["Top"], species: ["Dieu-Guerrier"], resource: "Furie", range: ["Mêlée"], region: ["Shurima"], year: 2011},
    {name: "Rengar", gender: "Masculin", role: ["Jungle"], species: ["Vastaya"], resource: "Férocité", range: ["Mêlée"], region: ["Ixtal", "Shurima"], year: 2012},
    {name: "Riven", gender: "Féminin", role: ["Top"], species: ["Humain"], resource: "Sans mana", range: ["Mêlée"], region: ["Ionia", "Noxus"], year: 2011},
    {name: "Rumble", gender: "Masculin", role: ["Top"], species: ["Yordle"], resource: "Vapeur", range: ["Mêlée"], region: ["Bandle"], year: 2011},
    {name: "Ryze", gender: "Masculin", role: ["Mid", "Top"], species: ["Humain", "Altéré Magiquement"], resource: "Mana", range: ["À distance"], region: ["Runeterra"], year: 2009},
    {name: "Samira", gender: "Féminin", role: ["ADC"], species: ["Humain"], resource: "Mana", range: ["À distance"], region: ["Noxus", "Shurima"], year: 2020},
    {name: "Sejuani", gender: "Féminin", role: ["Jungle"], species: ["Humain", "Né de glace"], resource: "Mana", range: ["Mêlée"], region: ["Freljord"], year: 2012},
    {name: "Senna", gender: "Féminin", role: ["Support"], species: ["Humain", "Mort-vivant"], resource: "Mana", range: ["À distance"], region: ["Îles Obscures"], year: 2019},
    {name: "Séraphine", gender: "Féminin", role: ["Support"], species: ["Humain", "Né magique"], resource: "Mana", range: ["À distance"], region: ["Piltover", "Zaun"], year: 2020},
    {name: "Sett", gender: "Masculin", role: ["Top"], species: ["Humain", "Vastaya"], resource: "Agressivité", range: ["Mêlée"], region: ["Ionia"], year: 2020},
    {name: "Shaco", gender: "Masculin", role: ["Jungle", "Support"], species: ["Esprit"], resource: "Mana", range: ["Mêlée"], region: ["Runeterra"], year: 2009},
    {name: "Shen", gender: "Masculin", role: ["Support", "Top"], species: ["Humain", "Spiritualiste"], resource: "Énergie", range: ["Mêlée"], region: ["Ionia"], year: 2010},
    {name: "Shyvana", gender: "Féminin", role: ["Jungle"], species: ["Dragon", "Altéré Magiquement"], resource: "Furie", range: ["Mêlée"], region: ["Demacia"], year: 2011},
    {name: "Singed", gender: "Masculin", role: ["Top"], species: ["Altéré Chimiquement", "Humain"], resource: "Mana", range: ["Mêlée"], region: ["Piltover", "Zaun"], year: 2009},
    {name: "Sion", gender: "Masculin", role: ["Top"], species: ["Revenant"], resource: "Mana", range: ["Mêlée"], region: ["Noxus"], year: 2009},
    {name: "Sivir", gender: "Féminin", role: ["ADC"], species: ["Humain"], resource: "Mana", range: ["À distance"], region: ["Shurima"], year: 2009},
    {name: "Skarner", gender: "Masculin", role: ["Jungle"], species: ["Brackern"], resource: "Mana", range: ["Mêlée"], region: ["Ixtal"], year: 2011},
    {name: "Smolder", gender: "Masculin", role: ["ADC"], species: ["Dragon"], resource: "Mana", range: ["À distance"], region: ["Camavor", "Noxus"], year: 2024},
    {name: "Sona", gender: "Féminin", role: ["Support"], species: ["Humain", "Né magique"], resource: "Mana", range: ["À distance"], region: ["Demacia", "Ionia"], year: 2010},
    {name: "Soraka", gender: "Féminin", role: ["Support"], species: ["Céleste"], resource: "Mana", range: ["À distance"], region: ["Ionia", "Targon"], year: 2009},
    {name: "Swain", gender: "Masculin", role: ["Support"], species: ["Humain", "Altéré Magiquement"], resource: "Mana", range: ["À distance"], region: ["Noxus"], year: 2010},
    {name: "Sylas", gender: "Masculin", role: ["Mid"], species: ["Humain", "Né magique"], resource: "Mana", range: ["Mêlée"], region: ["Demacia", "Freljord"], year: 2019},
    {name: "Syndra", gender: "Féminin", role: ["Mid"], species: ["Humain", "Né magique"], resource: "Mana", range: ["À distance"], region: ["Ionia"], year: 2012},
    {name: "Tahm Kench", gender: "Masculin", role: ["Support", "Top"], species: ["Démon", "Esprit"], resource: "Mana", range: ["Mêlée"], region: ["Bilgewater", "Runeterra"], year: 2015},
    {name: "Taliyah", gender: "Féminin", role: ["Mid"], species: ["Humain", "Né magique"], resource: "Mana", range: ["À distance"], region: ["Shurima"], year: 2016},
    {name: "Talon", gender: "Masculin", role: ["Jungle", "Mid"], species: ["Humain"], resource: "Mana", range: ["Mêlée"], region: ["Noxus"], year: 2011},
    {name: "Taric", gender: "Masculin", role: ["Support"], species: ["Hôte", "Humain"], resource: "Mana", range: ["Mêlée"], region: ["Demacia", "Targon"], year: 2009},
    {name: "Teemo", gender: "Masculin", role: ["Top"], species: ["Yordle"], resource: "Mana", range: ["À distance"], region: ["Bandle"], year: 2009},
    {name: "Thresh", gender: "Masculin", role: ["Support"], species: ["Mort-vivant"], resource: "Mana", range: ["À distance"], region: ["Îles Obscures"], year: 2013},
    {name: "Tristana", gender: "Féminin", role: ["ADC"], species: ["Yordle"], resource: "Mana", range: ["À distance"], region: ["Bandle"], year: 2009},
    {name: "Trundle", gender: "Masculin", role: ["Jungle", "Top"], species: ["Né de glace", "Troll"], resource: "Mana", range: ["Mêlée"], region: ["Freljord"], year: 2010},
    {name: "Tryndamere", gender: "Masculin", role: ["Top"], species: ["Humain", "Altéré Magiquement"], resource: "Furie", range: ["Mêlée"], region: ["Freljord"], year: 2009},
    {name: "Twisted Fate", gender: "Masculin", role: ["Mid"], species: ["Humain", "Né magique"], resource: "Mana", range: ["À distance"], region: ["Bilgewater"], year: 2009},
    {name: "Twitch", gender: "Masculin", role: ["ADC"], species: ["Altéré Chimiquement", "Rat"], resource: "Mana", range: ["À distance"], region: ["Zaun"], year: 2009},
    {name: "Udyr", gender: "Masculin", role: ["Jungle"], species: ["Humain", "Spiritualiste"], resource: "Mana", range: ["Mêlée"], region: ["Freljord", "Ionia"], year: 2009},
    {name: "Urgot", gender: "Masculin", role: ["Top"], species: ["Altéré Chimiquement", "Cyborg", "Humain"], resource: "Mana", range: ["À distance"], region: ["Noxus", "Zaun"], year: 2010},
    {name: "Varus", gender: "Masculin", role: ["ADC"], species: ["Darkin", "Humain"], resource: "Mana", range: ["À distance"], region: ["Ionia", "Runeterra", "Shurima"], year: 2012},
    {name: "Vayne", gender: "Féminin", role: ["ADC"], species: ["Humain"], resource: "Mana", range: ["À distance"], region: ["Demacia"], year: 2011},
    {name: "Veigar", gender: "Masculin", role: ["Mid"], species: ["Yordle"], resource: "Mana", range: ["À distance"], region: ["Bandle", "Runeterra", "Îles Obscures"], year: 2009},
    {name: "Vel'Koz", gender: "Masculin", role: ["Mid", "Support"], species: ["Être du néant"], resource: "Mana", range: ["À distance"], region: ["Le Néant"], year: 2014},
    {name: "Vex", gender: "Féminin", role: ["Mid"], species: ["Yordle"], resource: "Mana", range: ["À distance"], region: ["Bandle", "Îles Obscures"], year: 2021},
    {name: "Vi", gender: "Féminin", role: ["Jungle"], species: ["Humain"], resource: "Mana", range: ["Mêlée"], region: ["Piltover", "Zaun"], year: 2012},
    {name: "Viego", gender: "Masculin", role: ["Jungle"], species: ["Mort-vivant"], resource: "Sans mana", range: ["Mêlée"], region: ["Camavor", "Îles Obscures"], year: 2021},
    {name: "Viktor", gender: "Masculin", role: ["Mid"], species: ["Cyborg", "Humain"], resource: "Mana", range: ["À distance"], region: ["Piltover", "Zaun"], year: 2011},
    {name: "Vladimir", gender: "Masculin", role: ["Mid", "Top"], species: ["Humain", "Altéré Magiquement"], resource: "Soif de sang", range: ["À distance"], region: ["Camavor", "Noxus", "Îles Obscures"], year: 2010},
    {name: "Volibear", gender: "Masculin", role: ["Jungle", "Top"], species: ["Dieu", "Esprit"], resource: "Mana", range: ["Mêlée"], region: ["Freljord"], year: 2011},
    {name: "Warwick", gender: "Masculin", role: ["Jungle", "Top"], species: ["Altéré Chimiquement", "Cyborg", "Humain"], resource: "Mana", range: ["Mêlée"], region: ["Zaun"], year: 2009},
    {name: "Wukong", gender: "Masculin", role: ["Jungle"], species: ["Vastaya"], resource: "Mana", range: ["Mêlée"], region: ["Ionia"], year: 2011},
    {name: "Xayah", gender: "Féminin", role: ["ADC"], species: ["Vastaya"], resource: "Mana", range: ["À distance"], region: ["Ionia"], year: 2017},
    {name: "Xerath", gender: "Masculin", role: ["Mid", "Support"], species: ["Baccai"], resource: "Mana", range: ["À distance"], region: ["Shurima"], year: 2011},
    {name: "Xin Zhao", gender: "Masculin", role: ["Jungle"], species: ["Humain"], resource: "Mana", range: ["Mêlée"], region: ["Demacia", "Ionia", "Noxus"], year: 2010},
    {name: "Yasuo", gender: "Masculin", role: ["Mid"], species: ["Humain", "Né magique"], resource: "Vent", range: ["Mêlée"], region: ["Ionia"], year: 2013},
    {name: "Yone", gender: "Masculin", role: ["Mid", "Top"], species: ["Humain", "Altéré Magiquement"], resource: "Sans mana", range: ["Mêlée"], region: ["Ionia"], year: 2020},
    {name: "Yorick", gender: "Masculin", role: ["Top", "Jungle"], species: ["Humain", "Altéré Magiquement"], resource: "Mana", range: ["Mêlée"], region: ["Îles Obscures"], year: 2011},
    {name: "Yuumi", gender: "Féminin", role: ["Support"], species: ["Chat", "Altéré Magiquement"], resource: "Mana", range: ["À distance"], region: ["Bandle"], year: 2019},
    {name: "Zac", gender: "Masculin", role: ["Jungle"], species: ["Golem"], resource: "Coûts de santé", range: ["Mêlée"], region: ["Zaun"], year: 2013},
    {name: "Zed", gender: "Masculin", role: ["Jungle", "Mid"], species: ["Humain", "Altéré Magiquement"], resource: "Énergie", range: ["Mêlée"], region: ["Ionia"], year: 2012},
    {name: "Zeri", gender: "Féminin", role: ["ADC"], species: ["Humain", "Né magique"], resource: "Mana", range: ["À distance"], region: ["Zaun"], year: 2022},
    {name: "Ziggs", gender: "Masculin", role: ["ADC", "Mid"], species: ["Yordle"], resource: "Mana", range: ["À distance"], region: ["Zaun"], year: 2012},
    {name: "Zilean", gender: "Masculin", role: ["Support"], species: ["Humain", "Né magique"], resource: "Mana", range: ["À distance"], region: ["Icathia", "Runeterra", "Shurima"], year: 2009},
    {name: "Zoé", gender: "Féminin", role: ["Mid"], species: ["Hôte", "Humain"], resource: "Mana", range: ["À distance"], region: ["Targon"], year: 2017},
    {name: "Zyra", gender: "Féminin", role: ["Support"], species: ["Humain", "Plante"], resource: "Mana", range: ["À distance"], region: ["Ixtal"], year: 2012}
  ];

  constructor() { }
}